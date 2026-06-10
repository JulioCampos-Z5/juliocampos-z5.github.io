import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';

interface CarouselProps {
    total: number;
    mobileCards: ReactNode;
    desktopCards: ReactNode;
}

function getSlideWidth(slider: HTMLElement): number {
    const first = slider.firstElementChild as HTMLElement | null;
    const second = first?.nextElementSibling as HTMLElement | null;
    if (first && second) {
        const gap = second.offsetLeft - first.offsetLeft - first.offsetWidth;
        return first.offsetWidth + Math.max(gap, 0);
    }
    return first ? first.offsetWidth : 0;
}

// Carrusel responsivo: scroll-snap nativo en móvil, slider con translateX en desktop
export default function Carousel({ total, mobileCards, desktopCards }: CarouselProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const mobileTrackRef = useRef<HTMLDivElement>(null);
    const desktopSliderRef = useRef<HTMLDivElement>(null);
    const scrollFrame = useRef<number>(0);

    const [isMobile, setIsMobile] = useState(() => window.innerWidth < 640);
    const [mobileIndex, setMobileIndex] = useState(0);
    const [slide, setSlide] = useState(0);
    const [slideWidth, setSlideWidth] = useState(0);
    // Desplazamiento máximo: alinea el final de la pista con el borde del contenedor
    const [maxOffset, setMaxOffset] = useState(0);

    const measure = useCallback(() => {
        setIsMobile(window.innerWidth < 640);
        const slider = desktopSliderRef.current;
        const container = containerRef.current;
        if (!slider || !container) return;
        const width = getSlideWidth(slider);
        const overflow = Math.max(0, slider.scrollWidth - container.clientWidth);
        setSlideWidth(width);
        setMaxOffset(overflow);
        const lastSlide = width > 0 ? Math.ceil(overflow / width) : 0;
        setSlide((s) => Math.min(s, lastSlide));
    }, []);

    useEffect(() => {
        measure();
        window.addEventListener('resize', measure);
        return () => window.removeEventListener('resize', measure);
    }, [measure]);

    // Sincronizar el índice móvil con el desplazamiento manual
    const handleMobileScroll = () => {
        cancelAnimationFrame(scrollFrame.current);
        scrollFrame.current = requestAnimationFrame(() => {
            const track = mobileTrackRef.current;
            if (!track) return;
            const cards = Array.from(track.children) as HTMLElement[];
            let closest = 0;
            let smallest = Number.MAX_VALUE;
            cards.forEach((card, index) => {
                const distance = Math.abs(card.offsetLeft - track.scrollLeft);
                if (distance < smallest) {
                    smallest = distance;
                    closest = index;
                }
            });
            setMobileIndex(closest);
        });
    };

    const scrollMobileTo = (target: number) => {
        const track = mobileTrackRef.current;
        if (!track) return;
        const cards = Array.from(track.children) as HTMLElement[];
        const clamped = Math.min(Math.max(target, 0), cards.length - 1);
        const card = cards[clamped];
        if (card) track.scrollTo({ left: card.offsetLeft, behavior: 'smooth' });
        setMobileIndex(clamped);
    };

    const maxSlide = slideWidth > 0 ? Math.ceil(maxOffset / slideWidth) : 0;
    const offset = Math.min(slide * slideWidth, maxOffset);

    const prev = () => {
        if (isMobile) scrollMobileTo(mobileIndex - 1);
        else setSlide((s) => Math.max(0, s - 1));
    };

    const next = () => {
        if (isMobile) scrollMobileTo(mobileIndex + 1);
        else setSlide((s) => Math.min(maxSlide, s + 1));
    };

    const atStart = isMobile ? mobileIndex === 0 : slide === 0;
    const atEnd = isMobile ? mobileIndex >= total - 1 : slide >= maxSlide;
    const hideButtons = !isMobile && maxOffset <= 0;

    const buttonClass =
        'bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg border border-gray-200 dark:border-gray-600 disabled:opacity-50 disabled:pointer-events-none';

    return (
        <div className="relative">
            <div ref={containerRef} className="mx-0 px-0">
                {/* Móvil: una tarjeta por vez con scroll natural */}
                <div className="block sm:hidden relative">
                    <div
                        ref={mobileTrackRef}
                        onScroll={handleMobileScroll}
                        className="mobile-track flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory"
                    >
                        {mobileCards}
                    </div>
                </div>

                {/* Desktop: slider */}
                <div className="hidden sm:block overflow-hidden">
                    <div
                        ref={desktopSliderRef}
                        className="flex gap-6 transition-transform duration-500 ease-in-out will-change-transform"
                        style={{ transform: `translateX(${-offset}px)` }}
                    >
                        {desktopCards}
                    </div>
                </div>
            </div>

            {/* Botones de navegación debajo de las tarjetas */}
            {!hideButtons && (
                <div className="flex justify-end gap-3 mt-0 sm:mt-4">
                    <button onClick={prev} disabled={atStart} className={buttonClass} aria-label="Anterior">
                        <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button onClick={next} disabled={atEnd} className={buttonClass} aria-label="Siguiente">
                        <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
}

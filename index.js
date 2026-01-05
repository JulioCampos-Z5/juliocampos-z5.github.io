// Variables para el modo oscuro con Tailwind CSS
let isDarkMode = false;
const modoButton = document.getElementById('modo');
const mobileTrack = document.getElementById('mobileTrack');
const mobileCards = mobileTrack ? Array.from(mobileTrack.querySelectorAll('.mobile-card')) : [];
const shareButton = document.getElementById('shareProfile');

// Función para cambiar entre modo claro y oscuro
function toggleDarkMode() {
    const html = document.documentElement;
    
    if (isDarkMode) {
        html.classList.remove('dark');
        modoButton.textContent = '🌑';
        isDarkMode = false;
        localStorage.setItem('darkMode', 'false');
    } else {
        html.classList.add('dark');
        modoButton.textContent = '☀️';
        isDarkMode = true;
        localStorage.setItem('darkMode', 'true');
    }
}

// Detectar preferencia guardada o del sistema
function initializeDarkMode() {
    const savedMode = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedMode === 'true' || (savedMode === null && prefersDark)) {
        document.documentElement.classList.add('dark');
        modoButton.textContent = '☀️';
        isDarkMode = true;
    } else {
        document.documentElement.classList.remove('dark');
        modoButton.textContent = '🌑';
        isDarkMode = false;
    }
}

// Slider de experiencia - Sistemas separados para móvil y desktop
let currentSlide = 0;
let currentMobileIndex = 0;
function getVisibleMobileCards() {
    return mobileCards.filter(card => !card.classList.contains('hidden'));
}

function getVisibleMobileCount() {
    const visibles = getVisibleMobileCards();
    return visibles.length || mobileCards.length;
}

// Sistema para móvil - desplazamiento natural
function scrollMobileTo(targetIndex) {
    if (!mobileTrack || mobileCards.length === 0) return;
    const visibles = getVisibleMobileCards();
    if (visibles.length === 0) return;
    const clampedIndex = Math.min(Math.max(targetIndex, 0), visibles.length - 1);
    const targetCard = visibles[clampedIndex];
    mobileTrack.scrollTo({ left: targetCard.offsetLeft, behavior: 'smooth' });
    currentMobileIndex = clampedIndex;
    updateMobileButtons();
}

function updateMobileButtons() {
    const prevBtn = document.getElementById('prevExp');
    const nextBtn = document.getElementById('nextExp');
    const visibles = getVisibleMobileCards();
    if (!prevBtn || !nextBtn || visibles.length === 0 || window.innerWidth >= 640) return;

    if (currentMobileIndex >= visibles.length) {
        currentMobileIndex = Math.max(0, visibles.length - 1);
    }

    prevBtn.style.opacity = currentMobileIndex === 0 ? '0.5' : '1';
    prevBtn.style.pointerEvents = currentMobileIndex === 0 ? 'none' : 'auto';

    nextBtn.style.opacity = currentMobileIndex >= visibles.length - 1 ? '0.5' : '1';
    nextBtn.style.pointerEvents = currentMobileIndex >= visibles.length - 1 ? 'none' : 'auto';
}

function syncMobileIndexFromScroll() {
    if (!mobileTrack || mobileCards.length === 0) return;
    const visibles = getVisibleMobileCards();
    if (visibles.length === 0) return;
    const scrollLeft = mobileTrack.scrollLeft;
    let closestIndex = 0;
    let smallestDistance = Number.MAX_VALUE;

    visibles.forEach((card, index) => {
        const distance = Math.abs(card.offsetLeft - scrollLeft);
        if (distance < smallestDistance) {
            smallestDistance = distance;
            closestIndex = index;
        }
    });

    currentMobileIndex = closestIndex;
    updateMobileButtons();
}

// Sistema para desktop - slider original
function getSlideWidth() {
    const slider = document.getElementById('expSlider');
    if (!slider) return 0;

    const first = slider.firstElementChild;
    const second = first ? first.nextElementSibling : null;

    if (first && second) {
        const gap = second.offsetLeft - first.offsetLeft - first.offsetWidth;
        return first.offsetWidth + Math.max(gap, 0);
    }

    return first ? first.offsetWidth : 0;
}

function getVisibleSlides() {
    const container = document.getElementById('expContainer');
    const containerWidth = container.clientWidth;
    const slideWidth = getSlideWidth();
    if (slideWidth <= 0) return 1;
    return Math.floor(containerWidth / slideWidth) || 1;
}

function getVisibleDesktopCount() {
    const cards = Array.from(document.querySelectorAll('#expSlider > div'));
    const visible = cards.filter(card => !card.classList.contains('hidden')).length;
    return visible || cards.length;
}

function getTotalSlides() {
    return window.innerWidth < 640 ? getVisibleMobileCount() : getVisibleDesktopCount();
}

function updateDesktopSlider() {
    const slider = document.getElementById('expSlider');
    if (!slider) return;
    
    const slideWidth = getSlideWidth();
    const total = getTotalSlides();
    const visibleSlides = Math.max(1, getVisibleSlides());

    if (total <= visibleSlides) {
        currentSlide = 0;
        slider.style.transform = 'translateX(0)';
        const prevBtn = document.getElementById('prevExp');
        const nextBtn = document.getElementById('nextExp');
        if (prevBtn && nextBtn) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
        }
        return;
    }

    const offset = -currentSlide * slideWidth;
    slider.style.transform = `translateX(${offset}px)`;
    
    const prevBtn = document.getElementById('prevExp');
    const nextBtn = document.getElementById('nextExp');
    const maxSlide = Math.max(0, total - visibleSlides);
    currentSlide = Math.min(currentSlide, maxSlide);
    
    prevBtn.style.opacity = currentSlide === 0 ? '0.5' : '1';
    prevBtn.style.pointerEvents = currentSlide === 0 ? 'none' : 'auto';
    
    nextBtn.style.opacity = currentSlide >= maxSlide ? '0.5' : '1';
    nextBtn.style.pointerEvents = currentSlide >= maxSlide ? 'none' : 'auto';
    
    const hideButtons = getTotalSlides() <= visibleSlides;
    prevBtn.style.display = hideButtons ? 'none' : 'flex';
    nextBtn.style.display = hideButtons ? 'none' : 'flex';
}

function nextSlide() {
    if (window.innerWidth < 640) { // Móvil
        scrollMobileTo(currentMobileIndex + 1);
    } else { // Desktop
        const visibleSlides = getVisibleSlides();
        const maxSlide = Math.max(0, getTotalSlides() - visibleSlides);
        if (currentSlide < maxSlide) {
            currentSlide++;
            updateDesktopSlider();
        }
    }
}

function prevSlide() {
    if (window.innerWidth < 640) { // Móvil
        scrollMobileTo(currentMobileIndex - 1);
    } else { // Desktop
        if (currentSlide > 0) {
            currentSlide--;
            updateDesktopSlider();
        }
    }
}

function updateSlider() {
    if (window.innerWidth < 640) {
        updateMobileButtons();
    } else {
        updateDesktopSlider();
    }
}

// Funciones de contacto con pin/click
function toggleContactTooltip(event, contactGroup) {
    event.preventDefault();
    event.stopPropagation();
    
    // Cerrar otros tooltips abiertos
    document.querySelectorAll('.contact-group.pinned').forEach(group => {
        if (group !== contactGroup) {
            group.classList.remove('pinned');
        }
    });
    
    // Toggle del tooltip actual
    contactGroup.classList.toggle('pinned');
}

function setupContactListeners() {
    document.querySelectorAll('.contact-group').forEach(group => {
        const image = group.querySelector('img').parentElement;
        const tooltip = group.querySelector('.contact-tooltip');
        const link = group.querySelector('.contact-tooltip a');
        
        // Click en la imagen para fijar/desfijar tooltip
        image.addEventListener('click', (e) => {
            toggleContactTooltip(e, group);
        });
        
        // Click en el enlace cierra el tooltip y ejecuta la acción
        link.addEventListener('click', () => {
            group.classList.remove('pinned');
        });
    });
    
    // Cerrar tooltips al hacer click fuera
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.contact-group')) {
            document.querySelectorAll('.contact-group.pinned').forEach(group => {
                group.classList.remove('pinned');
            });
        }
    });
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    initializeDarkMode();
    
    // Inicializar sistema de experiencia según dispositivo
    if (window.innerWidth < 640) {
        updateMobileButtons();
    } else {
        updateDesktopSlider();
    }
    
    // Inicializar contactos con click
    setupContactListeners();
    
    // Botón de modo oscuro
    modoButton.addEventListener('click', toggleDarkMode);

    // Botón compartir perfil
    if (shareButton) {
        shareButton.addEventListener('click', async () => {
            const data = {
                title: 'Julio Cesar Campos Aguilar',
                text: 'CV y portafolio de Julio Cesar Campos Aguilar.',
                url: window.location.href
            };

            if (navigator.share) {
                try {
                    await navigator.share(data);
                } catch (err) {
                    console.error('No se pudo compartir', err);
                }
            } else if (navigator.clipboard) {
                try {
                    await navigator.clipboard.writeText(data.url);
                    shareButton.textContent = 'Link copiado';
                    setTimeout(() => shareButton.textContent = 'Compartir perfil', 1800);
                } catch (err) {
                    console.error('No se pudo copiar', err);
                }
            }
        });
    }
    
    // Botones del slider de experiencia
    document.getElementById('prevExp').addEventListener('click', prevSlide);
    document.getElementById('nextExp').addEventListener('click', nextSlide);
    
    // Responsive - cambiar sistema según tamaño de pantalla
    function handleResize() {
        if (window.innerWidth < 640) {
            updateMobileButtons();
        } else {
            const visibleSlides = getVisibleSlides();
            const maxSlide = Math.max(0, getTotalSlides() - visibleSlides);
            currentSlide = Math.min(currentSlide, maxSlide);
            updateDesktopSlider();
        }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    // Soporte para touch/swipe en móviles
    let startX = 0;
    let endX = 0;
    
    const slider = document.getElementById('expContainer');
    
    slider.addEventListener('touchstart', (e) => {
        if (window.innerWidth < 640) return;
        startX = e.touches[0].clientX;
    });
    
    slider.addEventListener('touchend', (e) => {
        if (window.innerWidth < 640) return;
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const diff = startX - endX;
        const threshold = 50;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }

    // Sincronizar los botones con el desplazamiento manual del carrusel móvil
    if (mobileTrack) {
        let scrollAnimationFrame;
        mobileTrack.addEventListener('scroll', () => {
            if (scrollAnimationFrame) {
                cancelAnimationFrame(scrollAnimationFrame);
            }
            scrollAnimationFrame = requestAnimationFrame(syncMobileIndexFromScroll);
        });
    }
});
// Variables para el modo oscuro con Tailwind CSS
let isDarkMode = false;
const modoButton = document.getElementById('modo');
const mobileTrack = document.getElementById('mobileTrack');
const mobileCards = mobileTrack ? Array.from(mobileTrack.querySelectorAll('.mobile-card')) : [];
const desktopSlides = document.querySelectorAll('#expSlider > div').length;

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
const totalSlides = Math.max(mobileCards.length, desktopSlides);

// Sistema para móvil - desplazamiento natural
function scrollMobileTo(targetIndex) {
    if (!mobileTrack || mobileCards.length === 0) return;
    const clampedIndex = Math.min(Math.max(targetIndex, 0), mobileCards.length - 1);
    const targetCard = mobileCards[clampedIndex];
    mobileTrack.scrollTo({ left: targetCard.offsetLeft, behavior: 'smooth' });
    currentMobileIndex = clampedIndex;
    updateMobileButtons();
}

function updateMobileButtons() {
    const prevBtn = document.getElementById('prevExp');
    const nextBtn = document.getElementById('nextExp');
    if (!prevBtn || !nextBtn || mobileCards.length === 0 || window.innerWidth >= 640) return;

    prevBtn.style.opacity = currentMobileIndex === 0 ? '0.5' : '1';
    prevBtn.style.pointerEvents = currentMobileIndex === 0 ? 'none' : 'auto';

    nextBtn.style.opacity = currentMobileIndex >= mobileCards.length - 1 ? '0.5' : '1';
    nextBtn.style.pointerEvents = currentMobileIndex >= mobileCards.length - 1 ? 'none' : 'auto';
}

function syncMobileIndexFromScroll() {
    if (!mobileTrack || mobileCards.length === 0) return;
    const scrollLeft = mobileTrack.scrollLeft;
    let closestIndex = 0;
    let smallestDistance = Number.MAX_VALUE;

    mobileCards.forEach((card, index) => {
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
    return 320 + 24; // w-80 = 320px + gap
}

function getVisibleSlides() {
    const container = document.getElementById('expContainer');
    const containerWidth = container.clientWidth - 96;
    const slideWidth = getSlideWidth();
    return Math.floor(containerWidth / slideWidth);
}

function updateDesktopSlider() {
    const slider = document.getElementById('expSlider');
    if (!slider) return;
    
    const slideWidth = getSlideWidth();
    const offset = -currentSlide * slideWidth;
    slider.style.transform = `translateX(${offset}px)`;
    
    const prevBtn = document.getElementById('prevExp');
    const nextBtn = document.getElementById('nextExp');
    const visibleSlides = getVisibleSlides();
    const maxSlide = Math.max(0, totalSlides - visibleSlides);
    
    prevBtn.style.opacity = currentSlide === 0 ? '0.5' : '1';
    prevBtn.style.pointerEvents = currentSlide === 0 ? 'none' : 'auto';
    
    nextBtn.style.opacity = currentSlide >= maxSlide ? '0.5' : '1';
    nextBtn.style.pointerEvents = currentSlide >= maxSlide ? 'none' : 'auto';
    
    const hideButtons = totalSlides <= visibleSlides;
    prevBtn.style.display = hideButtons ? 'none' : 'flex';
    nextBtn.style.display = hideButtons ? 'none' : 'flex';
}

function nextSlide() {
    if (window.innerWidth < 640) { // Móvil
        scrollMobileTo(currentMobileIndex + 1);
    } else { // Desktop
        const visibleSlides = getVisibleSlides();
        const maxSlide = Math.max(0, totalSlides - visibleSlides);
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
    
    // Botones del slider de experiencia
    document.getElementById('prevExp').addEventListener('click', prevSlide);
    document.getElementById('nextExp').addEventListener('click', nextSlide);
    
    // Responsive - cambiar sistema según tamaño de pantalla
    function handleResize() {
        if (window.innerWidth < 640) {
            // Cambiar a sistema móvil
            updateMobileButtons();
        } else {
            // Cambiar a sistema desktop
            const visibleSlides = getVisibleSlides();
            const maxSlide = Math.max(0, totalSlides - visibleSlides);
            if (currentSlide > maxSlide) {
                currentSlide = maxSlide;
            }
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
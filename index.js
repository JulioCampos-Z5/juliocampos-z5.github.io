// Variables para el modo oscuro con Tailwind CSS
let isDarkMode = false;
const modoButton = document.getElementById('modo');

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
let currentMobileCard = 0;
const totalSlides = 5; // Número total de tarjetas de experiencia

// Sistema para móvil - mostrar/ocultar tarjetas
function showMobileCard(cardIndex) {
    // Ocultar todas las tarjetas móviles
    for (let i = 0; i < totalSlides; i++) {
        const card = document.getElementById(`mobileCard${i}`);
        if (card) {
            card.classList.add('hidden');
        }
    }
    
    // Mostrar la tarjeta seleccionada
    const activeCard = document.getElementById(`mobileCard${cardIndex}`);
    if (activeCard) {
        activeCard.classList.remove('hidden');
    }
    
    currentMobileCard = cardIndex;
    updateMobileButtons();
}

function updateMobileButtons() {
    const prevBtn = document.getElementById('prevExp');
    const nextBtn = document.getElementById('nextExp');
    
    if (window.innerWidth < 640) { // Móvil
        prevBtn.style.opacity = currentMobileCard === 0 ? '0.5' : '1';
        prevBtn.style.pointerEvents = currentMobileCard === 0 ? 'none' : 'auto';
        
        nextBtn.style.opacity = currentMobileCard >= totalSlides - 1 ? '0.5' : '1';
        nextBtn.style.pointerEvents = currentMobileCard >= totalSlides - 1 ? 'none' : 'auto';
    }
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
        if (currentMobileCard < totalSlides - 1) {
            showMobileCard(currentMobileCard + 1);
        }
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
        if (currentMobileCard > 0) {
            showMobileCard(currentMobileCard - 1);
        }
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
        showMobileCard(0);
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
            showMobileCard(currentMobileCard);
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
        startX = e.touches[0].clientX;
    });
    
    slider.addEventListener('touchend', (e) => {
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
});
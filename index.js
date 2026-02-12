// Variables para el modo oscuro con Tailwind CSS
let isDarkMode = false;
let modoButton;
let mobileTrack;
let mobileCards = [];
let shareButton;

function setModeIcon(dark) {
    const icon = modoButton ? modoButton.querySelector('ion-icon') : null;
    if (icon) {
        icon.setAttribute('name', dark ? 'sunny-outline' : 'moon-outline');
        if (dark) {
            icon.classList.add('text-yellow-400');
            icon.classList.remove('text-gray-700');
        } else {
            icon.classList.remove('text-yellow-400');
            icon.classList.add('text-gray-700');
        }
    }
}

// Función para cambiar entre modo claro y oscuro
function toggleDarkMode() {
    const html = document.documentElement;
    
    if (isDarkMode) {
        html.classList.remove('dark');
        setModeIcon(false);
        isDarkMode = false;
        localStorage.setItem('darkMode', 'false');
    } else {
        html.classList.add('dark');
        setModeIcon(true);
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
        setModeIcon(true);
        isDarkMode = true;
    } else {
        document.documentElement.classList.remove('dark');
        setModeIcon(false);
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
        const imageContainer = group.querySelector('div:first-child') || group.querySelector('a:first-child');
        const tooltip = group.querySelector('.contact-tooltip');
        const link = tooltip ? tooltip.querySelector('a') : null;
        
        if (!imageContainer) return;
        
        // Click en la imagen para fijar/desfijar tooltip
        imageContainer.addEventListener('click', (e) => {
            toggleContactTooltip(e, group);
        });
        
        // Click en el enlace cierra el tooltip y ejecuta la acción
        if (link) {
            link.addEventListener('click', () => {
                group.classList.remove('pinned');
            });
        }
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

// Variables para proyectos
let mobileProyTrack;
let mobileProyCards = [];
let currentProySlide = 0;
let currentMobileProyIndex = 0;

// Funciones para proyectos
function createProyectoCard(proyecto, isMobile = false) {
    const tecnologias = proyecto.tecnologias.map(tech => 
        `<span class="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs">${tech}</span>`
    ).join('');
    
    const links = `
        ${proyecto.link ? `<a href="${proyecto.link}" target="_blank" class="text-blue-600 dark:text-blue-400 hover:underline text-sm flex items-center gap-1">
            <ion-icon name="logo-github" class="text-lg"></ion-icon> Repositorio
        </a>` : ''}
        ${proyecto.demo ? `<a href="${proyecto.demo}" target="_blank" class="text-green-600 dark:text-green-400 hover:underline text-sm flex items-center gap-1">
            <ion-icon name="globe-outline" class="text-lg"></ion-icon> Demo
        </a>` : ''}
    `;
    
    const baseClasses = isMobile 
        ? "mobile-card w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col snap-start shrink-0 overflow-hidden"
        : "flex-shrink-0 w-[calc((100%-3rem)/3)] min-w-[18rem] bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden";
    
    return `
        <div class="${baseClasses}">
            ${proyecto.imagen ? `<img src="${proyecto.imagen}" alt="${proyecto.titulo}" class="w-full h-48 object-cover" onerror="this.style.display='none'">` : ''}
            <div class="p-4 sm:p-6 flex flex-col flex-grow">
                <h3 class="text-lg sm:text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">${proyecto.titulo}</h3>
                <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 flex-grow">${proyecto.descripcion}</p>
                <div class="flex flex-wrap gap-2 mb-4">
                    ${tecnologias}
                </div>
                <div class="flex justify-between items-center mt-auto">
                    <div class="flex gap-3">
                        ${links}
                    </div>
                    <span class="text-xs text-gray-500 dark:text-gray-400">${proyecto.fecha}</span>
                </div>
            </div>
        </div>
    `;
}

async function loadProyectos() {
    try {
        const response = await fetch('proyectos.json');
        const proyectos = await response.json();
        
        const mobileContainer = document.getElementById('mobileProyTrack');
        const desktopContainer = document.getElementById('proySlider');
        
        if (mobileContainer && desktopContainer) {
            // Cargar tarjetas móviles
            mobileContainer.innerHTML = proyectos.map(p => createProyectoCard(p, true)).join('');
            // Cargar tarjetas desktop
            desktopContainer.innerHTML = proyectos.map(p => createProyectoCard(p, false)).join('');
            
            // Actualizar referencias
            mobileProyTrack = mobileContainer;
            mobileProyCards = Array.from(mobileContainer.querySelectorAll('.mobile-card'));
            
            // Inicializar slider
            if (window.innerWidth < 640) {
                updateMobileProyButtons();
            } else {
                updateDesktopProySlider();
            }
        }
    } catch (error) {
        console.error('Error al cargar proyectos:', error);
    }
}

function getVisibleMobileProyCards() {
    return mobileProyCards.filter(card => !card.classList.contains('hidden'));
}

function getVisibleMobileProyCount() {
    const visibles = getVisibleMobileProyCards();
    return visibles.length || mobileProyCards.length;
}

function scrollMobileProyTo(targetIndex) {
    if (!mobileProyTrack || mobileProyCards.length === 0) return;
    const visibles = getVisibleMobileProyCards();
    if (visibles.length === 0) return;
    const clampedIndex = Math.min(Math.max(targetIndex, 0), visibles.length - 1);
    const targetCard = visibles[clampedIndex];
    mobileProyTrack.scrollTo({ left: targetCard.offsetLeft, behavior: 'smooth' });
    currentMobileProyIndex = clampedIndex;
    updateMobileProyButtons();
}

function updateMobileProyButtons() {
    const prevBtn = document.getElementById('prevProy');
    const nextBtn = document.getElementById('nextProy');
    const visibles = getVisibleMobileProyCards();
    if (!prevBtn || !nextBtn || visibles.length === 0 || window.innerWidth >= 640) return;

    if (currentMobileProyIndex >= visibles.length) {
        currentMobileProyIndex = Math.max(0, visibles.length - 1);
    }

    prevBtn.style.opacity = currentMobileProyIndex === 0 ? '0.5' : '1';
    prevBtn.style.pointerEvents = currentMobileProyIndex === 0 ? 'none' : 'auto';

    nextBtn.style.opacity = currentMobileProyIndex >= visibles.length - 1 ? '0.5' : '1';
    nextBtn.style.pointerEvents = currentMobileProyIndex >= visibles.length - 1 ? 'none' : 'auto';
}

function syncMobileProyIndexFromScroll() {
    if (!mobileProyTrack || mobileProyCards.length === 0) return;
    const visibles = getVisibleMobileProyCards();
    if (visibles.length === 0) return;
    const scrollLeft = mobileProyTrack.scrollLeft;
    let closestIndex = 0;
    let smallestDistance = Number.MAX_VALUE;

    visibles.forEach((card, index) => {
        const distance = Math.abs(card.offsetLeft - scrollLeft);
        if (distance < smallestDistance) {
            smallestDistance = distance;
            closestIndex = index;
        }
    });

    currentMobileProyIndex = closestIndex;
    updateMobileProyButtons();
}

function getProySlideWidth() {
    const slider = document.getElementById('proySlider');
    if (!slider) return 0;

    const first = slider.firstElementChild;
    const second = first ? first.nextElementSibling : null;

    if (first && second) {
        const gap = second.offsetLeft - first.offsetLeft - first.offsetWidth;
        return first.offsetWidth + Math.max(gap, 0);
    }

    return first ? first.offsetWidth : 0;
}

function getVisibleProySlides() {
    const container = document.getElementById('proyContainer');
    const containerWidth = container.clientWidth;
    const slideWidth = getProySlideWidth();
    if (slideWidth <= 0) return 1;
    return Math.floor(containerWidth / slideWidth) || 1;
}

function getVisibleDesktopProyCount() {
    const cards = Array.from(document.querySelectorAll('#proySlider > div'));
    const visible = cards.filter(card => !card.classList.contains('hidden')).length;
    return visible || cards.length;
}

function getTotalProySlides() {
    return window.innerWidth < 640 ? getVisibleMobileProyCount() : getVisibleDesktopProyCount();
}

function updateDesktopProySlider() {
    const slider = document.getElementById('proySlider');
    if (!slider) return;
    
    const slideWidth = getProySlideWidth();
    const total = getTotalProySlides();
    const visibleSlides = Math.max(1, getVisibleProySlides());

    if (total <= visibleSlides) {
        currentProySlide = 0;
        slider.style.transform = 'translateX(0)';
        const prevBtn = document.getElementById('prevProy');
        const nextBtn = document.getElementById('nextProy');
        if (prevBtn && nextBtn) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
        }
        return;
    }

    const offset = -currentProySlide * slideWidth;
    slider.style.transform = `translateX(${offset}px)`;
    
    const prevBtn = document.getElementById('prevProy');
    const nextBtn = document.getElementById('nextProy');
    const maxSlide = Math.max(0, total - visibleSlides);
    currentProySlide = Math.min(currentProySlide, maxSlide);
    
    prevBtn.style.opacity = currentProySlide === 0 ? '0.5' : '1';
    prevBtn.style.pointerEvents = currentProySlide === 0 ? 'none' : 'auto';
    
    nextBtn.style.opacity = currentProySlide >= maxSlide ? '0.5' : '1';
    nextBtn.style.pointerEvents = currentProySlide >= maxSlide ? 'none' : 'auto';
    
    const hideButtons = getTotalProySlides() <= visibleSlides;
    prevBtn.style.display = hideButtons ? 'none' : 'flex';
    nextBtn.style.display = hideButtons ? 'none' : 'flex';
}

function nextProySlide() {
    if (window.innerWidth < 640) {
        scrollMobileProyTo(currentMobileProyIndex + 1);
    } else {
        const visibleSlides = getVisibleProySlides();
        const maxSlide = Math.max(0, getTotalProySlides() - visibleSlides);
        if (currentProySlide < maxSlide) {
            currentProySlide++;
            updateDesktopProySlider();
        }
    }
}

function prevProySlide() {
    if (window.innerWidth < 640) {
        scrollMobileProyTo(currentMobileProyIndex - 1);
    } else {
        if (currentProySlide > 0) {
            currentProySlide--;
            updateDesktopProySlider();
        }
    }
}

function updateProySlider() {
    if (window.innerWidth < 640) {
        updateMobileProyButtons();
    } else {
        updateDesktopProySlider();
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar variables del DOM
    modoButton = document.getElementById('modo');
    mobileTrack = document.getElementById('mobileTrack');
    mobileCards = mobileTrack ? Array.from(mobileTrack.querySelectorAll('.mobile-card')) : [];
    shareButton = document.getElementById('shareProfile');
    
    initializeDarkMode();
    
    // Cargar proyectos
    loadProyectos();
    
    // Inicializar sistema de experiencia según dispositivo
    if (window.innerWidth < 640) {
        updateMobileButtons();
    } else {
        updateDesktopSlider();
    }
    
    // Inicializar contactos con click
    setupContactListeners();
    
    // Botón de modo oscuro
    if (modoButton) {
        modoButton.addEventListener('click', toggleDarkMode);
    }

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
    const prevExpBtn = document.getElementById('prevExp');
    const nextExpBtn = document.getElementById('nextExp');
    if (prevExpBtn) prevExpBtn.addEventListener('click', prevSlide);
    if (nextExpBtn) nextExpBtn.addEventListener('click', nextSlide);
    
    // Botones del slider de proyectos
    const prevProyBtn = document.getElementById('prevProy');
    const nextProyBtn = document.getElementById('nextProy');
    if (prevProyBtn) prevProyBtn.addEventListener('click', prevProySlide);
    if (nextProyBtn) nextProyBtn.addEventListener('click', nextProySlide);
    
    // Responsive - cambiar sistema según tamaño de pantalla
    function handleResize() {
        if (window.innerWidth < 640) {
            updateMobileButtons();
            updateMobileProyButtons();
        } else {
            const visibleSlides = getVisibleSlides();
            const maxSlide = Math.max(0, getTotalSlides() - visibleSlides);
            currentSlide = Math.min(currentSlide, maxSlide);
            updateDesktopSlider();
            
            const visibleProySlides = getVisibleProySlides();
            const maxProySlide = Math.max(0, getTotalProySlides() - visibleProySlides);
            currentProySlide = Math.min(currentProySlide, maxProySlide);
            updateDesktopProySlider();
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
    
    // Sincronizar proyectos móvil
    setTimeout(() => {
        mobileProyTrack = document.getElementById('mobileProyTrack');
        if (mobileProyTrack) {
            let scrollProyAnimationFrame;
            mobileProyTrack.addEventListener('scroll', () => {
                if (scrollProyAnimationFrame) {
                    cancelAnimationFrame(scrollProyAnimationFrame);
                }
                scrollProyAnimationFrame = requestAnimationFrame(syncMobileProyIndexFromScroll);
            });
        }
    }, 500);
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
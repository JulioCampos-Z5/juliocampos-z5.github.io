// Variables compartidas
let shareButton;

// Mapa de colores para los iconos
const colorMap = {
    'blue-500': '#3b82f6',
    'purple-500': '#a855f7',
    'amber-500': '#f59e0b'
};

// Cargar experiencia desde JSON
async function loadExperiencia() {
    try {
        const response = await fetch('json/experiencia.json');
        const data = await response.json();
        renderExperiencia(data.experiencia);
    } catch (error) {
        console.error('Error cargando experiencia:', error);
    }
}

// Renderizar experiencia
function renderExperiencia(experiencias) {
    const mobileTrack = document.getElementById('mobileTrack');
    const expSlider = document.getElementById('expSlider');
    
    if (!mobileTrack || !expSlider) return;
    
    mobileTrack.innerHTML = '';
    expSlider.innerHTML = '';
    
    experiencias.forEach((exp, index) => {
        const color = colorMap[exp.icono] || '#3b82f6';
        
        // Mobile card
        const mobileCard = document.createElement('div');
        mobileCard.className = 'mobile-card w-full h-96 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col snap-start shrink-0';
        mobileCard.innerHTML = `
            <h3 class="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">${exp.titulo}</h3>
            <ul class="text-gray-600 dark:text-gray-400 mb-6 space-y-3 text-sm flex-grow">
                ${exp.descripcion.map(desc => `
                    <li class="flex items-start">
                        <span class="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0" style="background-color: ${color}"></span>
                        ${desc}
                    </li>
                `).join('')}
            </ul>
            <p class="text-right text-xs text-gray-500 dark:text-gray-400 font-medium mt-auto">${exp.periodo}</p>
        `;
        mobileTrack.appendChild(mobileCard);
        
        // Desktop card
        const desktopCard = document.createElement('div');
        desktopCard.className = 'flex-shrink-0 w-[calc((100%-3rem)/3)] min-w-[18rem] h-96 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col';
        desktopCard.innerHTML = `
            <h3 class="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">${exp.titulo}</h3>
            <ul class="text-gray-600 dark:text-gray-400 mb-6 space-y-3 text-base flex-grow">
                ${exp.descripcion.map(desc => `
                    <li class="flex items-start">
                        <span class="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0" style="background-color: ${color}"></span>
                        ${desc}
                    </li>
                `).join('')}
            </ul>
            <p class="text-right text-sm text-gray-500 dark:text-gray-400 font-medium mt-auto">${exp.periodo}</p>
        `;
        expSlider.appendChild(desktopCard);
    });
    
    // Reinicializar el carrusel después de cargar el contenido
    reinitExpCarousel();
}

// Cargar habilidades desde JSON
async function loadHabilidades() {
    try {
        const response = await fetch('json/habilidades.json');
        const data = await response.json();
        renderHabilidades(data.habilidades);
    } catch (error) {
        console.error('Error cargando habilidades:', error);
    }
}

// Renderizar habilidades
function renderHabilidades(habilidades) {
    const skillsContainer = document.querySelector('.grid.gap-6.md\\:grid-cols-2');
    
    if (!skillsContainer) return;
    
    skillsContainer.innerHTML = '';
    
    habilidades.forEach(skill => {
        const color = colorMap[skill.icono] || '#3b82f6';
        
        const skillSection = document.createElement('div');
        skillSection.className = 'flex flex-col gap-3';
        skillSection.innerHTML = `
            <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full" style="background-color: ${color}"></span>
                <p class="text-sm font-semibold text-gray-800 dark:text-gray-100">${skill.titulo}</p>
            </div>
            <div class="flex flex-wrap gap-3 sm:gap-4">
                ${skill.items.map(item => `<span class="skill-bubble">${item}</span>`).join('')}
            </div>
        `;
        skillsContainer.appendChild(skillSection);
    });
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

// Función para inicializar después de cargar los includes
async function initializeAfterLoad() {
    shareButton = document.getElementById('shareProfile');
    
    // Inicializar modo oscuro
    initDarkModeButton();
    
    // Cargar datos desde JSON esperando su completación
    await loadExperiencia();
    await loadHabilidades();
    
    // Inicializar carruseles (después de que los datos estén cargados)
    initCarousels();
    
    // Inicializar contactos con click
    setupContactListeners();

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
}

// Cargar header y footer
async function loadIncludes() {
    try {
        // Cargar header
        const headerResponse = await fetch('include/header.html');
        const headerHTML = await headerResponse.text();
        document.getElementById('header-container').innerHTML = headerHTML;

        // Cargar footer
        const footerResponse = await fetch('include/footer.html');
        const footerHTML = await footerResponse.text();
        document.getElementById('footer-container').innerHTML = footerHTML;

        // Reinicializar eventos después de cargar el header
        await initializeAfterLoad();
    } catch (error) {
        console.error('Error al cargar includes:', error);
    }
}

// Inicializar cuando se cargue el DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadIncludes);
} else {
    loadIncludes();
}
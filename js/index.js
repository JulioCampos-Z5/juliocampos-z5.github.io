// Variables compartidas
let shareButton;

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
function initializeAfterLoad() {
    shareButton = document.getElementById('shareProfile');
    
    // Inicializar modo oscuro
    initDarkModeButton();
    
    // Inicializar carruseles
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
        initializeAfterLoad();
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
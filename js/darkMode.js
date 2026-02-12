// Variables para el modo oscuro con Tailwind CSS
let isDarkMode = false;
let modoButton;

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

// Inicializar botón de modo oscuro
function initDarkModeButton() {
    modoButton = document.getElementById('modo');
    
    if (modoButton) {
        modoButton.addEventListener('click', toggleDarkMode);
    }
    
    initializeDarkMode();
}

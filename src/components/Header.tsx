interface HeaderProps {
    isDark: boolean;
    onToggleDark: () => void;
}

export default function Header({ isDark, onToggleDark }: HeaderProps) {
    return (
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
            <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 text-left">
                    Julio Cesar Campos Aguilar:{' '}
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">
                        Desarrollador
                    </span>
                </h1>
                <button
                    onClick={onToggleDark}
                    className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center justify-center active:scale-95"
                    aria-label="Cambiar modo oscuro"
                >
                    <ion-icon
                        name={isDark ? 'sunny-outline' : 'moon-outline'}
                        class={`text-2xl ${isDark ? 'text-yellow-400' : 'text-gray-700'}`}
                    ></ion-icon>
                </button>
            </div>
        </header>
    );
}

const SOCIAL = [
    { icon: 'mail-outline', href: 'mailto:julioz5435@gmail.com', label: 'Email' },
    { icon: 'logo-whatsapp', href: 'https://wa.me/qr/UXKOCPRLXDN2J1', label: 'WhatsApp' },
    { icon: 'logo-linkedin', href: 'https://www.linkedin.com/in/julio-cesar-campos-aguilar-b3a53b278', label: 'LinkedIn' },
    { icon: 'logo-github', href: 'https://github.com/JulioCampos-Z5', label: 'GitHub' },
];

export default function Footer() {
    return (
        <footer className="bg-gray-50 dark:bg-gray-800 py-10 mt-16 border-t border-gray-200 dark:border-gray-700">
            <div className="max-w-6xl mx-auto px-4 text-center">
                <div className="flex justify-center gap-4 mb-5">
                    {SOCIAL.map((s) => (
                        <a
                            key={s.label}
                            href={s.href}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={s.label}
                            className="w-10 h-10 rounded-full bg-white dark:bg-gray-700 shadow-md flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 border border-gray-200 dark:border-gray-600"
                        >
                            <ion-icon name={s.icon} class="text-xl"></ion-icon>
                        </a>
                    ))}
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                    © 2026 Julio Cesar Campos Aguilar. Todos los derechos reservados.
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                    Hecho con React, TypeScript y Tailwind CSS
                </p>
            </div>
        </footer>
    );
}

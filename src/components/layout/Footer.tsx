import { contactos } from '../../data/contactos.ts';

const social = contactos.filter((c) => c.id !== 'tel');

export default function Footer() {
    return (
        <footer className="bg-gray-50 dark:bg-gray-800 py-10 mt-16 border-t border-gray-200 dark:border-gray-700">
            <div className="max-w-6xl mx-auto px-4 text-center">
                <div className="flex justify-center gap-4 mb-5">
                    {social.map((c) => (
                        <a
                            key={c.id}
                            href={c.href}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={c.label}
                            className="w-10 h-10 rounded-full bg-white dark:bg-gray-700 shadow-md flex items-center justify-center text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600"
                        >
                            <ion-icon name={c.icon} class="text-xl pointer-events-none"></ion-icon>
                        </a>
                    ))}
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                    © 2026 Julio Cesar Campos Aguilar. Todos los derechos reservados.
                </p>
            </div>
        </footer>
    );
}

import { useEffect, useRef, useState } from 'react';

const CONTACTS = [
    { id: 'mail', icon: 'mail-outline', iconClass: 'text-gray-600 dark:text-gray-300', href: 'mailto:julioz5435@gmail.com', label: 'julioz5435@gmail.com', linkClass: 'hover:text-blue-600 dark:hover:text-blue-400' },
    { id: 'tel', icon: 'call-outline', iconClass: 'text-gray-600 dark:text-gray-300', href: 'tel:+523329057215', label: '+52 333 905 7215', linkClass: 'hover:text-green-600 dark:hover:text-green-400' },
    { id: 'whatsapp', icon: 'logo-whatsapp', iconClass: 'text-green-500', href: 'https://wa.me/qr/UXKOCPRLXDN2J1', label: 'WhatsApp', linkClass: 'hover:text-green-600 dark:hover:text-green-400' },
    { id: 'linkedin', icon: 'logo-linkedin', iconClass: 'text-blue-600', href: 'https://www.linkedin.com/in/julio-cesar-campos-aguilar-b3a53b278', label: 'LinkedIn', linkClass: 'hover:text-blue-600 dark:hover:text-blue-400' },
    { id: 'github', icon: 'logo-github', iconClass: 'text-gray-600 dark:text-gray-300', href: 'https://github.com/JulioCampos-Z5', label: 'GitHub', linkClass: 'hover:text-gray-900 dark:hover:text-white' },
];

// Barra de contactos para móvil (horizontal, bajo el header)
export function MobileContacts() {
    const [shareLabel, setShareLabel] = useState<string | null>(null);

    const share = async () => {
        const data = {
            title: 'Julio Cesar Campos Aguilar',
            text: 'CV y portafolio de Julio Cesar Campos Aguilar.',
            url: window.location.href,
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
                setShareLabel('Link copiado');
                setTimeout(() => setShareLabel(null), 1800);
            } catch (err) {
                console.error('No se pudo copiar', err);
            }
        }
    };

    const itemClass =
        'w-10 h-10 bg-white dark:bg-gray-800 rounded-full shadow-md flex items-center justify-center hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-600';

    return (
        <div className="lg:hidden bg-white dark:bg-gray-900 py-3 border-b border-gray-200 dark:border-gray-700">
            <div className="flex justify-center gap-4 px-4">
                {CONTACTS.map((c) => (
                    <a key={c.id} href={c.href} target="_blank" rel="noreferrer" className={itemClass}>
                        <ion-icon name={c.icon} class={`text-xl ${c.iconClass}`}></ion-icon>
                    </a>
                ))}
                <button onClick={share} className={itemClass} aria-label="Compartir perfil">
                    {shareLabel ? (
                        <span className="text-[0.5rem] text-gray-600 dark:text-gray-300">{shareLabel}</span>
                    ) : (
                        <ion-icon name="share-social-outline" class="text-xl text-gray-600 dark:text-gray-300"></ion-icon>
                    )}
                </button>
            </div>
        </div>
    );
}

// Contactos flotantes laterales para desktop, con tooltip que se fija al hacer click
export function FloatingContacts() {
    const [pinned, setPinned] = useState<string | null>(null);
    const asideRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const closeOnOutsideClick = (e: MouseEvent) => {
            if (!asideRef.current?.contains(e.target as Node)) setPinned(null);
        };
        document.addEventListener('click', closeOnOutsideClick);
        return () => document.removeEventListener('click', closeOnOutsideClick);
    }, []);

    return (
        <aside ref={asideRef} className="fixed top-28 left-2 z-40 flex-col gap-3 hidden lg:flex">
            {CONTACTS.map((c) => (
                <div key={c.id} className={`contact-group relative ${pinned === c.id ? 'pinned' : ''}`}>
                    <button
                        onClick={() => setPinned((p) => (p === c.id ? null : c.id))}
                        className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-600"
                        aria-label={c.label}
                    >
                        <ion-icon name={c.icon} class={`text-2xl ${c.iconClass}`}></ion-icon>
                    </button>
                    <div className="contact-tooltip absolute left-14 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-3 opacity-0 pointer-events-none whitespace-nowrap border border-gray-200 dark:border-gray-600 z-10">
                        <a
                            href={c.href}
                            target="_blank"
                            rel="noreferrer"
                            onClick={() => setPinned(null)}
                            className={`text-sm text-gray-700 dark:text-gray-300 ${c.linkClass}`}
                        >
                            {c.label}
                        </a>
                    </div>
                </div>
            ))}
        </aside>
    );
}

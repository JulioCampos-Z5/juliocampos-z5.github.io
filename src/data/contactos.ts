import type { Contacto } from '../types.ts';

export const contactos: Contacto[] = [
    {
        id: 'mail',
        icon: 'mail-outline',
        iconClass: 'text-gray-600 dark:text-gray-300',
        href: 'mailto:julioz5435@gmail.com',
        label: 'julioz5435@gmail.com',
        linkClass: 'hover:text-blue-600 dark:hover:text-blue-400',
    },
    {
        id: 'tel',
        icon: 'call-outline',
        iconClass: 'text-gray-600 dark:text-gray-300',
        href: 'tel:+523329057215',
        label: '+52 333 905 7215',
        linkClass: 'hover:text-green-600 dark:hover:text-green-400',
    },
    {
        id: 'whatsapp',
        icon: 'logo-whatsapp',
        iconClass: 'text-green-500',
        href: 'https://wa.me/523329057215',
        label: 'WhatsApp',
        linkClass: 'hover:text-green-600 dark:hover:text-green-400',
    },
    {
        id: 'linkedin',
        icon: 'logo-linkedin',
        iconClass: 'text-blue-600',
        href: 'https://www.linkedin.com/in/julio-cesar-campos-aguilar-b3a53b278',
        label: 'LinkedIn',
        linkClass: 'hover:text-blue-600 dark:hover:text-blue-400',
    },
    {
        id: 'github',
        icon: 'logo-github',
        iconClass: 'text-gray-600 dark:text-gray-300',
        href: 'https://github.com/JulioCampos-Z5',
        label: 'GitHub',
        linkClass: 'hover:text-gray-900 dark:hover:text-white',
    },
];

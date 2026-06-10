import type { TechGroup } from '../types.ts';

export const tecnologias: TechGroup[] = [
    {
        titulo: 'Lenguajes',
        icono: 'code-slash-outline',
        items: [
            { nombre: 'PHP', imagen: 'img/PHP.png' },
            { nombre: 'Node.js', imagen: 'img/node.png' },
            { nombre: 'TypeScript', imagen: 'img/Typescript.svg.png' },
            { nombre: 'Go', imagen: 'img/Go.png' },
            { nombre: 'C++', imagen: 'img/C++.png' },
            { nombre: 'Python', imagen: 'img/PYTHON.png' },
            { nombre: 'JavaScript', imagen: 'img/javascript.png' },
            { nombre: 'HTML5', imagen: 'img/HTML5.png' },
            { nombre: 'CSS3', imagen: 'img/CSS3.png' },
        ],
    },
    {
        titulo: 'Frameworks',
        icono: 'layers-outline',
        items: [
            { nombre: 'React', imagen: 'img/React.svg.png' },
            { nombre: 'Tailwind', imagen: 'img/tailwind.png' },
            { nombre: 'Laravel', imagen: 'img/Laravel.svg.png' },
            { nombre: 'Vue.js', imagen: 'img/Vue.png' },
            { nombre: 'jQuery', imagen: 'img/jquery.png' },
        ],
    },
    {
        titulo: 'SGBD (SQL)',
        icono: 'server-outline',
        items: [
            { nombre: 'MySQL', imagen: 'img/MySQL.png' },
            { nombre: 'MariaDB', imagen: 'img/MariaDB.png' },
            { nombre: 'SQLite', imagen: 'img/Sqlite.png' },
        ],
    },
];

import type { TechGroup } from '../types.ts';

// Cada arreglo interno es una columna; sus grupos se apilan uno debajo del otro.
export const tecnologias: TechGroup[][] = [
    [{
        titulo: 'Lenguajes',
        icono: 'code-slash-outline',
        items: [
            { nombre: 'PHP', imagen: 'img/tech/php.svg' },
            { nombre: 'Node.js', imagen: 'img/tech/nodejs.svg' },
            { nombre: 'TypeScript', imagen: 'img/tech/typescript.svg' },
            { nombre: 'Go', imagen: 'img/tech/go.svg' },
            { nombre: 'C++', imagen: 'img/tech/cplusplus.svg' },
            { nombre: 'Python', imagen: 'img/tech/python.svg' },
            { nombre: 'JavaScript', imagen: 'img/tech/javascript.svg' },
            { nombre: 'HTML5', imagen: 'img/tech/html5.svg' },
            { nombre: 'CSS', imagen: 'img/tech/css.svg' },
        ],
    }],
    [{
        titulo: 'Frameworks',
        icono: 'layers-outline',
        items: [
            // JavaScript
            { nombre: 'React', imagen: 'img/tech/react.svg' },
            { nombre: 'React Native', imagen: 'img/tech/reactnative.svg' },
            { nombre: 'Tailwind', imagen: 'img/tech/tailwindcss.svg' },
            { nombre: 'Express', imagen: 'img/tech/express.svg', claseOscuro: 'dark:invert' },
            { nombre: 'Next.js', imagen: 'img/tech/nextjs.svg' },
            { nombre: 'Electron', imagen: 'img/tech/electron.svg', claseOscuro: 'dark:brightness-175' },
            { nombre: 'Expo Go', imagen: 'img/tech/expo.svg', claseOscuro: 'dark:invert' },
            { nombre: 'Vue.js', imagen: 'img/tech/vuejs.svg' },
            { nombre: 'jQuery', imagen: 'img/tech/jquery.svg' },
            // PHP
            { nombre: 'Laravel', imagen: 'img/tech/laravel.svg' },
            // Python
            { nombre: 'NumPy', imagen: 'img/tech/numpy.svg' },
            { nombre: 'pandas', imagen: 'img/tech/pandas.svg', claseOscuro: 'dark:invert dark:hue-rotate-180' },
        ],
    }],
    [{
        titulo: 'SGBD (SQL)',
        icono: 'server-outline',
        columnas: 1,
        items: [
            { nombre: 'MySQL', imagen: 'img/tech/mysql.svg', claseOscuro: 'dark:invert dark:hue-rotate-180' },
            { nombre: 'MariaDB', imagen: 'img/tech/mariadb.svg', claseOscuro: 'dark:invert dark:hue-rotate-180' },
            { nombre: 'SQLite', imagen: 'img/tech/sqlite.svg' },
        ],
    }],
    [{
        titulo: 'Servidores',
        icono: 'cloud-outline',
        columnas: 2,
        items: [
            { nombre: 'Docker', imagen: 'img/tech/docker.svg' },
            { nombre: 'cPanel', imagen: 'img/tech/cpanel.svg' },
            { nombre: 'Git', imagen: 'img/tech/git.svg' },
            { nombre: 'GitHub', imagen: 'img/tech/github.svg', claseOscuro: 'dark:invert' },
            { nombre: 'Agentes (IA)', imagen: 'img/tech/agentes.svg' },
        ],
    }],
];

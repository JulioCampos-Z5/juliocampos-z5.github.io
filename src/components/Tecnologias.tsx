import SectionTitle from './SectionTitle.tsx';

interface Tech {
    nombre: string;
    imagen: string;
}

interface TechGroup {
    titulo: string;
    icono: string;
    items: Tech[];
}

const grupos: TechGroup[] = [
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

export default function Tecnologias() {
    return (
        <section className="mb-16">
            <SectionTitle subtitle="Las herramientas con las que construyo soluciones.">
                Tecnologías y Herramientas
            </SectionTitle>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {grupos.map((grupo) => (
                    <div key={grupo.titulo} className="flex flex-col">
                        <h3 className="text-xl font-semibold mb-4 text-center text-gray-700 dark:text-gray-300 flex items-center justify-center gap-2">
                            <ion-icon name={grupo.icono} class="text-2xl text-blue-500"></ion-icon>
                            {grupo.titulo}
                        </h3>
                        <div className="grid grid-cols-3 gap-3">
                            {grupo.items.map((tech) => (
                                <div
                                    key={tech.nombre}
                                    className="tech-card group flex flex-col items-center p-3 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600"
                                >
                                    <img
                                        src={tech.imagen}
                                        alt={tech.nombre}
                                        className="w-12 h-12 object-contain mb-1 transition-transform duration-300 group-hover:scale-110"
                                    />
                                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{tech.nombre}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

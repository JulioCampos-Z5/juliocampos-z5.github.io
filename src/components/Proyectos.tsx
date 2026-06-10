import Carousel from './Carousel.tsx';
import SectionTitle from './SectionTitle.tsx';
import type { Proyecto } from '../types.ts';
import proyectosData from '../data/proyectos.json';

const proyectos: Proyecto[] = proyectosData;

function ProyectoCard({ proyecto, mobile }: { proyecto: Proyecto; mobile: boolean }) {
    const cardClass = mobile
        ? 'mobile-card card-lift w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col snap-start shrink-0 overflow-hidden'
        : 'card-lift shrink-0 w-[calc((100%-3rem)/3)] min-w-[18rem] bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden';

    return (
        <div className={cardClass}>
            {proyecto.imagen && (
                <img
                    src={proyecto.imagen}
                    alt={proyecto.titulo}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                        e.currentTarget.style.display = 'none';
                    }}
                />
            )}
            <div className="p-4 sm:p-6 flex flex-col grow">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">{proyecto.titulo}</h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 grow">{proyecto.descripcion}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {proyecto.tecnologias.map((tech) => (
                        <span
                            key={tech}
                            className="px-2.5 py-1 bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800 rounded-full text-xs font-medium"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
                <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex gap-3">
                        {proyecto.link && (
                            <a
                                href={proyecto.link}
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-600 dark:text-blue-400 hover:underline text-sm flex items-center gap-1"
                            >
                                <ion-icon name="logo-github" class="text-lg"></ion-icon> Repositorio
                            </a>
                        )}
                        {proyecto.demo && (
                            <a
                                href={proyecto.demo}
                                target="_blank"
                                rel="noreferrer"
                                className="text-green-600 dark:text-green-400 hover:underline text-sm flex items-center gap-1"
                            >
                                <ion-icon name="globe-outline" class="text-lg"></ion-icon> Demo
                            </a>
                        )}
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">{proyecto.fecha}</span>
                </div>
            </div>
        </div>
    );
}

export default function Proyectos() {
    return (
        <section className="mb-16">
            <SectionTitle subtitle="Algunos de los proyectos en los que he trabajado.">Proyectos</SectionTitle>
            <Carousel
                total={proyectos.length}
                mobileCards={proyectos.map((p) => <ProyectoCard key={p.titulo} proyecto={p} mobile />)}
                desktopCards={proyectos.map((p) => <ProyectoCard key={p.titulo} proyecto={p} mobile={false} />)}
            />
        </section>
    );
}

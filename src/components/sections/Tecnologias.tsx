import SectionTitle from '../ui/SectionTitle.tsx';
import { tecnologias } from '../../data/tecnologias.ts';

// En pantallas chicas todos los grupos usan 3 por renglón
const gridCols = { 1: 'grid-cols-3 lg:grid-cols-1', 2: 'grid-cols-3 lg:grid-cols-2', 3: 'grid-cols-3' } as const;

export default function Tecnologias() {
    return (
        <section className="mb-16">
            <SectionTitle subtitle="Las herramientas con las que construyo soluciones.">
                Tecnologías y Herramientas
            </SectionTitle>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[3fr_3fr_1fr_2fr] gap-8">
                {tecnologias.map((columna) => (
                    <div key={columna[0].titulo} className="flex flex-col gap-8">
                        {columna.map((grupo) => (
                            <div key={grupo.titulo} className="flex flex-col">
                                <h3 className="text-xl font-semibold mb-4 text-center text-gray-700 dark:text-gray-300 flex items-center justify-center gap-2 whitespace-nowrap">
                                    <ion-icon name={grupo.icono} class="text-2xl text-blue-500"></ion-icon>
                                    {grupo.titulo}
                                </h3>
                                <div className={`grid ${gridCols[grupo.columnas ?? 3]} gap-3`}>
                                    {grupo.items.map((tech) => (
                                        <div
                                            key={tech.nombre}
                                            className="tech-card flex flex-col items-center p-3 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700"
                                        >
                                            <img src={tech.imagen} alt={tech.nombre} className={`w-12 h-12 object-contain mb-1 ${tech.claseOscuro ?? ''}`} />
                                            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{tech.nombre}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </section>
    );
}

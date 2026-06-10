import SectionTitle from '../ui/SectionTitle.tsx';
import { tecnologias } from '../../data/tecnologias.ts';

export default function Tecnologias() {
    return (
        <section className="mb-16">
            <SectionTitle subtitle="Las herramientas con las que construyo soluciones.">
                Tecnologías y Herramientas
            </SectionTitle>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {tecnologias.map((grupo) => (
                    <div key={grupo.titulo} className="flex flex-col">
                        <h3 className="text-xl font-semibold mb-4 text-center text-gray-700 dark:text-gray-300 flex items-center justify-center gap-2">
                            <ion-icon name={grupo.icono} class="text-2xl text-blue-500"></ion-icon>
                            {grupo.titulo}
                        </h3>
                        <div className="grid grid-cols-3 gap-3">
                            {grupo.items.map((tech) => (
                                <div
                                    key={tech.nombre}
                                    className="tech-card flex flex-col items-center p-3 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700"
                                >
                                    <img src={tech.imagen} alt={tech.nombre} className="w-12 h-12 object-contain mb-1" />
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

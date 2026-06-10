import { colorMap, type Habilidad } from '../types.ts';
import habilidadesData from '../data/habilidades.json';

const habilidades: Habilidad[] = habilidadesData.habilidades;

export default function Habilidades() {
    return (
        <section className="mb-16 animate-fadeInUp">
            <h2 className="text-3xl font-bold mb-2 text-left text-gray-800 dark:text-gray-100">Habilidades</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                Stack técnico y habilidades clave que uso a diario.
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="grid gap-6 md:grid-cols-2">
                    {habilidades.map((skill) => (
                        <div key={skill.titulo} className="flex flex-col gap-3">
                            <div className="flex items-center gap-2">
                                <span
                                    className="w-2 h-2 rounded-full"
                                    style={{ backgroundColor: colorMap[skill.icono] ?? '#3b82f6' }}
                                ></span>
                                <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">{skill.titulo}</p>
                            </div>
                            <div className="flex flex-wrap gap-3 sm:gap-4">
                                {skill.items.map((item) => (
                                    <span key={item} className="skill-bubble">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

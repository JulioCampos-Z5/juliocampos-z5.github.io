import SectionTitle from './SectionTitle.tsx';
import { colorMap, type Habilidad } from '../types.ts';
import habilidadesData from '../data/habilidades.json';

const habilidades: Habilidad[] = habilidadesData.habilidades;

export default function Habilidades() {
    return (
        <section className="mb-16">
            <SectionTitle subtitle="Stack técnico y habilidades clave que uso a diario.">Habilidades</SectionTitle>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="grid gap-8 md:grid-cols-2">
                    {habilidades.map((skill) => (
                        <div key={skill.titulo} className="flex flex-col gap-4">
                            <div className="flex items-center gap-2">
                                <span
                                    className="w-2.5 h-2.5 rounded-full"
                                    style={{ backgroundColor: colorMap[skill.icono] ?? '#3b82f6' }}
                                ></span>
                                <p className="text-base font-semibold text-gray-800 dark:text-gray-100">{skill.titulo}</p>
                            </div>
                            <div className="flex flex-wrap gap-3">
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

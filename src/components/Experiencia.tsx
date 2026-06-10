import Carousel from './Carousel.tsx';
import SectionTitle from './SectionTitle.tsx';
import { colorMap, type Experiencia as ExperienciaItem } from '../types.ts';
import experienciaData from '../data/experiencia.json';

const experiencias: ExperienciaItem[] = experienciaData.experiencia;

function ExpCard({ exp, mobile }: { exp: ExperienciaItem; mobile: boolean }) {
    const color = colorMap[exp.icono] ?? '#3b82f6';
    const cardClass = mobile
        ? 'mobile-card card-lift w-full h-96 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col snap-start shrink-0 overflow-hidden'
        : 'card-lift shrink-0 w-[calc((100%-3rem)/3)] min-w-[18rem] h-96 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden';

    return (
        <div className={cardClass}>
            <div className={`flex flex-col grow ${mobile ? 'p-4' : 'p-6'}`}>
                <h3 className={`${mobile ? 'text-lg' : 'text-xl'} font-semibold mb-4 text-gray-800 dark:text-gray-100`}>
                    {exp.titulo}
                </h3>
                <ul className={`text-gray-600 dark:text-gray-400 mb-6 space-y-3 ${mobile ? 'text-sm' : 'text-base'} grow`}>
                    {exp.descripcion.map((desc) => (
                        <li key={desc} className="flex items-start">
                            <span className="w-2 h-2 rounded-full mt-2 mr-3 shrink-0" style={{ backgroundColor: color }}></span>
                            {desc}
                        </li>
                    ))}
                </ul>
                <p className="text-right mt-auto">
                    <span className={`inline-block px-3 py-1 rounded-full ${mobile ? 'text-xs' : 'text-sm'} font-medium bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300`}>
                        {exp.periodo}
                    </span>
                </p>
            </div>
        </div>
    );
}

export default function Experiencia() {
    return (
        <section className="mb-16">
            <SectionTitle subtitle="Mi trayectoria profesional hasta hoy.">Experiencia</SectionTitle>
            <Carousel
                total={experiencias.length}
                mobileCards={experiencias.map((exp) => <ExpCard key={exp.titulo} exp={exp} mobile />)}
                desktopCards={experiencias.map((exp) => <ExpCard key={exp.titulo} exp={exp} mobile={false} />)}
            />
        </section>
    );
}

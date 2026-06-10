import Carousel from './Carousel.tsx';
import { colorMap, type Experiencia as ExperienciaItem } from '../types.ts';
import experienciaData from '../data/experiencia.json';

const experiencias: ExperienciaItem[] = experienciaData.experiencia;

function ExpCard({ exp, mobile }: { exp: ExperienciaItem; mobile: boolean }) {
    const color = colorMap[exp.icono] ?? '#3b82f6';
    const cardClass = mobile
        ? 'mobile-card w-full h-96 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col snap-start shrink-0'
        : 'flex-shrink-0 w-[calc((100%-3rem)/3)] min-w-[18rem] h-96 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col';

    return (
        <div className={cardClass}>
            <h3 className={`${mobile ? 'text-lg' : 'text-xl'} font-semibold mb-4 text-gray-800 dark:text-gray-100`}>
                {exp.titulo}
            </h3>
            <ul className={`text-gray-600 dark:text-gray-400 mb-6 space-y-3 ${mobile ? 'text-sm' : 'text-base'} flex-grow`}>
                {exp.descripcion.map((desc) => (
                    <li key={desc} className="flex items-start">
                        <span className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0" style={{ backgroundColor: color }}></span>
                        {desc}
                    </li>
                ))}
            </ul>
            <p className={`text-right ${mobile ? 'text-xs' : 'text-sm'} text-gray-500 dark:text-gray-400 font-medium mt-auto`}>
                {exp.periodo}
            </p>
        </div>
    );
}

export default function Experiencia() {
    return (
        <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-left text-gray-800 dark:text-gray-100">Experiencia</h2>
            <Carousel
                total={experiencias.length}
                mobileCards={experiencias.map((exp) => <ExpCard key={exp.titulo} exp={exp} mobile />)}
                desktopCards={experiencias.map((exp) => <ExpCard key={exp.titulo} exp={exp} mobile={false} />)}
            />
        </section>
    );
}

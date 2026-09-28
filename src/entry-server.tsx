// Entrada para el pre-render del build (scripts/prerender.mjs).
// Genera el HTML estático, los datos estructurados y llms.txt a partir de los mismos datos del CV,
// para que buscadores y rastreadores de IA que no ejecutan JavaScript vean el contenido completo.
import { renderToString } from 'react-dom/server';
import App from './App.tsx';
import { tecnologias } from './data/tecnologias.ts';
import { contactos } from './data/contactos.ts';
import experienciaData from './data/experiencia.json';
import proyectos from './data/proyectos.json';
import habilidadesData from './data/habilidades.json';
import type { Experiencia, Habilidad, Proyecto } from './types.ts';

export const SITE_URL = 'https://juliocampos-portfolio.pages.dev/';

const NOMBRE = 'Julio Cesar Campos Aguilar';
const PUESTO = 'Desarrollador Web Fullstack';
const RESUMEN =
    'Ingeniero informático y desarrollador fullstack en Guadalajara, Jalisco, México. Desarrolla aplicaciones web, ' +
    'móviles y de escritorio, ofrece consultoría tecnológica a pymes y lidera equipos técnicos.';

const experiencia = experienciaData.experiencia as Experiencia[];
const habilidades = habilidadesData.habilidades as Habilidad[];
const listaProyectos = proyectos as Proyecto[];
const grupos = tecnologias.flat();
const contacto = (id: string) => contactos.find((c) => c.id === id)!.href;

export function render(): string {
    return renderToString(<App />);
}

export function jsonLd(fecha: string): object {
    const empleos = experiencia
        .filter((e) => e.periodo.includes('Actualmente') && !e.titulo.startsWith('Freelancer'))
        .map((e) => ({ '@type': 'Organization', name: e.titulo.split(':')[0].trim() }));

    return {
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        url: SITE_URL,
        dateModified: fecha,
        inLanguage: 'es-MX',
        mainEntity: {
            '@type': 'Person',
            name: NOMBRE,
            alternateName: 'Julio Campos',
            jobTitle: PUESTO,
            description: RESUMEN,
            url: SITE_URL,
            image: `${SITE_URL}img/Pro.jpg`,
            email: contacto('mail'),
            telephone: contacto('tel').replace('tel:', ''),
            address: {
                '@type': 'PostalAddress',
                addressLocality: 'Guadalajara',
                addressRegion: 'Jalisco',
                addressCountry: 'MX',
            },
            worksFor: empleos,
            knowsLanguage: 'es',
            knowsAbout: [
                ...grupos.flatMap((g) => g.items.map((t) => t.nombre)),
                ...habilidades.find((h) => h.titulo === 'Stack técnico')!.items,
            ],
            sameAs: [contacto('linkedin'), contacto('github')],
        },
    };
}

// Resumen en texto plano para modelos de lenguaje (https://llmstxt.org)
export function llmsTxt(): string {
    const lineas = [
        `# ${NOMBRE}`,
        '',
        `> ${PUESTO}. ${RESUMEN}`,
        '',
        `CV en línea: ${SITE_URL}`,
        '',
        '## Experiencia',
        ...experiencia.map((e) => `- ${e.titulo} (${e.periodo}): ${e.descripcion.join(' ')}`),
        '',
        '## Proyectos',
        ...listaProyectos.map((p) => {
            const titulo = p.link ? `[${p.titulo}](${p.link})` : p.titulo;
            return `- ${titulo} (${p.fecha}): ${p.descripcion} Tecnologías: ${p.tecnologias.join(', ')}.`;
        }),
        '',
        '## Tecnologías',
        ...grupos.map((g) => `- ${g.titulo}: ${g.items.map((t) => t.nombre).join(', ')}`),
        '',
        '## Habilidades',
        ...habilidades.map((h) => `- ${h.titulo}: ${h.items.join(', ')}`),
        '',
        '## Contacto',
        `- Correo: ${contacto('mail').replace('mailto:', '')}`,
        `- LinkedIn: ${contacto('linkedin')}`,
        `- GitHub: ${contacto('github')}`,
        '',
    ];
    return lineas.join('\n');
}

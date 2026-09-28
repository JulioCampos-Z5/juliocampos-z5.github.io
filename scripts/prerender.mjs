// Inserta el CV pre-renderizado en dist/index.html y genera los archivos para buscadores.
// Se ejecuta después de `vite build` y `vite build --ssr` (ver "build" en package.json).
import { readFileSync, writeFileSync, rmSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const servidor = resolve('dist-server/entry-server.js');
const { render, jsonLd, llmsTxt, SITE_URL } = await import(pathToFileURL(servidor).href);

const fecha = new Date().toISOString().slice(0, 10);
const indexPath = resolve('dist/index.html');
const html = readFileSync(indexPath, 'utf-8');

const raiz = '<div id="root"></div>';
if (!html.includes(raiz)) throw new Error(`No se encontró ${raiz} en dist/index.html`);

// `<` escapado para que ningún texto de los datos pueda cerrar el <script>
const datos = JSON.stringify(jsonLd(fecha)).replace(/</g, '\\u003c');

const salida = html
    .replace(raiz, `<div id="root">${render()}</div>`)
    .replace('</head>', `    <script type="application/ld+json">${datos}</script>\n</head>`);

writeFileSync(indexPath, salida);
writeFileSync(resolve('dist/llms.txt'), llmsTxt());
writeFileSync(
    resolve('dist/sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>${SITE_URL}</loc>
        <lastmod>${fecha}</lastmod>
    </url>
</urlset>
`
);

rmSync(resolve('dist-server'), { recursive: true, force: true });
console.log('Pre-render listo: index.html, llms.txt y sitemap.xml');

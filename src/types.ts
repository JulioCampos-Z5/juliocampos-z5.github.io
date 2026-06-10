export interface Experiencia {
    titulo: string;
    periodo: string;
    icono: string;
    descripcion: string[];
}

export interface Proyecto {
    titulo: string;
    descripcion: string;
    tecnologias: string[];
    imagen: string;
    link: string;
    demo: string;
    fecha: string;
}

export interface Habilidad {
    titulo: string;
    icono: string;
    items: string[];
}

// Mapa de colores para los iconos
export const colorMap: Record<string, string> = {
    'blue-500': '#3b82f6',
    'purple-500': '#a855f7',
    'amber-500': '#f59e0b',
};

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

export interface Contacto {
    id: string;
    icon: string;
    iconClass: string;
    href: string;
    label: string;
    linkClass: string;
}

export interface Tech {
    nombre: string;
    imagen: string;
    claseOscuro?: string;
}

export interface TechGroup {
    titulo: string;
    icono: string;
    // Tarjetas por renglón (3 si no se indica)
    columnas?: 1 | 2 | 3;
    items: Tech[];
}

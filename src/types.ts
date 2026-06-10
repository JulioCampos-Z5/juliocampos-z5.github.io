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
}

export interface TechGroup {
    titulo: string;
    icono: string;
    items: Tech[];
}

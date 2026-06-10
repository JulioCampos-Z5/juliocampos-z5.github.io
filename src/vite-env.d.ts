/// <reference types="vite/client" />

import type * as React from 'react';

// El componente web <ion-icon> de Ionicons no es un elemento JSX nativo
declare module 'react' {
    namespace JSX {
        interface IntrinsicElements {
            'ion-icon': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
                name?: string;
                class?: string;
            };
        }
    }
}

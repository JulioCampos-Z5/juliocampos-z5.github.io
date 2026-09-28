import { useEffect, useState } from 'react';

export function useDarkMode(): [boolean, () => void] {
    const [isDark, setIsDark] = useState(() => {
        // En el pre-render no hay navegador; el script de index.html aplica el tema antes de que cargue React
        if (typeof window === 'undefined') return false;
        const saved = localStorage.getItem('darkMode');
        if (saved !== null) return saved === 'true';
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDark);
        localStorage.setItem('darkMode', String(isDark));
    }, [isDark]);

    return [isDark, () => setIsDark((d) => !d)];
}

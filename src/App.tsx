import Header from './components/Header.tsx';
import { MobileContacts, FloatingContacts } from './components/Contacts.tsx';
import Experiencia from './components/Experiencia.tsx';
import Proyectos from './components/Proyectos.tsx';
import Habilidades from './components/Habilidades.tsx';
import Tecnologias from './components/Tecnologias.tsx';
import Footer from './components/Footer.tsx';
import { useDarkMode } from './hooks/useDarkMode.ts';

export default function App() {
    const [isDark, toggleDark] = useDarkMode();

    return (
        <>
            <Header isDark={isDark} onToggleDark={toggleDark} />
            <MobileContacts />
            <FloatingContacts />

            <main className="max-w-6xl mx-auto px-4 py-8">
                {/* Imagen de perfil */}
                <div className="mb-12">
                    <img className="w-full h-auto rounded-2xl shadow-lg" src="img/Pro.jpg" alt="Perfil" />
                </div>

                {/* Descripción */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 text-left text-gray-800 dark:text-gray-100">Descripción</h2>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed text-left">
                        Soy un ingeniero informático apasionado por la tecnología, con experiencia en desarrollo de
                        aplicaciones de escritorio, web y móvil, consultoría tecnológica para pymes, y liderazgo de
                        equipos técnicos. Me motiva aportar soluciones innovadoras y seguir aprendiendo en entornos
                        dinámicos que impulsen mi crecimiento profesional.
                    </p>
                </section>

                <Experiencia />
                <Proyectos />
                <Habilidades />
                <Tecnologias />
            </main>

            <Footer />
        </>
    );
}

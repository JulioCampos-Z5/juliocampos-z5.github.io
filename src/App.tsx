import Header from './components/Header.tsx';
import { MobileContacts, FloatingContacts } from './components/Contacts.tsx';
import Experiencia from './components/Experiencia.tsx';
import Proyectos from './components/Proyectos.tsx';
import Habilidades from './components/Habilidades.tsx';
import Tecnologias from './components/Tecnologias.tsx';
import Footer from './components/Footer.tsx';
import Reveal from './components/Reveal.tsx';
import SectionTitle from './components/SectionTitle.tsx';
import { useDarkMode } from './hooks/useDarkMode.ts';

export default function App() {
    const [isDark, toggleDark] = useDarkMode();

    return (
        <>
            <Header isDark={isDark} onToggleDark={toggleDark} />
            <MobileContacts />
            <FloatingContacts />

            <main className="max-w-6xl mx-auto px-4 py-8">
                {/* Hero con imagen panorámica y overlay */}
                <Reveal className="mb-14">
                    <div className="relative overflow-hidden rounded-3xl shadow-2xl group">
                        <img
                            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                            src="img/Pro.jpg"
                            alt="Julio Cesar Campos Aguilar"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-gray-900/80 via-gray-900/20 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8">
                            <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-blue-300 mb-1">
                                Ingeniero Informático
                            </p>
                            <h2 className="text-2xl sm:text-4xl font-bold text-white drop-shadow-lg">
                                Desarrollador Web Fullstack
                            </h2>
                            <div className="hidden sm:flex flex-wrap gap-2 mt-4">
                                {['Web', 'Escritorio', 'Móvil', 'Consultoría'].map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1 text-xs font-medium text-white bg-white/15 backdrop-blur-sm rounded-full border border-white/25"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </Reveal>

                {/* Descripción */}
                <Reveal className="mb-16">
                    <section>
                        <SectionTitle>Descripción</SectionTitle>
                        <div className="relative pl-5 border-l-4 border-blue-500/60 dark:border-blue-400/50">
                            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed text-left">
                                Soy un ingeniero informático apasionado por la tecnología, con experiencia en desarrollo
                                de aplicaciones de escritorio, web y móvil, consultoría tecnológica para pymes, y
                                liderazgo de equipos técnicos. Me motiva aportar soluciones innovadoras y seguir
                                aprendiendo en entornos dinámicos que impulsen mi crecimiento profesional.
                            </p>
                        </div>
                    </section>
                </Reveal>

                <Reveal>
                    <Experiencia />
                </Reveal>
                <Reveal>
                    <Proyectos />
                </Reveal>
                <Reveal>
                    <Habilidades />
                </Reveal>
                <Reveal>
                    <Tecnologias />
                </Reveal>
            </main>

            <Footer />
        </>
    );
}

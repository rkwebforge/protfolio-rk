import { ChevronUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import About from '../components/About';
import Contact from '../components/Contact';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import Skills from '../components/Skills';

function SinglePage() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sections = [
    { id: 'hero', label: 'Home' },
    { id: 'skills', label: 'Skills' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className='single-page-container min-h-screen bg-slate-900'>
      {/* Quick Navigation */}
      <div className='fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 transform lg:block'>
        <nav className='rounded-2xl bg-white/90 p-3 shadow-lg backdrop-blur-sm'>
          <ul className='space-y-3'>
            {sections.map(section => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className='group flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 hover:bg-blue-50 hover:text-blue-600'
                  title={section.label}
                >
                  <div className='h-2 w-2 rounded-full bg-gray-400 transition-all duration-300 group-hover:scale-150 group-hover:bg-blue-600' />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Hero Section */}
      <section id='hero' className='min-h-screen'>
        <Hero />
      </section>

      {/* Skills Section */}
      <section id='skills' className=''>
        <Skills />
      </section>

      {/* About Section */}
      <section id='about' className=''>
        <About />
      </section>

      {/* Projects Section */}
      <section id='projects' className='relative'>
        <Projects />
      </section>

      {/* Contact Section */}
      <section id='contact' className=''>
        <Contact />
      </section>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className='fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl'
          aria-label='Scroll to top'
        >
          <ChevronUp size={20} />
        </button>
      )}
    </div>
  );
}

export default SinglePage;

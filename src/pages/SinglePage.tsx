import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import About from "../components/About";
import Contact from "../components/Contact";
import Hero from "../components/Hero";
import Projects from "../components/Projects";
import Skills from "../components/Skills";

// The current section is shown in the navbar breadcrumb (see Navbar.tsx)
function SinglePage() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="single-page-container min-h-screen">
      {/* Hero Section */}
      <section id="hero" className="min-h-screen">
        <Hero />
      </section>

      {/* Skills Section */}
      <section id="skills" className="">
        <Skills />
      </section>

      {/* About Section */}
      <section id="about" className="">
        <About />
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative">
        <Projects />
      </section>

      {/* Contact Section */}
      <section id="contact" className="">
        <Contact />
      </section>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-md border border-rule bg-raised text-fg transition-colors hover:border-accent hover:text-accent"
          aria-label="Scroll to top"
        >
          <ChevronUp size={20} />
        </button>
      )}
    </div>
  );
}

export default SinglePage;

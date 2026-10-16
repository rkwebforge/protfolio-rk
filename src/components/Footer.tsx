import { ArrowUp, Code, Mail, MapPin } from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { EMAIL, EMAIL_HREF, LOCATION } from "../constants/contact";
import { ROUTES } from "../constants/paths";

const Footer: React.FC = () => {
  const onSinglePage = useLocation().pathname === ROUTES.SINGLE_PAGE;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const quickLinks = [
    { path: ROUTES.HOME, label: "Home" },
    { path: ROUTES.ABOUT, label: "About" },
    { path: ROUTES.PROJECTS, label: "Projects" },
    { path: ROUTES.CONTACT, label: "Contact" },
  ];

  const services = [
    "Web Development",
    "UI Development",
    "React Applications",
    "Performance Optimization",
  ];

  return (
    <footer className="border-t border-rule bg-ink/90">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Main Footer Content */}
        <div className="grid gap-8 py-16 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="mb-6 flex items-center gap-2">
              <Code size={24} className="text-accent" aria-hidden="true" />
              <h3 className="text-xl font-semibold text-white">RK Prasad</h3>
            </div>
            <p className="mb-6 leading-relaxed text-muted">
              Full Stack Developer passionate about creating exceptional digital
              experiences with modern technologies and innovative solutions.
            </p>
            <p className="text-sm text-muted">
              Made with care and lots of coffee.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-6 font-medium text-white">Quick links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-muted transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-6 font-medium text-white">Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service} className="text-muted">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-6 font-medium text-white">Get in touch</h4>
            <div className="space-y-4">
              <a
                href={EMAIL_HREF}
                className="flex items-center gap-3 text-muted transition-colors hover:text-accent"
              >
                <Mail size={18} aria-hidden="true" />
                <span>{EMAIL}</span>
              </a>
              <div className="flex items-center gap-3 text-muted">
                <MapPin size={18} aria-hidden="true" />
                <span>{LOCATION}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-rule py-8 md:flex-row">
          <p className="text-center text-sm text-muted md:text-left">
            © {new Date().getFullYear()} RK Prasad. All rights reserved.
          </p>

          {/* SinglePage has its own floating scroll-to-top button */}
          {!onSinglePage && (
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 rounded-md border border-rule p-2.5 font-display text-sm font-medium text-fg transition-colors hover:border-accent hover:text-accent"
              aria-label="Scroll to top"
            >
              <ArrowUp size={18} aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

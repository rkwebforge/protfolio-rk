import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Link, useLocation } from "react-router-dom";
import { NAV_ITEMS, ROUTES, SINGLE_PAGE_SECTIONS } from "../constants/paths";
import { useActiveSection } from "../hooks/useActiveSection";

// Breadcrumb file name for each standalone page
const PAGE_FILES: Record<string, string> = {
  [ROUTES.HOME]: "home",
  [ROUTES.ABOUT]: "about",
  [ROUTES.PROJECTS]: "projects",
  [ROUTES.CONTACT]: "contact",
};

interface NavItem {
  id?: number;
  path: string;
  label: string;
}

interface LogoProps {
  name: string;
  title: string;
}

interface NavLinkProps {
  item: NavItem;
  isActive: boolean;
  onClick?: () => void;
  isMobile?: boolean;
  id?: number | undefined;
}

// Logo component
const Logo: React.FC<LogoProps> = React.memo(({ name, title }) => (
  <Link
    to={ROUTES.HOME}
    className="group flex flex-col"
    aria-label="Go to homepage"
  >
    <span className="font-display text-base font-semibold text-accent transition-colors group-hover:text-white">
      {name}
    </span>
    <span className="hidden text-sm text-muted sm:block">{title}</span>
  </Link>
));

// Shown in place of the logo once scrolled: an editor-style path to the
// page (or single-page section) being read, e.g. "~/rk / skills.tsx".
const Breadcrumb: React.FC<{ file: string }> = React.memo(({ file }) => (
  <Link
    to={ROUTES.HOME}
    className="group flex min-w-0 items-center rounded-2xl border border-rule bg-raised/60 px-4 py-3 font-display text-sm backdrop-blur"
    aria-label={`Go to homepage (currently viewing ${file})`}
  >
    <span className="text-accent transition-colors group-hover:text-white">
      ~/rk
    </span>
    <span className="mx-2 text-muted" aria-hidden="true">
      /
    </span>
    <span className="relative inline-flex overflow-hidden" aria-hidden="true">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={file}
          className="whitespace-nowrap text-white"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {file}.tsx
        </motion.span>
      </AnimatePresence>
    </span>
    <span className="caret" aria-hidden="true" />
  </Link>
));

// Desktop NavLink component
const DesktopNavLink: React.FC<NavLinkProps> = React.memo(
  ({ item, isActive }) => (
    <Link
      to={item.path}
      className={`relative flex items-center rounded-xl px-4 py-2 font-display text-sm transition-colors ${
        isActive ? "text-accent" : "text-muted hover:text-fg"
      }`}
      aria-current={isActive ? "page" : undefined}
    >
      {isActive && (
        // Glassy pill that slides between links, with a glowing dot beneath
        <motion.span
          layoutId="nav-pill"
          className="absolute inset-0 rounded-xl border border-accent/40 bg-accent/10 shadow-[0_0_24px_rgba(255,77,94,0.25)]"
          transition={{ type: "spring", stiffness: 400, damping: 32 }}
          aria-hidden="true"
        >
          <span className="absolute -bottom-[7px] left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_8px_rgba(255,77,94,0.9)]" />
        </motion.span>
      )}
      <span className="relative">{item.label}</span>
    </Link>
  ),
);

// Mobile NavLink component
const MobileNavLink: React.FC<NavLinkProps> = React.memo(
  ({ item, isActive, onClick }) => (
    <Link
      to={item.path}
      onClick={onClick}
      className={`flex items-center border-l-2 px-4 py-3 font-display text-sm transition-colors ${
        isActive
          ? "border-accent text-white"
          : "border-transparent text-muted hover:text-fg"
      }`}
      aria-current={isActive ? "page" : undefined}
    >
      {item.label}
    </Link>
  ),
);

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const onSinglePage = location.pathname === ROUTES.SINGLE_PAGE;
  const activeSection = useActiveSection(SINGLE_PAGE_SECTIONS, onSinglePage);
  const file = onSinglePage
    ? activeSection === "hero" || !activeSection
      ? "home"
      : activeSection
    : (PAGE_FILES[location.pathname] ?? "404");

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 40,
    restDelta: 0.001,
  });

  const navItems = useMemo(() => NAV_ITEMS, []);

  const tickingRef = useRef(false);

  const handleScroll = useCallback(() => {
    if (tickingRef.current) return;
    tickingRef.current = true;

    requestAnimationFrame(() => {
      const y = window.scrollY;
      setScrolled(y > 20);
      tickingRef.current = false;
    });
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname],
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Also listen to touchmove for mobile devices
    window.addEventListener("touchmove", handleScroll, { passive: true });

    // Check scroll position on mount and after route changes
    const checkScrollPosition = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);
    };

    checkScrollPosition();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
    };
  }, [handleScroll]);

  // Additional effect to handle route changes and ensure correct state
  useEffect(() => {
    const checkScrollPosition = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);
    };

    // Only scroll to top for route changes, not for single-page navigation
    if (location.pathname !== ROUTES.SINGLE_PAGE) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // Small delay to ensure DOM is updated after route change
    const timeoutId = setTimeout(checkScrollPosition, 100);

    return () => clearTimeout(timeoutId);
  }, [location.pathname]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        closeMenu();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMenuOpen, closeMenu]);

  return (
    <>
      {/* Reading progress along the top edge of the viewport */}
      <motion.div
        className={`fixed inset-x-0 top-0 z-60 h-0.5 origin-left bg-accent shadow-[0_0_10px_rgba(255,77,94,0.8)] transition-opacity duration-200 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
        style={{ scaleX: progress }}
        aria-hidden="true"
      />

      {/* No bar background: the breadcrumb and link pills float over the page */}
      <nav
        className="fixed top-0 z-50 w-full"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex h-20 items-center justify-between gap-4">
            {scrolled ? (
              <Breadcrumb file={file} />
            ) : (
              <Logo name="RK Prasad" title="Full Stack Developer" />
            )}

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="flex items-center gap-1 rounded-2xl border border-rule bg-raised/60 p-1.5 backdrop-blur">
                {navItems.map((item) => (
                  <React.Fragment key={item.id}>
                    <DesktopNavLink
                      item={item}
                      isActive={isActive(item.path)}
                      id={item.id}
                    />
                    {item.id === 3 && (
                      <span
                        className="mx-1 h-5 w-px bg-rule"
                        aria-hidden="true"
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className={`rounded-md border bg-raised/60 p-2.5 backdrop-blur transition-colors ${
                  isMenuOpen
                    ? "border-accent text-accent"
                    : "border-rule text-fg hover:border-accent hover:text-accent"
                }`}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                aria-label={
                  isMenuOpen ? "Close navigation menu" : "Open navigation menu"
                }
              >
                {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              id="mobile-menu"
              className="md:hidden"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
            >
              <div className="mx-4 mb-4 rounded-lg border border-rule bg-ink py-2">
                {navItems.map((item) => (
                  <React.Fragment key={item.id}>
                    {item.id === 4 && (
                      <div className="my-2 h-px bg-rule" aria-hidden="true" />
                    )}
                    <MobileNavLink
                      item={item}
                      isActive={isActive(item.path)}
                      onClick={closeMenu}
                      isMobile
                      id={item.id}
                    />
                  </React.Fragment>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;

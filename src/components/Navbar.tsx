import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  fadeInDown,
  navItemAnimation,
  slideInFromTop,
} from '../utils/animations';

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
  id?: number | undefined; // Optional for animation delay
}

// Logo component
const Logo: React.FC<LogoProps> = React.memo(({ name, title }) => (
  <motion.div variants={fadeInDown} initial='initial' animate='animate'>
    <Link
      to='/'
      className='group flex items-center space-x-2 transition-all duration-300 hover:scale-105 sm:space-x-3'
      aria-label='Go to homepage'
    >
      <div className='relative'>
        <motion.div
          className='flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 shadow-lg shadow-blue-500/25 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-blue-500/40 sm:h-10 sm:w-10'
          whileHover={{
            rotate: 3,
            scale: 1.08,
            transition: { type: 'spring', stiffness: 400, damping: 15 },
          }}
          whileTap={{
            scale: 0.95,
            transition: { type: 'spring', stiffness: 500, damping: 20 },
          }}
        >
          <span
            className='text-sm font-bold text-white sm:text-lg'
            aria-hidden='true'
          >
            {name}
          </span>
        </motion.div>
        <motion.div
          className='absolute -inset-1 -z-10 rounded-xl bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 opacity-0 blur-md transition-all duration-300 group-hover:opacity-100'
          initial={{ opacity: 0, scale: 0.8 }}
          whileHover={{
            opacity: 1,
            scale: 1.1,
            transition: { type: 'spring', stiffness: 300, damping: 20 },
          }}
        />
      </div>
      <div className='flex flex-col'>
        <span className='bg-gradient-to-r from-accent-400 via-primary-400 to-secondary-400 bg-clip-text text-lg font-bold text-transparent sm:text-xl'>
          RK Prasad
        </span>
        <span className='hidden text-xs font-medium tracking-wide text-gray-300 opacity-50 transition-all duration-300 group-hover:opacity-100 sm:block'>
          {title}
        </span>
      </div>
    </Link>
  </motion.div>
));

// Desktop NavLink component
const DesktopNavLink: React.FC<NavLinkProps> = React.memo(
  ({ item, isActive, id }) => {
    const baseClasses =
      'relative rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-500 ease-out flex items-center justify-center min-w-[80px]';
    const activeClasses = 'text-blue-600 shadow-lg shadow-blue-500/20';
    const inactiveClasses = 'text-gray-600 hover:text-blue-600 hover:scale-105';

    return (
      <motion.div
        variants={navItemAnimation}
        initial='initial'
        animate='animate'
        custom={id}
        className='relative'
      >
        <motion.div
          whileTap={{
            scale: 0.95,
            transition: { type: 'spring', stiffness: 500, damping: 20 },
          }}
          animate={{
            scale: isActive ? 1.02 : 1,
            transition: { type: 'spring', stiffness: 300, damping: 20 },
          }}
        >
          <Link
            to={item.path}
            className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
            aria-current={isActive ? 'page' : undefined}
          >
            <motion.span
              className={`relative z-10 transition-colors duration-300 ${isActive ? 'text-teal-400' : 'text-gray-400 hover:text-blue-400'}`}
            >
              {item.label}
            </motion.span>

            {/* Active tab indicator with smoother animation */}
            {isActive && (
              <>
                <motion.div
                  className='absolute inset-0 rounded-xl border border-blue-200/30 bg-gradient-to-r from-blue-500/15 via-purple-500/15 to-pink-500/15'
                  layoutId='activeTab'
                  initial={false}
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 35,
                    mass: 0.6,
                  }}
                />
                <motion.div
                  className='absolute -bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 transform rounded-full bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg shadow-blue-500/50'
                  layoutId='activeIndicator'
                  initial={false}
                  transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 30,
                    mass: 0.4,
                  }}
                />
                {/* Subtle glow effect */}
                <motion.div
                  className='absolute -bottom-2 left-1/2 h-3 w-3 -translate-x-1/2 transform rounded-full bg-gradient-to-r from-blue-400/30 to-purple-400/30 blur-sm'
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    transition: { delay: 0.1, duration: 0.3 },
                  }}
                  exit={{ opacity: 0, scale: 0 }}
                />
              </>
            )}
          </Link>
        </motion.div>
      </motion.div>
    );
  }
);

// Mobile NavLink component
const MobileNavLink: React.FC<NavLinkProps> = React.memo(
  ({ item, isActive, id, onClick }) => {
    const baseClasses =
      'group flex items-center space-x-3 sm:space-x-4 rounded-xl px-3 py-3 sm:px-4 sm:py-4 transition-all duration-400 ease-out relative overflow-hidden';
    const activeClasses =
      'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 shadow-md border border-blue-100/50';
    const inactiveClasses =
      'text-gray-700 hover:bg-gray-50 hover:text-blue-600 hover:shadow-sm';

    return (
      <motion.div
        whileHover={{
          scale: 1.02,
          x: 4,
          transition: { type: 'spring', stiffness: 400, damping: 15 },
        }}
        whileTap={{
          scale: 0.98,
          transition: { type: 'spring', stiffness: 500, damping: 20 },
        }}
        animate={{
          scale: isActive ? 1.01 : 1,
          transition: { type: 'spring', stiffness: 300, damping: 20 },
        }}
      >
        <Link
          to={item.path}
          onClick={onClick}
          className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
          style={{
            animationDelay: `${(id ?? 0) * 100}ms`,
            transition: `all 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${(id ?? 0) * 50}ms`,
          }}
          aria-current={isActive ? 'page' : undefined}
        >
          {/* Animated background for active state */}
          {isActive && (
            <motion.div
              className='absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/5 via-purple-400/5 to-pink-400/5'
              layoutId='mobileActiveBackground'
              initial={false}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
                mass: 0.6,
              }}
            />
          )}

          <motion.div
            className={`relative z-10 h-2 w-2 rounded-full transition-all duration-300 ${
              isActive ? '' : 'bg-gray-100 group-hover:bg-blue-400'
            }`}
            animate={{
              scale: isActive ? 1.2 : 1,
              boxShadow: isActive
                ? '0 0 8px rgba(59, 130, 246, 0.5)'
                : '0 0 0px rgba(59, 130, 246, 0)',
              transition: { type: 'spring', stiffness: 400, damping: 20 },
            }}
            style={{
              background: isActive
                ? 'linear-gradient(to right, #3b82f6, #8b5cf6)'
                : undefined,
            }}
            aria-hidden='true'
          />

          <motion.span
            className={`relative z-10 text-sm font-semibold transition-colors duration-300 sm:text-base ${
              isActive
                ? 'text-blue-600'
                : 'text-gray-700 group-hover:text-blue-600'
            }`}
            animate={{
              x: isActive ? 2 : 0,
              transition: { type: 'spring', stiffness: 300, damping: 20 },
            }}
          >
            {item.label}
          </motion.span>

          {isActive && (
            <motion.div
              className='relative z-10 ml-auto'
              aria-hidden='true'
              initial={{ opacity: 0, scale: 0, x: -10 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: 0,
                transition: {
                  type: 'spring',
                  stiffness: 400,
                  damping: 20,
                  delay: 0.1,
                },
              }}
              exit={{
                opacity: 0,
                scale: 0,
                x: -10,
                transition: { duration: 0.2 },
              }}
            >
              <motion.div
                className='h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500'
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </motion.div>
          )}
        </Link>
      </motion.div>
    );
  }
);

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navItems: NavItem[] = useMemo(
    () => [
      { id: 0, path: '/', label: 'Home' },
      { id: 1, path: '/about', label: 'About' },
      { id: 2, path: '/projects', label: 'Projects' },
      { id: 3, path: '/contact', label: 'Contact' },
      { id: 4, path: '/single-page', label: 'Single Page' },
    ],
    []
  );

  const handleScroll = useMemo(() => {
    let ticking = false;

    const updateScrollState = () => {
      const currentScrollY = window.scrollY;
      const shouldBeScrolled = currentScrollY > 20;

      // Only update state if it actually changed
      setScrolled(prev =>
        prev !== shouldBeScrolled ? shouldBeScrolled : prev
      );
      ticking = false;
    };

    return () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollState);
        ticking = true;
      }
    };
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname]
  );

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Also listen to touchmove for mobile devices
    window.addEventListener('touchmove', handleScroll, { passive: true });

    // Check scroll position on mount and after route changes
    const checkScrollPosition = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);
    };

    checkScrollPosition();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
    };
  }, [handleScroll]);

  // Additional effect to handle route changes and ensure correct state
  useEffect(() => {
    const checkScrollPosition = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);
    };

    // Only scroll to top for route changes, not for single-page navigation
    if (location.pathname !== '/single-page') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Small delay to ensure DOM is updated after route change
    const timeoutId = setTimeout(checkScrollPosition, 100);

    return () => clearTimeout(timeoutId);
  }, [location.pathname]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        closeMenu();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen, closeMenu]);

  return (
    <motion.nav
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled ? '' : ''
      } `}
      role='navigation'
      aria-label='Main navigation'
      variants={slideInFromTop}
      initial='initial'
      animate='animate'
    >
      <div className='relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div
          className={`flex h-20 items-center transition-all duration-700 ease-out ${scrolled ? 'justify-end' : 'justify-between'}`}
        >
          <AnimatePresence>
            {!scrolled && <Logo name='RK' title='Frontend Developer' />}
          </AnimatePresence>

          {/* Desktop Navigation */}
          <div className='hidden md:block'>
            <motion.div
              className='flex items-center gap-1 rounded-2xl border border-gray-200/50 shadow-lg shadow-black/5 backdrop-blur-xl'
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 20,
                delay: 0.2,
              }}
              whileHover={{
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                transition: { duration: 0.3 },
              }}
            >
              {navItems.map((item, index) => (
                <React.Fragment key={item.id}>
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 25,
                      delay: 0.3 + index * 0.1,
                    }}
                  >
                    <DesktopNavLink
                      item={item}
                      isActive={isActive(item.path)}
                      id={item.id}
                    />
                  </motion.div>
                  {item.id === 3 && (
                    <motion.div
                      className='mx-1 h-6 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent'
                      initial={{ opacity: 0, scaleY: 0 }}
                      animate={{ opacity: 1, scaleY: 1 }}
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 25,
                        delay: 0.5 + index * 0.1,
                      }}
                    />
                  )}
                </React.Fragment>
              ))}
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <div className='md:hidden'>
            <motion.button
              onClick={toggleMenu}
              className={`relative rounded-xl p-3 transition-all duration-300 ${
                isMenuOpen
                  ? 'bg-gray-300 text-blue-600 shadow-lg'
                  : 'text-blue-600 hover:bg-gray-300'
              }`}
              aria-expanded={isMenuOpen}
              aria-controls='mobile-menu'
              aria-label={
                isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'
              }
              whileHover={{
                scale: 1.05,
                transition: { type: 'spring', stiffness: 400, damping: 15 },
              }}
              whileTap={{
                scale: 0.95,
                transition: { type: 'spring', stiffness: 500, damping: 20 },
              }}
              animate={{
                scale: isMenuOpen ? 1.05 : 1,
                transition: { type: 'spring', stiffness: 300, damping: 20 },
              }}
            >
              <motion.div
                animate={{
                  rotate: isMenuOpen ? 180 : 0,
                  transition: {
                    type: 'spring',
                    stiffness: 200,
                    damping: 15,
                  },
                }}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
              {isMenuOpen && (
                <motion.div
                  className='absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-sm'
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1.1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                  }}
                />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id='mobile-menu'
            className='md:hidden'
            initial={{ opacity: 0, height: 0, scale: 0.95 }}
            animate={{ opacity: 1, height: 'auto', scale: 1 }}
            exit={{ opacity: 0, height: 0, scale: 0.95 }}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 25,
              mass: 0.8,
            }}
          >
            <motion.div
              className='m-3 rounded-2xl border-t border-gray-300 bg-gray-300/95 shadow-xl shadow-black/5 backdrop-blur-xl sm:m-4'
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
                delay: 0.1,
              }}
            >
              <div className='space-y-2 p-4 sm:space-y-3 sm:p-6'>
                {navItems.map((item, index) => (
                  <React.Fragment key={item.id}>
                    {item.id === 4 && (
                      <motion.div
                        className='my-2 h-px w-full bg-gradient-to-r from-transparent via-black/20 to-transparent'
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{
                          type: 'spring',
                          stiffness: 200,
                          damping: 25,
                          delay: 0.3 + index * 0.1,
                        }}
                      />
                    )}
                    <motion.div
                      initial={{ opacity: 0, x: -30, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -20, scale: 0.9 }}
                      transition={{
                        type: 'spring',
                        stiffness: 250,
                        damping: 25,
                        delay: 0.2 + index * 0.08,
                      }}
                    >
                      <MobileNavLink
                        item={item}
                        isActive={isActive(item.path)}
                        onClick={closeMenu}
                        isMobile
                        id={item.id}
                      />
                    </motion.div>
                  </React.Fragment>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;

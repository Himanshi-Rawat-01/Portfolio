import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineMenuAlt3, HiOutlineX } from 'react-icons/hi';
import { navigationLinks } from '../data/portfolioData';
import brandLogo from '../assets/brand/hr-logo.svg';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState(navigationLinks[0]?.href ?? '#about');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const onResize = () => setIsMenuOpen(false);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const sections = navigationLinks
      .map((link) => document.querySelector(link.href))
      .filter(Boolean);

    if (!sections.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHref(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: '-38% 0px -52% 0px', threshold: 0.08 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveHref(href);
    setIsMenuOpen(false);
  };

  return (
    <motion.header
      className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <button
        className="brand-mark interactive"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <img className="brand-mark__logo" src={brandLogo} alt="HR logo" />
        <span className="brand-mark__wordmark">Himanshi Rawat</span>
      </button>

      <nav className={`nav-links ${isMenuOpen ? 'nav-links--open' : ''}`} aria-label="Primary navigation">
        {navigationLinks.map((link) => (
          <motion.button
            key={link.href}
            className={`nav-links__item interactive ${activeHref === link.href ? 'nav-links__item--active' : ''}`}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            aria-current={activeHref === link.href ? 'page' : undefined}
            onClick={() => handleNavClick(link.href)}
          >
            {link.label}
          </motion.button>
        ))}
      </nav>

      <motion.button
        className="navbar__cta interactive"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => handleNavClick('#contact')}
      >
        Let's Connect
      </motion.button>

      <button
        className="nav-toggle interactive"
        aria-label="Toggle navigation menu"
        onClick={() => setIsMenuOpen((open) => !open)}
      >
        {isMenuOpen ? <HiOutlineX /> : <HiOutlineMenuAlt3 />}
      </button>
    </motion.header>
  );
}

export default Navbar;

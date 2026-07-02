import { useEffect, useMemo, useState } from 'react';
import CustomCursor from './components/CustomCursor';
import LiquidEther from './components/LiquidEther';
import ScrollProgress from './components/ScrollProgress';
import ThemeToggle from './components/ThemeToggle';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import IntroSplash from './components/IntroSplash';
import SkillMarquee from './components/SkillMarquee';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import EnhancedSectionScroller from './components/EnhancedSectionScroller';
import { contactLinks, experienceTimeline, projects, services } from './data/portfolioData';
import Lenis from 'lenis';

const sectionVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.07,
      delayChildren: 0.04,
    },
  },
};

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('portfolio-theme') || 'dark');
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 900);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const [isLowPerformanceDevice] = useState(() => {
    const cores = navigator.hardwareConcurrency ?? 8;
    const memory = navigator.deviceMemory ?? 8;
    return cores <= 4 || memory <= 4;
  });
  const shouldUseAdvancedEffects = useMemo(
    () => !prefersReducedMotion && !isMobile && !isLowPerformanceDevice,
    [isLowPerformanceDevice, isMobile, prefersReducedMotion],
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.perf = isLowPerformanceDevice ? 'low' : 'high';
    localStorage.setItem('portfolio-theme', theme);
  }, [theme, isLowPerformanceDevice]);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (event) => setPrefersReducedMotion(event.matches);
    mediaQuery.addEventListener('change', onChange);
    return () => mediaQuery.removeEventListener('change', onChange);
  }, []);

  // Expose a global Lenis instance for SectionScroller to use
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.6,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 2,
      syncTouch: false,
    });
    window.__lenis__ = lenis;
    let raf;
    const loop = (time) => { lenis.raf(time); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      window.__lenis__ = null;
    };
  }, []);

  const liquidColors = useMemo(() => ['#5227FF', '#FF9FFC', '#B19EEF'], []);
  const liquidConfig = useMemo(
    () => {
      if (prefersReducedMotion || isMobile || isLowPerformanceDevice) {
        return {
          mouseForce: 6,
          cursorSize: 48,
          iterationsViscous: 4,
          iterationsPoisson: 4,
          resolution: 0.16,
          autoIntensity: 0.65,
          autoDemo: false,
          autoSpeed: 0.25,
        };
      }

      return {
        mouseForce: 10,
        cursorSize: 64,
        iterationsViscous: 6,
        iterationsPoisson: 7,
        resolution: 0.2,
        autoIntensity: 0.85,
        autoDemo: true,
        autoSpeed: 0.3,
      };
    },
    [isLowPerformanceDevice, isMobile, prefersReducedMotion],
  );

  return (
    <>
      <div className="app-background" aria-hidden="true">
        {shouldUseAdvancedEffects ? (
          <LiquidEther
            colors={liquidColors}
            mouseForce={liquidConfig.mouseForce}
            cursorSize={liquidConfig.cursorSize}
            iterationsViscous={liquidConfig.iterationsViscous}
            iterationsPoisson={liquidConfig.iterationsPoisson}
            resolution={liquidConfig.resolution}
            BFECC={false}
            autoDemo={liquidConfig.autoDemo}
            autoSpeed={liquidConfig.autoSpeed}
            autoIntensity={liquidConfig.autoIntensity}
            className="app-background__ether"
          />
        ) : (
          <div
            className="app-background__fallback"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at top, rgba(82,39,255,0.16), transparent 55%)',
            }}
          />
        )}
      </div>
      <ScrollProgress />
      <ThemeToggle
        theme={theme}
        toggleTheme={() => setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))}
      />
      {shouldUseAdvancedEffects ? <EnhancedSectionScroller /> : null}
      <Navbar />
      {/* IntroSplash has its own sticky implementation */}
      <div style={{ zIndex: 1, position: 'relative' }}>
        <IntroSplash />
      </div>

      {/* Sticky Deck: About */}
      <motion.section 
        id="about" 
        className="sticky-section" 
        style={{ zIndex: 2 }}
        variants={sectionVariants} 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: false, amount: 0.4 }}
      >
        <div className="app-shell" style={{ margin: '0 auto', width: '100%' }}>
          <About />
        </div>
      </motion.section>

      {/* Sticky Deck: Marquee */}
      <motion.section 
        id="marquee"
        className="sticky-section" 
        style={{ zIndex: 3, minHeight: 'auto', padding: '10vh 0' }}
        variants={sectionVariants}  
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: false, amount: 0.4 }}
      >
        {/* Marquee breaks out of container, so no app-shell needed here */}
        <SkillMarquee />
      </motion.section>

      {/* Sticky Deck: Services */}
      <motion.section 
        id="services" 
        className="sticky-section" 
        style={{ zIndex: 4 }}
        variants={sectionVariants} 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: false, amount: 0.35 }}
      >
        <div className="app-shell" style={{ margin: '0 auto', width: '100%' }}>
          <Services services={services} />
        </div>
      </motion.section>

      {/* Sticky Deck: Projects */}
      <motion.section 
        id="projects" 
        className="sticky-section" 
        style={{ zIndex: 5, display: 'block', overflow: 'visible' }}
        variants={sectionVariants} 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, amount: 0.18 }}
      >
        {/* Projects has its own full-width structure */}
        <Projects projects={projects} />
      </motion.section>

      {/* Normal Scrolling Block: Experience (Must not be sticky, it has its own ScrollStack) */}
      <section 
        id="experience" 
        className="section"
        style={{ zIndex: 6, position: 'relative', paddingTop: '8rem', paddingBottom: '4rem' }}
      >
        <div className="app-shell">
          <Experience experience={experienceTimeline} />
        </div>
      </section>

      {/* Normal Scrolling Block: Contact */}
      <motion.section 
        id="contact" 
        className="section section-contact" 
        style={{ zIndex: 7, position: 'relative' }}
        variants={sectionVariants} 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: false, amount: 0.35 }}
      >
        <div className="app-shell">
          <Contact links={contactLinks} />
        </div>
      </motion.section>
      {shouldUseAdvancedEffects ? <CustomCursor /> : null}
    </>
  );
}

export default App;

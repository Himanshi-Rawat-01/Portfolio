import { useEffect, useMemo, useState } from 'react';
import CustomCursor from './components/CustomCursor';
import LiquidEther from './components/LiquidEther';
import ScrollProgress from './components/ScrollProgress';
import ThemeToggle from './components/ThemeToggle';
import HomePage from './pages/HomePage';
import SectionScroller from './components/SectionScroller';
import Lenis from 'lenis';

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
      duration: 1.4,
      easing: t => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      wheelMultiplier: 1,
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
      if (prefersReducedMotion) {
        return {
          mouseForce: 8,
          cursorSize: 58,
          iterationsViscous: 4,
          iterationsPoisson: 4,
          resolution: 0.15,
          autoIntensity: 0.85,
          autoDemo: false,
          autoSpeed: 0.35,
        };
      }

      if (isMobile || isLowPerformanceDevice) {
        return {
          mouseForce: 10,
          cursorSize: 66,
          iterationsViscous: 6,
          iterationsPoisson: 6,
          resolution: 0.2,
          autoIntensity: 1.05,
          autoDemo: true,
          autoSpeed: 0.4,
        };
      }

      return {
        mouseForce: 14,
        cursorSize: 80,
        iterationsViscous: 8,
        iterationsPoisson: 10,
        resolution: 0.25,
        autoIntensity: 1.25,
        autoDemo: true,
        autoSpeed: 0.45,
      };
    },
    [isLowPerformanceDevice, isMobile, prefersReducedMotion],
  );

  return (
    <>
      <div className="app-background" aria-hidden="true">
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
      </div>
      <ScrollProgress />
      <ThemeToggle
        theme={theme}
        toggleTheme={() => setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))}
      />
      <SectionScroller />
      <HomePage theme={theme} />
      <CustomCursor />
    </>
  );
}

export default App;

import { useEffect, useRef } from 'react';

function ScrollProgress() {
  const progressRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const updateProgress = () => {
      rafRef.current = null;
      const progressEl = progressRef.current;
      if (!progressEl) {
        return;
      }

      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      progressEl.style.transform = `scaleX(${nextProgress / 100})`;
    };

    const scheduleUpdate = () => {
      if (!rafRef.current) {
        rafRef.current = window.requestAnimationFrame(updateProgress);
      }
    };

    updateProgress();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);

    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return <div ref={progressRef} className="scroll-progress" />;
}

export default ScrollProgress;

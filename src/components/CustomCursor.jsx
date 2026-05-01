import { useEffect, useRef } from 'react';

function CustomCursor() {
  const cursorRef = useRef(null);
  const rafRef = useRef(null);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const isActiveRef = useRef(false);

  useEffect(() => {
    if (window.innerWidth < 992) {
      return undefined;
    }

    const cursorEl = cursorRef.current;
    if (!cursorEl) {
      return undefined;
    }

    const paint = () => {
      rafRef.current = null;
      const { x, y } = lastPosRef.current;
      cursorEl.style.transform = `translate(${x}px, ${y}px)`;
    };

    const handleMove = (event) => {
      const target = event.target.closest('.interactive');
      lastPosRef.current = { x: event.clientX, y: event.clientY };

      const nextActive = Boolean(target);
      if (nextActive !== isActiveRef.current) {
        isActiveRef.current = nextActive;
        cursorEl.classList.toggle('custom-cursor--active', nextActive);
      }

      if (!rafRef.current) {
        rafRef.current = window.requestAnimationFrame(paint);
      }
    };

    window.addEventListener('mousemove', handleMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMove);
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return <span ref={cursorRef} className="custom-cursor" aria-hidden="true" />;
}

export default CustomCursor;

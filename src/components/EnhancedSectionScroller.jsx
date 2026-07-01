import { useEffect, useRef } from 'react';

// Section IDs in order
const SECTION_IDS = ['home', 'about', 'marquee', 'services', 'projects', 'experience', 'contact'];
// How long to block next snap after one fires (ms)
const COOLDOWN = 1400; 
// Min wheel delta to trigger a snap
const THRESHOLD = 35;

function getSections() {
  return SECTION_IDS.map(id => document.getElementById(id)).filter(Boolean);
}

function getCurrentIndex(sections) {
  const mid = window.innerHeight / 2;
  let closest = 0;
  let minDist = Infinity;
  sections.forEach((el, i) => {
    const rect = el.getBoundingClientRect();
    const dist = Math.abs(rect.top - mid + rect.height / 2);
    if (dist < minDist) {
      minDist = dist;
      closest = i;
    }
  });
  return closest;
}

function isInsideExperience() {
  const el = document.getElementById('experience');
  if (!el) return false;
  const rect = el.getBoundingClientRect();
  // Allow free scrolling through the Experience stack
  const margin = 100;
  return rect.top < -margin && rect.bottom > window.innerHeight + margin;
}

export default function EnhancedSectionScroller() {
  const cooldownRef = useRef(false);
  const accDeltaRef = useRef(0);
  const timerRef = useRef(null);

  useEffect(() => {
    const onWheel = (e) => {
      if (isInsideExperience()) return;

      accDeltaRef.current += e.deltaY;

      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        accDeltaRef.current = 0;
      }, 100);

      if (Math.abs(accDeltaRef.current) < THRESHOLD) return;
      if (cooldownRef.current) return;

      const direction = accDeltaRef.current > 0 ? 1 : -1;
      accDeltaRef.current = 0;

      const sections = getSections();
      if (!sections.length) return;

      const currentIdx = getCurrentIndex(sections);
      const nextIdx = Math.max(0, Math.min(sections.length - 1, currentIdx + direction));

      if (nextIdx === currentIdx) return;

      const target = sections[nextIdx];
      if (!target) return;

      const lenis = window.__lenis__;
      if (lenis) {
        // Enhanced cinematic scroll easing
        lenis.scrollTo(target, { 
          duration: 1.6, 
          easing: t => 1 - Math.pow(1 - t, 5), 
          offset: 0 
        });
      } else {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      cooldownRef.current = true;
      setTimeout(() => { cooldownRef.current = false; }, COOLDOWN);
    };

    window.addEventListener('wheel', onWheel, { passive: true });
    return () => {
      window.removeEventListener('wheel', onWheel);
      clearTimeout(timerRef.current);
    };
  }, []);

  return null;
}

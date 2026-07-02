import { useLayoutEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';
import './ScrollStack.css';

export const ScrollStackItem = ({ children, itemClassName = '' }) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
);

const ScrollStack = ({
  children,
  className = '',
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = '20%',
  scaleEndPosition = '10%',
  baseScale = 0.85,
  scaleDuration = 0.5,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = false,
  onStackComplete
}) => {
  const scrollerRef = useRef(null);
  const stackCompletedRef = useRef(false);
  const animationFrameRef = useRef(null);
  const lenisRef = useRef(null);
  const lenisOwnedRef = useRef(false); // true only if we created the Lenis instance
  const scrollHandlerRef = useRef(null); // stable ref so we can remove the exact listener
  const cardsRef = useRef([]);
  const originalOffsetsRef = useRef([]);
  const lastTransformsRef = useRef(new Map());
  const isUpdatingRef = useRef(false);

  const calculateProgress = useCallback((scrollTop, start, end) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value, containerHeight) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value);
  }, []);

  const getScrollData = useCallback(() => {
    if (useWindowScroll) {
      return {
        scrollTop: window.scrollY,
        containerHeight: window.innerHeight,
        scrollContainer: document.documentElement
      };
    } else {
      const scroller = scrollerRef.current;
      return {
        scrollTop: scroller.scrollTop,
        containerHeight: scroller.clientHeight,
        scrollContainer: scroller
      };
    }
  }, [useWindowScroll]);

  // Returns the document-relative top of an element
  const getElementOffset = useCallback(
    element => {
      if (useWindowScroll) {
        const rect = element.getBoundingClientRect();
        return rect.top + window.scrollY;
      } else {
        return element.offsetTop;
      }
    },
    [useWindowScroll]
  );

  const updateCardTransforms = useCallback((scrollVal) => {
    if (!cardsRef.current.length || isUpdatingRef.current) return;

    isUpdatingRef.current = true;

    const { containerHeight } = getScrollData();
    const scrollTop = scrollVal !== undefined
      ? scrollVal
      : (useWindowScroll ? window.scrollY : scrollerRef.current?.scrollTop ?? 0);

    // End sentinel: where the entire stack should have finished scrolling past
    const endElement = scrollerRef.current?.querySelector('.scroll-stack-end');
    const endElementTop = endElement ? getElementOffset(endElement) : 0;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const cardHeight = card.offsetHeight;
      const stackPositionPx = parsePercentage(stackPosition, containerHeight) - cardHeight / 2;
      const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);

      const cardTop = originalOffsetsRef.current[i];
      if (!cardTop && cardTop !== 0) return; // offsets not ready yet

      // When this card should start sticking
      const pinStart = cardTop - stackPositionPx - itemStackDistance * i;
      // When the stack finishes (card unpins and scrolls away)
      const pinEnd = endElementTop - containerHeight / 2 - cardHeight / 2;

      // Scale: starts after card is 30% into its pin duration
      const triggerStart = pinStart;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const scaleStartTrigger = triggerStart + Math.max(0, (triggerEnd - triggerStart) * 0.3);
      const scaleProgress = calculateProgress(scrollTop, scaleStartTrigger, triggerEnd);
      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      // Blur (depth effect for cards underneath)
      let blur = 0;
      if (blurAmount) {
        let topCardIndex = 0;
        for (let j = 0; j < cardsRef.current.length; j++) {
          const jCardTop = originalOffsetsRef.current[j];
          const jPinStart = jCardTop - parsePercentage(stackPosition, containerHeight) + (cardsRef.current[j].offsetHeight / 2) - itemStackDistance * j;
          if (scrollTop >= jPinStart) topCardIndex = j;
        }
        if (i < topCardIndex) {
          blur = Math.max(0, (topCardIndex - i) * blurAmount);
        }
      }

      // Pin translateY: how much to lift the card up to its stacked position
      let translateY = 0;
      const safeEnd = Math.max(pinStart, pinEnd); // guard against negative range

      if (scrollTop >= pinStart && scrollTop <= safeEnd) {
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
      } else if (scrollTop > safeEnd) {
        translateY = safeEnd - cardTop + stackPositionPx + itemStackDistance * i;
      }

      const newTransform = { translateY, scale, rotation, blur };

      const lastTransform = lastTransformsRef.current.get(i);
      const hasChanged =
        !lastTransform ||
        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.01 ||
        Math.abs(lastTransform.scale - newTransform.scale) > 0.0001 ||
        Math.abs(lastTransform.rotation - newTransform.rotation) > 0.01 ||
        Math.abs(lastTransform.blur - newTransform.blur) > 0.01;

      if (hasChanged) {
        card.style.transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
        card.style.filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : '';
        lastTransformsRef.current.set(i, newTransform);
      }

      if (i === cardsRef.current.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= safeEnd;
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });

    isUpdatingRef.current = false;
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    onStackComplete,
    calculateProgress,
    parsePercentage,
    getScrollData,
    getElementOffset
  ]);

  const handleScroll = useCallback((e) => {
    updateCardTransforms(e?.scroll);
  }, [updateCardTransforms]);

  const setupLenis = useCallback(() => {
    // Borrow the global Lenis instance — never destroy it, just detach listener on cleanup
    if (useWindowScroll && window.__lenis__) {
      const lenis = window.__lenis__;
      scrollHandlerRef.current = handleScroll;
      lenis.on('scroll', scrollHandlerRef.current);
      lenisRef.current = lenis;
      lenisOwnedRef.current = false;
      // Fire after a frame so layout is fully settled
      requestAnimationFrame(() => updateCardTransforms(lenis.scroll));
      return lenis;
    }

    if (useWindowScroll) {
      // Fall back to native scroll listener to avoid creating a conflicting second Lenis
      scrollHandlerRef.current = () => handleScroll();
      window.addEventListener('scroll', scrollHandlerRef.current, { passive: true });
      requestAnimationFrame(() => updateCardTransforms());
      return null;
    } else {
      const scroller = scrollerRef.current;
      if (!scroller) return;

      const lenis = new Lenis({
        wrapper: scroller,
        content: scroller.querySelector('.scroll-stack-inner'),
        duration: 1.2,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 2,
        infinite: false,
        normalizeWheel: true,
        wheelMultiplier: 1,
        lerp: 0.1,
        syncTouch: true,
        syncTouchLerp: 0.075,
      });

      scrollHandlerRef.current = handleScroll;
      lenis.on('scroll', scrollHandlerRef.current);

      const raf = time => {
        lenis.raf(time);
        animationFrameRef.current = requestAnimationFrame(raf);
      };
      animationFrameRef.current = requestAnimationFrame(raf);

      lenisRef.current = lenis;
      lenisOwnedRef.current = true;
      return lenis;
    }
  }, [handleScroll, useWindowScroll, updateCardTransforms]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(
      useWindowScroll
        ? scroller.querySelectorAll('.scroll-stack-card')
        : scroller.querySelectorAll('.scroll-stack-card')
    );

    cardsRef.current = cards;

    // Cache real document-relative offsets (called after DOM is painted)
    const cacheOffsets = () => {
      originalOffsetsRef.current = cardsRef.current.map(card => getElementOffset(card));
    };
    cacheOffsets();

    const transformsCache = lastTransformsRef.current;

    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.willChange = 'transform';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
      card.style.transform = 'translateZ(0)';
      card.style.zIndex = i + 1;
    });

    const updateOffsets = () => {
      cacheOffsets();
      updateCardTransforms();
    };

    const resizeObserver = new ResizeObserver(updateOffsets);
    cardsRef.current.forEach(card => resizeObserver.observe(card));
    const inner = scroller.querySelector('.scroll-stack-inner');
    if (inner) resizeObserver.observe(inner);

    setupLenis();
    updateCardTransforms();

    // Recalculate after fonts/images may have shifted layout
    const t1 = setTimeout(updateOffsets, 300);
    const t2 = setTimeout(updateOffsets, 1000);
    window.addEventListener('load', updateOffsets);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      if (lenisRef.current) {
        if (lenisOwnedRef.current) {
          lenisRef.current.destroy();
        } else {
          // Only detach our listener — don't destroy the shared global instance
          lenisRef.current.off('scroll', scrollHandlerRef.current);
        }
        lenisRef.current = null;
        lenisOwnedRef.current = false;
      } else if (useWindowScroll && scrollHandlerRef.current) {
        window.removeEventListener('scroll', scrollHandlerRef.current);
      }
      resizeObserver.disconnect();
      window.removeEventListener('load', updateOffsets);
      clearTimeout(t1);
      clearTimeout(t2);
      stackCompletedRef.current = false;
      cardsRef.current = [];
      transformsCache.clear();
      isUpdatingRef.current = false;
    };
  }, [
    itemDistance,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    scaleDuration,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    onStackComplete,
    setupLenis,
    updateCardTransforms,
    getElementOffset
  ]);

  return (
    <div className={`scroll-stack-scroller ${className}`.trim()} ref={scrollerRef}>
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end" />
      </div>
    </div>
  );
};

export default ScrollStack;

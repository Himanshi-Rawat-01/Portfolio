import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

function IntroSplash({ sectionRef }) {
  const localRef = useRef(null);
  const targetRef = sectionRef || localRef;
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -220]);
  const opacity = useTransform(scrollYProgress, [0, 0.75, 1], [1, 0.35, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  return (
    <section ref={targetRef} id="home" className="intro-splash">
      <div className="intro-splash__sticky">
        <motion.div
          className="intro-splash__content"
          style={{ y, opacity, scale }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="intro-splash__kicker">Welcome to my</p>
          <h1 className="intro-splash__title">Portfolio</h1>
          
          <motion.div 
            className="intro-splash__scroll-hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            <motion.div 
              className="scroll-hint-line"
              animate={{ height: ['0px', '40px', '0px'], y: [0, 10, 20] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              style={{ width: '2px', background: 'var(--accent)', margin: '0 auto' }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default IntroSplash;

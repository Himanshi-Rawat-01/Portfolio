import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

function CtaBanner() {
  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <motion.section
      className="cta-banner card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.65 }}
    >
      <div className="cta-banner__content">
        <h2>Let&apos;s Build Something Useful Together</h2>
        <p>
          I&apos;m open to new opportunities, collaborations, and product ideas where thoughtful
          frontend work can make the experience clearer and faster.
        </p>
        <button className="button button--primary interactive" onClick={scrollToContact}>
          Contact Me
          <FiArrowRight />
        </button>
      </div>
    </motion.section>
  );
}

export default CtaBanner;

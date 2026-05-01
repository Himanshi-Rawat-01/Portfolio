import { motion } from 'framer-motion';

function SkillMarquee({ items }) {
  const marqueeItems = [...items, ...items];

  return (
    <section className="skills-marquee" aria-label="Tools and technologies">
      <div className="section-heading skills-marquee__heading">
        <span className="eyebrow">Skills Strip</span>
        <h2>Tools & Technologies</h2>
      </div>

      <div className="skills-marquee__track-wrap">
        <motion.div
          className="skills-marquee__track"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 22, ease: 'linear', repeat: Infinity }}
        >
          {marqueeItems.map((item, index) => (
            <span key={`${item}-${index}`} className="skills-marquee__chip">
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default SkillMarquee;

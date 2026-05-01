import { motion } from 'framer-motion';

function Experience({ experience }) {
  return (
    <div className="section-block">
      <div className="section-heading">
        <span className="eyebrow">Journey</span>
        <h2>Experience</h2>
      </div>

      <div className="experience-list">
        {experience.map((item, index) => (
          <motion.article
            key={`${item.title}-${item.company}`}
            className="card timeline-card"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: index * 0.1 }}
          >
            <span className="timeline-card__period">{item.period}</span>
            <h4>{item.title} — {item.company}</h4>
            <p>{item.description}</p>
          </motion.article>
        ))}
      </div>
    </div>
  );
}

export default Experience;

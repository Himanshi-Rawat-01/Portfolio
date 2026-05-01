import { motion } from 'framer-motion';

function Services({ services }) {
  return (
    <div className="section-block">
      <div className="section-heading">
        <h2>What I Do</h2>
      </div>

      <div className="services-grid">
        {services.map((service, index) => (
          <motion.article
            key={service.title}
            className="card service-card"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -6 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: index * 0.08 }}
          >
            <span className="service-card__index">{String(index + 1).padStart(2, '0')}</span>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </motion.article>
        ))}
      </div>
    </div>
  );
}

export default Services;

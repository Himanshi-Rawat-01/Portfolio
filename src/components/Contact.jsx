import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

const iconMap = {
  GitHub: FiGithub,
  LinkedIn: FiLinkedin,
  Email: FiMail,
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

function Contact({ links }) {
  const emailLink = links.find((link) => link.label === 'Email')?.href ?? 'mailto:';
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const subject = `Portfolio inquiry from ${formState.name}`;
    const body = [`Name: ${formState.name}`, `Email: ${formState.email}`, '', formState.message].join('\n');
    const separator = emailLink.includes('?') ? '&' : '?';
    window.location.href = `${emailLink}${separator}subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };

  return (
    <div className="section-block contact">
      <motion.div className="section-heading" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
        <motion.h2 variants={fadeUp}>Let&apos;s Build Something Useful Together</motion.h2>
        <motion.p className="contact__intro" variants={fadeUp}>
          Reach out for frontend development, UI/UX work, full-stack integration, or data-driven web
          projects. I&apos;m open to freelance and full-time opportunities.
        </motion.p>
      </motion.div>

      <div className="contact__layout">
        <motion.article
          className="card contact__panel"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div className="contact__meta-grid" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {[
              { label: 'Email', value: 'himanshir007@gmail.com' },
              { label: 'Phone', value: '+91 70425 32683' },
              { label: 'Availability', value: 'Open to freelance and full-time' },
              { label: 'Response Time', value: 'Usually within 24 hours' },
            ].map(({ label, value }) => (
              <motion.div key={label} className="contact__meta-item" variants={fadeUp}>
                <span>{label}</span>
                <strong>{value}</strong>
              </motion.div>
            ))}
          </motion.div>

          <motion.div className="social-links" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {links.map((link) => {
              const Icon = iconMap[link.label];
              return (
                <motion.a
                  key={link.label}
                  className="social-links__item interactive"
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  variants={fadeUp}
                  whileHover={{ x: 6, transition: { duration: 0.2 } }}
                >
                  <Icon />
                  <span>{link.label}</span>
                </motion.a>
              );
            })}
          </motion.div>
        </motion.article>

        <motion.form
          className="card contact__form-card"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          {['name', 'email', 'message'].map((field, i) => (
            <motion.label
              key={field}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span>{field.charAt(0).toUpperCase() + field.slice(1)}</span>
              {field === 'message' ? (
                <textarea name={field} rows="5" placeholder="Tell me about your project, timeline, and goals." value={formState[field]} onChange={handleChange} required />
              ) : (
                <input type={field === 'email' ? 'email' : 'text'} name={field} placeholder={field === 'email' ? 'you@example.com' : 'Your name'} value={formState[field]} onChange={handleChange} required />
              )}
            </motion.label>
          ))}

          <motion.button
            className="button button--primary interactive"
            type="submit"
            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.97 }}
          >
            Send Message
            <FiArrowRight />
          </motion.button>

          {submitted && (
            <motion.p className="contact__success" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              Your email draft is ready. Review it in your mail app before sending.
            </motion.p>
          )}
        </motion.form>
      </div>
    </div>
  );
}

export default Contact;


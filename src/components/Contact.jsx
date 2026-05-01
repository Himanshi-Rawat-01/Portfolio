import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

const iconMap = {
  GitHub: FiGithub,
  LinkedIn: FiLinkedin,
  Email: FiMail,
};

function Contact({ links }) {
  const emailLink = links.find((link) => link.label === 'Email')?.href ?? 'mailto:';
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const subject = `Portfolio inquiry from ${formState.name}`;
    const body = [
      `Name: ${formState.name}`,
      `Email: ${formState.email}`,
      '',
      formState.message,
    ].join('\n');
    const separator = emailLink.includes('?') ? '&' : '?';
    window.location.href = `${emailLink}${separator}subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };

  return (
    <div className="section-block contact">
      <div className="section-heading">
        <span className="eyebrow">Contact</span>
        <h2>Let&apos;s Build Something Useful Together</h2>
        <p className="contact__intro">
          Reach out for frontend development, UI/UX work, full-stack integration, or data-driven web
          projects. I&apos;m open to freelance and full-time opportunities.
        </p>
      </div>

      <div className="contact__layout">
        <motion.article
          className="card contact__panel"
          initial={{ opacity: 0, x: -22 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div className="contact__meta-grid">
            <div className="contact__meta-item">
              <span>Email</span>
              <strong>himanshir007@gmail.com</strong>
            </div>
            <div className="contact__meta-item">
              <span>Phone</span>
              <strong>+91 70425 32683</strong>
            </div>
            <div className="contact__meta-item">
              <span>Availability</span>
              <strong>Open to freelance and full-time</strong>
            </div>
            <div className="contact__meta-item">
              <span>Response Time</span>
              <strong>Usually within 24 hours</strong>
            </div>
          </div>

          <div className="social-links">
            {links.map((link) => {
              const Icon = iconMap[link.label];
              return (
                <a
                  key={link.label}
                  className="social-links__item interactive"
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon />
                  <span>{link.label}</span>
                </a>
              );
            })}
          </div>
        </motion.article>

        <motion.form
          className="card contact__form-card"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 22 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.06 }}
        >
          <label>
            <span>Name</span>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={formState.name}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            <span>Email</span>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formState.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            <span>Message</span>
            <textarea
              name="message"
              rows="5"
              placeholder="Tell me about your project, timeline, and goals."
              value={formState.message}
              onChange={handleChange}
              required
            />
          </label>

          <button className="button button--primary interactive" type="submit">
            Send Message
            <FiArrowRight />
          </button>

          {submitted ? (
            <p className="contact__success">Your email draft is ready. Review it in your mail app before sending.</p>
          ) : null}
        </motion.form>
      </div>
    </div>
  );
}

export default Contact;

import { motion } from 'framer-motion';
import profilePhoto from '../assets/profile/about-photo.jpeg';
import { skillIcons } from '../data/portfolioData';

function About() {
  return (
    <div className="section-block about">
      <motion.article
        className="about-editorial card"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.18 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="about-editorial__left">
          <div className="about-editorial__portrait">
            <img src={profilePhoto} alt="About me portrait" />
          </div>
        </div>

        <div className="about-editorial__right">
          <header className="about-editorial__header">
            <div className="about-editorial__hello">
              <span>Hello, I am</span>
              <h2>Himanshi Rawat</h2>
            </div>
            <p>
              I&apos;m a Frontend and UI/UX Developer building modern, user-centric web applications
              with React.js, responsive layouts, and practical interface design. My work combines
              clean frontend structure with backend integration, APIs, and data visualization.
            </p>
          </header>

          <section className="about-editorial__skills-block">
            <h3>Technical Expertise</h3>
            <div className="about-editorial__skills" aria-label="Technical skills">
              {skillIcons.map(({ label, Icon }) => (
                <div className="about-editorial__skill" key={label} title={label}>
                  <Icon aria-hidden="true" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </section>

          <div className="about-editorial__details">
            <section className="about-editorial__detail-item">
              <h3>Core Philosophy</h3>
              <p>
                Focusing on clean code, performance optimization, and creating inclusive digital
                experiences that bridge the gap between complex logic and intuitive design.
              </p>
            </section>

            <section className="about-editorial__detail-item">
              <h3>Learning Journey</h3>
              <p>
                Currently pursuing BCA (2023-2026), continuously expanding my knowledge in
                scalable React architectures, state management, and modern styling solutions.
              </p>
            </section>

            <section className="about-editorial__detail-item">
              <h3>Workflow</h3>
              <p>
                Embracing a rapid-iteration approach with a focus on modular component design,
                responsive first principles, and thorough cross-browser validation.
              </p>
            </section>

            <section className="about-editorial__detail-item">
              <h3>Tech Interests</h3>
              <p>
                Passionate about WebGL, interactive 3D experiences, data-driven dashboards, and 
                pushing the boundaries of what's possible on the modern web.
              </p>
            </section>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export default About;

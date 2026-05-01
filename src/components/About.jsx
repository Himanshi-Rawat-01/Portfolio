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
              clean frontend structure with backend integration, APIs, data visualization, and ML
              fundamentals.
            </p>
          </header>

          <section className="about-editorial__skills-block">
            <h3>Technical Skills</h3>
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
            <section>
              <h3>Education</h3>
              <p>
                <strong>2023 - 2026</strong>
                Bachelor of Computer Applications, Tecnia Institute of Advanced Studies, Delhi -
                GGSIPU.
              </p>
            </section>

            <section>
              <h3>Experience</h3>
              <p>
                <strong>Acmegrade</strong>
                Front-End Developer Intern.
              </p>
              <p>
                <strong>Agratas</strong>
                Machine Learning Intern.
              </p>
            </section>

            <section>
              <h3>Project Work</h3>
              <p>E-commerce, PAW pet adoption, toxicology awareness, and AirSense AQI platform.</p>
            </section>

            <section>
              <h3>Communication</h3>
              <p>English, Hindi, documentation, reports, UI presentation, and collaboration.</p>
            </section>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export default About;

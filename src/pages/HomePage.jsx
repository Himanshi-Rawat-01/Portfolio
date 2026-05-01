import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import IntroSplash from '../components/IntroSplash';
import SkillMarquee from '../components/SkillMarquee';
import About from '../components/About';
import Services from '../components/Services';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import CtaBanner from '../components/CtaBanner';
import Contact from '../components/Contact';
import { contactLinks, experienceTimeline, projects, services } from '../data/portfolioData';

const sectionTransition = {
  hidden: { opacity: 0, y: 26, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

function HomePage({ theme }) {
  return (
    <>
      <Navbar />
      <IntroSplash />

      <motion.main key={theme} className="app-shell" initial={false} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
        <motion.section id="about" className="section" variants={sectionTransition} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          <About />
        </motion.section>

        <motion.section className="section section-marquee" variants={sectionTransition} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }}>
          <SkillMarquee />
        </motion.section>

        <motion.section id="services" className="section" variants={sectionTransition} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          <Services services={services} />
        </motion.section>
      </motion.main>

      <motion.section id="projects" variants={sectionTransition} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}>
        <Projects projects={projects} />
      </motion.section>

      <motion.main initial={false} animate={{ opacity: 1 }} className="app-shell" style={{ paddingTop: 0 }}>
        <motion.section id="experience" className="section" variants={sectionTransition} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          <Experience experience={experienceTimeline} />
        </motion.section>

        <motion.section className="section" variants={sectionTransition} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          <CtaBanner />
        </motion.section>

        <motion.section id="contact" className="section section-contact" variants={sectionTransition} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          <Contact links={contactLinks} />
        </motion.section>
      </motion.main>
    </>
  );
}

export default HomePage;

import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import IntroSplash from '../components/IntroSplash';
import SkillMarquee from '../components/SkillMarquee';
import About from '../components/About';
import Services from '../components/Services';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Contact from '../components/Contact';
import { contactLinks, experienceTimeline, projects, services } from '../data/portfolioData';

const sectionVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

function HomePage({ theme }) {
  return (
    <>
      <Navbar />
      {/* IntroSplash has its own sticky implementation */}
      <div style={{ zIndex: 1, position: 'relative' }}>
        <IntroSplash />
      </div>

      {/* Sticky Deck: About */}
      <motion.section 
        id="about" 
        className="sticky-section" 
        style={{ zIndex: 2 }}
        variants={sectionVariants} 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: false, amount: 0.4 }}
      >
        <div className="app-shell" style={{ margin: '0 auto', width: '100%' }}>
          <About />
        </div>
      </motion.section>

      {/* Sticky Deck: Marquee */}
      <motion.section 
        className="sticky-section" 
        style={{ zIndex: 3, minHeight: 'auto', padding: '10vh 0' }}
        variants={sectionVariants} 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: false, amount: 0.4 }}
      >
        {/* Marquee breaks out of container, so no app-shell needed here */}
        <SkillMarquee />
      </motion.section>

      {/* Sticky Deck: Services */}
      <motion.section 
        id="services" 
        className="sticky-section" 
        style={{ zIndex: 4 }}
        variants={sectionVariants} 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: false, amount: 0.35 }}
      >
        <div className="app-shell" style={{ margin: '0 auto', width: '100%' }}>
          <Services services={services} />
        </div>
      </motion.section>

      {/* Sticky Deck: Projects */}
      <motion.section 
        id="projects" 
        className="sticky-section" 
        style={{ zIndex: 5, display: 'block', overflow: 'visible' }}
        variants={sectionVariants} 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: false, amount: 0.3 }}
      >
        {/* Projects has its own full-width structure */}
        <Projects projects={projects} />
      </motion.section>

      {/* Normal Scrolling Block: Experience (Must not be sticky, it has its own ScrollStack) */}
      <section 
        id="experience" 
        style={{ zIndex: 6, position: 'relative', background: 'var(--bg-primary)' }}
      >
        <div className="app-shell" style={{ paddingTop: 0 }}>
          <Experience experience={experienceTimeline} />
        </div>
      </section>

      {/* Normal Scrolling Block: Contact */}
      <motion.section 
        id="contact" 
        className="section section-contact" 
        style={{ zIndex: 7, position: 'relative', background: 'var(--bg-primary)' }}
        variants={sectionVariants} 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: false, amount: 0.35 }}
      >
        <div className="app-shell">
          <Contact links={contactLinks} />
        </div>
      </motion.section>
    </>
  );
}

export default HomePage;

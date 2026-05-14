import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
  useScroll,
} from 'framer-motion';
import { useRef } from 'react';
import profilePhoto from '../assets/profile/about-photo.jpeg';
import { skillIcons } from '../data/portfolioData';
import Beams from './Beams';

/* ─── Easing ─────────────────────────────────────────── */
const EXPO = [0.16, 1, 0.3, 1];

/* ─── Magnetic Skill Chip ────────────────────────────── */
function MagneticSkill({ label, Icon }) {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 300, damping: 20 });
  const sy = useSpring(my, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left - rect.width / 2) * 0.35);
    my.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  };

  const handleMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className="about-editorial__skill"
      style={{ x: sx, y: sy }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ backgroundColor: 'rgba(255,255,255,0.14)', scale: 1.06 }}
      transition={{ duration: 0.25, ease: [0.25, 0, 0, 1] }}
    >
      <Icon aria-hidden="true" />
      <span>{label}</span>
    </motion.div>
  );
}

/* ─── Detail Card ─────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.0, ease: EXPO } },
};

function DetailCard({ title, children }) {
  return (
    <motion.section
      className="about-editorial__detail-item"
      variants={fadeUp}
      whileHover={{
        y: -4,
        boxShadow: '0 0 0 1px rgba(90,211,255,0.4), 0 8px 32px rgba(90,211,255,0.08)',
      }}
      transition={{ duration: 0.4, ease: [0.25, 0, 0, 1] }}
    >
      <h3>{title}</h3>
      <p>{children}</p>
    </motion.section>
  );
}

/* ─── Main Component ─────────────────────────────────── */
function About() {
  const sectionRef = useRef(null);
  const portraitRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  /* Scroll-linked parallax */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const contentY  = useTransform(scrollYProgress, [0, 1], [10, -10]);
  const smoothPortraitY = useSpring(portraitY, { stiffness: 60, damping: 20 });
  const smoothContentY = useSpring(contentY, { stiffness: 60, damping: 20 });

  /* Mouse-tracked 3-D tilt */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 120, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 120, damping: 25 });

  /* Glare position — computed outside JSX (no Hook-in-JSX violation) */
  const glowX = useTransform(mouseX, [-0.5, 0.5], ['10%', '90%']);
  const glowY = useTransform(mouseY, [-0.5, 0.5], ['10%', '90%']);
  const glareBackground = useTransform(
    [glowX, glowY],
    ([gx, gy]) =>
      `radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.18) 0%, transparent 65%)`
  );

  const handlePortraitMouseMove = (e) => {
    const rect = portraitRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handlePortraitMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  /* Animation variants */
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.18, delayChildren: 0.05 } },
  };

  const portraitVariants = {
    hidden: { opacity: 0, scale: 1.08, y: 32 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        opacity: { duration: 1.2, ease: EXPO },
        scale:   { duration: 1.6, ease: EXPO },
        y:       { duration: 1.4, ease: EXPO, delay: 0.05 },
      },
    },
  };

  const lineVariants = {
    hidden: { y: '110%', opacity: 0 },
    visible: (i) => ({
      y: '0%',
      opacity: 1,
      transition: { duration: 0.9, ease: EXPO, delay: i * 0.12 },
    }),
  };

  const skillsContainerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
  };

  const skillItemVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EXPO } },
  };

  const BIO_LINES = [
    'Full Stack Web Developer experienced in designing, developing, and deploying end-to-end web applications, with a strong focus on frontend development and UI/UX design.',
    'Skilled in building responsive, visually appealing, and user-centric interfaces using React, while supporting application functionality with Node.js and Express.js.',
    'Focused on creating intuitive user experiences, optimizing performance, and delivering seamless interactions across devices.',
  ];

  return (
    <div className="section-block about" ref={sectionRef}>
      <motion.article
        className="about-editorial card"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <Beams
          beamWidth={3}
          beamHeight={30}
          beamNumber={6}
          lightColor="#ffffff"
          speed={1.5}
          noiseIntensity={1.5}
          scale={0.2}
          rotation={30}
        />

        {/* ── Portrait Column ── */}
        <motion.div className="about-editorial__left" style={{ y: smoothPortraitY }}>
          <motion.div
            ref={portraitRef}
            className="about-editorial__portrait-tilt"
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d', transformPerspective: 900 }}
            onMouseMove={handlePortraitMouseMove}
            onMouseLeave={handlePortraitMouseLeave}
          >
            <motion.div
              className="about-editorial__portrait"
              variants={portraitVariants}
              style={{ willChange: 'filter, transform, opacity' }}
            >
              <img src={profilePhoto} alt="Himanshi Rawat portrait" />
              {/* Mouse-tracked glare overlay */}
              <motion.div className="portrait-glare" style={{ background: glareBackground }} />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ── Content Column ── */}
        <motion.div className="about-editorial__right" style={{ y: smoothContentY }}>

          <motion.header className="about-editorial__header" variants={containerVariants}>
            <div className="about-editorial__hello">
              <motion.span variants={lineVariants} custom={0} style={{ display: 'block', overflow: 'hidden' }}>
                Hello, I am
              </motion.span>
              <div style={{ overflow: 'hidden' }}>
                <motion.h2 variants={lineVariants} custom={1}>Himanshi Rawat</motion.h2>
              </div>
              <div style={{ overflow: 'hidden' }}>
                <motion.h3 
                  variants={lineVariants} 
                  custom={2} 
                  style={{ color: 'var(--color-primary, #5ad3ff)', marginTop: '0.25rem', fontSize: '1.25rem', fontWeight: '500' }}
                >
                  Full Stack Developer
                </motion.h3>
              </div>
            </div>
            <div className="about-editorial__bio">
              {BIO_LINES.map((text, i) => (
                <div key={i} style={{ overflow: 'hidden' }}>
                  <motion.p variants={lineVariants} custom={i + 3}>{text}</motion.p>
                </div>
              ))}
            </div>
          </motion.header>

          <motion.section className="about-editorial__skills-block" variants={fadeUp}>
            <h3>Technical Toolkit</h3>
            <motion.div
              className="about-editorial__skills"
              aria-label="Technical skills"
              variants={skillsContainerVariants}
            >
              {skillIcons.map(({ label, Icon }) => (
                <motion.div key={label} variants={skillItemVariants}>
                  <MagneticSkill label={label} Icon={Icon} />
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          <motion.div className="about-editorial__details" variants={containerVariants}>
            <DetailCard title="What I Value">
              Consistency, clean architecture, and meaningful design. I believe that every pixel
              and line of code should serve a purpose.
            </DetailCard>
            <DetailCard title="My Goal">
              To create accessible and performant web applications that provide seamless
              experiences across all devices and platforms.
            </DetailCard>
          </motion.div>
        </motion.div>
      </motion.article>
    </div>
  );
}

export default About;

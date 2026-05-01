import { motion } from 'framer-motion';
import {
  FaReact, FaHtml5, FaCss3Alt, FaJs, FaPython, FaPhp, FaGitAlt, FaDatabase, FaChartLine,
} from 'react-icons/fa';
import {
  SiFlask, SiMysql, SiBootstrap, SiNumpy, SiPandas,
  SiFigma,
} from 'react-icons/si';
import { MdDashboard, MdDevices, MdApi } from 'react-icons/md';

const ROW_ONE = [
  { label: 'React.js',           Icon: FaReact },
  { label: 'JavaScript',         Icon: FaJs },
  { label: 'HTML5',              Icon: FaHtml5 },
  { label: 'CSS3',               Icon: FaCss3Alt },
  { label: 'Python',             Icon: FaPython },
  { label: 'PHP',                Icon: FaPhp },
  { label: 'Flask',              Icon: SiFlask },
  { label: 'MySQL',              Icon: SiMysql },
  { label: 'Bootstrap',          Icon: SiBootstrap },
  { label: 'Git & GitHub',       Icon: FaGitAlt },
];

const ROW_TWO = [
  { label: 'UI Design',          Icon: SiFigma },
  { label: 'UX Strategy',        Icon: MdDevices },
  { label: 'Responsive Design',  Icon: MdDevices },
  { label: 'REST APIs',          Icon: MdApi },
  { label: 'Data Visualization', Icon: MdDashboard },
  { label: 'Pandas',             Icon: SiPandas },
  { label: 'NumPy',              Icon: SiNumpy },
  { label: 'Matplotlib',         Icon: FaChartLine },
  { label: 'Component Arch.',    Icon: FaReact },
  { label: 'Databases',          Icon: FaDatabase },
];

function MarqueeRow({ items, direction = 1, duration = 28 }) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee-row">
      <motion.div
        className="marquee-row__track"
        animate={{ x: direction > 0 ? ['0%', '-50%'] : ['-50%', '0%'] }}
        transition={{ duration, ease: 'linear', repeat: Infinity }}
      >
        {doubled.map(({ label, Icon }, i) => (
          <span key={`${label}-${i}`} className="marquee-chip interactive">
            <Icon className="marquee-chip__icon" aria-hidden="true" />
            {label}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function SkillMarquee() {
  return (
    <section className="skills-marquee" aria-label="Tools and technologies">
      {/* Heading stays inside the container flow */}
      <div className="skills-marquee__header">
        <h2 className="skills-marquee__title">Tools &amp; Technologies</h2>
        <p className="skills-marquee__sub">A curated stack built for performance and clarity</p>
      </div>

      {/* Full-bleed strip that escapes the container */}
      <div className="marquee-bleed">
        <div className="marquee-rows">
          <MarqueeRow items={ROW_ONE} direction={1}  duration={30} />
          <MarqueeRow items={ROW_TWO} direction={-1} duration={26} />
        </div>
      </div>
    </section>
  );
}

export default SkillMarquee;

import { motion } from 'framer-motion';
import { FiArrowUpRight, FiGithub } from 'react-icons/fi';

function Projects({ projects }) {
  return (
    <div className="section-block">
      <div className="section-heading">
        <span className="eyebrow">Projects</span>
        <h2>Featured Projects</h2>
      </div>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <motion.article
            key={project.title}
            className="card project-card"
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.58, delay: index * 0.08 }}
          >
            <div className="project-card__media">
              <img
                src={project.image}
                alt={`${project.title} preview`}
                loading="lazy"
                className="project-card__image"
              />
            </div>

            <div className="project-card__body">
              <div className="project-card__meta">
                <span>{project.category}</span>
                <h3>{project.title}</h3>
              </div>

              <p>{project.description}</p>

              <div className="project-card__tags">
                {project.stack.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>

              <div className="project-card__actions">
                {project.github ? (
                  <a className="project-link interactive" href={project.github} target="_blank" rel="noreferrer">
                    <FiGithub />
                    GitHub
                  </a>
                ) : null}

                {project.live ? (
                  <a className="project-link interactive" href={project.live} target="_blank" rel="noreferrer">
                    <FiArrowUpRight />
                    Live Demo
                  </a>
                ) : null}

              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}

export default Projects;

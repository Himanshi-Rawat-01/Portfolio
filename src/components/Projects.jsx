import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUpRight, FiGithub, FiX } from 'react-icons/fi';
import CircularGallery from './CircularGallery';
import GhostCursor from './GhostCursor';

function Projects({ projects }) {
  const [selectedProject, setSelectedProject] = useState(null);

  const galleryItems = projects.map((project) => ({
    image: project.image,
    text: project.title,
  }));

  const handleProjectClick = (item, index) => {
    setSelectedProject(projects[index]);
  };

  return (
    <div 
      className="section-block projects-section card" 
      style={{ 
        padding: '2rem 0 6rem', 
        overflow: 'hidden', 
        width: '100%', 
        borderRadius: '0', 
        border: 'none',
        position: 'relative',
        maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)'
      }}
    >
      <GhostCursor
        color="#B497CF"
        brightness={2}
        edgeIntensity={0}
        trailLength={50}
        inertia={0.5}
        grainIntensity={0.05}
        bloomStrength={0.1}
        bloomRadius={1}
        bloomThreshold={0.025}
        fadeDelayMs={1000}
        fadeDurationMs={1500}
        zIndex={1}
      />
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="section-heading">
          <h2 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", marginBottom: '0' }}>Featured Projects</h2>
        </div>
      </div>

      <div className="projects-gallery-container" style={{ height: '500px', position: 'relative', marginTop: '1rem', zIndex: 2 }}>
          <CircularGallery 
            items={galleryItems} 
            bend={3} 
            textColor="#ffffff" 
            borderRadius={0.05} 
            scrollSpeed={1.5}
            scrollEase={0.03}
            onClick={handleProjectClick}
          />
        </div>

        <AnimatePresence>
          {selectedProject && (
            <motion.div 
              className="project-modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
            >
              <motion.div 
                className="project-modal"
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
              >
              <button 
                className="project-modal__close" 
                onClick={() => setSelectedProject(null)}
                aria-label="Close modal"
              >
                <FiX size={20} />
              </button>

              <div className="project-modal__scroll-area">
                <div className="project-modal__grid">
                  <div className="project-modal__image-wrapper">
                    <img 
                      src={selectedProject.image} 
                      alt={selectedProject.title} 
                      className="project-modal__image"
                    />
                  </div>

                  <div className="project-modal__content">
                    <div className="project-modal__header">
                      <span>{selectedProject.category}</span>
                      <h2>{selectedProject.title}</h2>
                    </div>

                    <p className="project-modal__description">
                      {selectedProject.description}
                    </p>

                    <div className="project-modal__tags">
                      {selectedProject.stack.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>

                    <div className="project-modal__actions">
                      {selectedProject.github && (
                        <a 
                          href={selectedProject.github} 
                          target="_blank" 
                          rel="noreferrer"
                          className="button button--secondary project-link interactive"
                        >
                          <FiGithub />
                          GitHub
                        </a>
                      )}
                      {selectedProject.live && (
                        <a 
                          href={selectedProject.live} 
                          target="_blank" 
                          rel="noreferrer"
                          className="button button--primary project-link interactive"
                        >
                          <FiArrowUpRight />
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Projects;

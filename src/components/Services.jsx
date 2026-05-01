import { FiLayers, FiLayout, FiCode, FiActivity } from 'react-icons/fi';
import CardSwap, { Card } from './CardSwap';

const SERVICE_DETAILS = {
  'Frontend Development': {
    icon: <FiLayout />,
    features: ['React.js', 'Next.js', 'Performance', 'SEO']
  },
  'UI/UX Design': {
    icon: <FiLayers />,
    features: ['Figma', 'Prototyping', 'User Research', 'Accessibility']
  },
  'Full-Stack Integration': {
    icon: <FiCode />,
    features: ['Node.js', 'Flask', 'REST APIs', 'PostgreSQL']
  },
  'Data and ML Interfaces': {
    icon: <FiActivity />,
    features: ['Data Viz', 'Dashboards', 'Python', 'Analytics']
  }
};

function Services({ services }) {
  return (
    <div className="section-block services-section" style={{ position: 'relative', padding: '8rem 0' }}>
      <div className="container" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
        alignItems: 'center', 
        gap: '4rem' 
      }}>
        <div className="section-heading" style={{ 
          textAlign: 'left', 
          marginBottom: '0', 
          alignSelf: 'start', 
          paddingTop: '3rem' 
        }}>
          <h2 style={{ 
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', 
            lineHeight: 1.1,
            margin: 0,
            color: '#fff',
            letterSpacing: '-0.02em'
          }}>
            Services that <br /> scale with you
          </h2>
          <p style={{ 
            marginTop: '1.5rem', 
            color: 'var(--text-secondary)', 
            fontSize: '1.15rem', 
            maxWidth: '380px',
            lineHeight: 1.6 
          }}>
            Building high-performance digital experiences with a focus on precision and user-centric design.
          </p>
        </div>

        <div style={{ 
          position: 'relative', 
          width: '100%', 
          height: '600px', 
          display: 'flex', 
          justifyContent: 'flex-end', 
          alignItems: 'center',
          overflow: 'visible'
        }}>
          <CardSwap
            width={540}
            height={360}
            cardDistance={50}
            verticalDistance={60}
            delay={5000}
            pauseOnHover={true}
          >
            {services.map((service, index) => {
              const details = SERVICE_DETAILS[service.title] || { icon: <FiActivity />, features: [] };
              return (
                <Card key={service.title}>
                  <div className="card-window">
                    <div className="card-window__header">
                      <span className="card-window__icon">{details.icon}</span>
                      <span className="card-window__title">{service.title}</span>
                    </div>
                    <div className="card-window__body">
                      <p>{service.description}</p>
                      
                      <div className="card-window__features">
                        {details.features.map(feature => (
                          <span key={feature} className="card-feature-tag">{feature}</span>
                        ))}
                      </div>
                      
                      <div className="card-window__visual" />
                    </div>
                  </div>
                </Card>
              );
            })}
          </CardSwap>
        </div>
      </div>
    </div>
  );
}

export default Services;

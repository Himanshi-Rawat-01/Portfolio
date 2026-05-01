import { motion } from "framer-motion";
import ScrollStack, { ScrollStackItem } from "./ScrollStack";

function Experience({ experience }) {
  return (
    <div className="section-block">
      <div className="section-heading" style={{ textAlign: "center", marginBottom: "4rem" }}>
        <span className="eyebrow" style={{ color: "var(--accent)", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", fontSize: "0.8rem" }}>Journey</span>
        <h2 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", marginTop: "0.5rem" }}>Experience</h2>
      </div>

      <div className="experience-stack-wrapper" style={{ minHeight: '250vh', position: 'relative' }}>
        <ScrollStack 
          useWindowScroll={true} 
          itemDistance={150} 
          itemScale={0.05} 
          itemStackDistance={20}
          stackPosition="50%"
          baseScale={0.94}
        >
          {experience.map((item, index) => (
            <ScrollStackItem key={`${item.title}-${item.company}`}>
              <div className="timeline-card-content">
                <span className="timeline-card__period" style={{ 
                  color: "var(--accent)", 
                  fontSize: "0.9rem", 
                  fontWeight: 600,
                  display: "inline-block",
                  marginBottom: "1rem"
                }}>
                  {item.period}
                </span>
                <h3 style={{ 
                  fontSize: "clamp(1.5rem, 3vw, 2.2rem)", 
                  margin: "0 0 1rem 0",
                  fontFamily: "var(--font-display)",
                  color: "#fff"
                }}>
                  {item.title}
                </h3>
                <h4 style={{ 
                  fontSize: "1.1rem", 
                  color: "var(--text-secondary)", 
                  margin: "0 0 1.5rem 0",
                  fontWeight: 500
                }}>
                  {item.company}
                </h4>
                <p style={{ 
                  color: "var(--text-secondary)", 
                  fontSize: "1.1rem", 
                  lineHeight: 1.7,
                  maxWidth: "700px"
                }}>
                  {item.description}
                </p>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </div>
  );
}

export default Experience;

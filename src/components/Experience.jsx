import { motion } from "framer-motion";
import ScrollStack, { ScrollStackItem } from "./ScrollStack";

function Experience({ experience }) {
  return (
    <div className="section-block">
      {/* Heading animates in normally */}
      <motion.div
        className="section-heading"
        style={{ textAlign: "center", marginBottom: "2rem" }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", margin: 0 }}>
          Experience
        </h2>
      </motion.div>

      {/*
        ScrollStack wrapper:
        - No Framer Motion hidden/visible wrapping here — offsets must be real on mount
        - useWindowScroll=true so it responds to the global Lenis scroll
        - Tuned props so the stacking starts as soon as cards enter the viewport
      */}
      <ScrollStack
        useWindowScroll={true}
        itemDistance={120}
        itemScale={0.04}
        itemStackDistance={18}
        stackPosition="42%"
        scaleEndPosition="12%"
        baseScale={0.90}
        rotationAmount={0}
        blurAmount={0}
      >
        {experience.map((item) => (
          <ScrollStackItem key={`${item.title}-${item.company}`}>
            <div className="timeline-card-content">
              <span
                className="timeline-card__period"
                style={{
                  color: "var(--accent)",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  display: "inline-block",
                  marginBottom: "0.75rem",
                }}
              >
                {item.period}
              </span>
              <h3
                style={{
                  fontSize: "clamp(1.4rem, 2.8vw, 2rem)",
                  margin: "0 0 0.6rem 0",
                  fontFamily: "var(--font-display)",
                  color: "var(--text-primary)",
                  lineHeight: 1.2,
                }}
              >
                {item.title}
              </h3>
              <h4
                style={{
                  fontSize: "1rem",
                  color: "var(--accent-strong)",
                  margin: "0 0 1.25rem 0",
                  fontWeight: 600,
                }}
              >
                {item.company}
              </h4>
              <p
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "1rem",
                  lineHeight: 1.7,
                  maxWidth: "680px",
                  margin: 0,
                }}
              >
                {item.description}
              </p>
            </div>
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </div>
  );
}

export default Experience;

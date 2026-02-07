import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: "5+", label: "Years of Experience" },
  { value: "30+", label: "Projects Delivered" },
  { value: "100%", label: "Client Satisfaction" },
];

const About = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-50px" });

  return (
    <section id="about" className="relative py-32 md:py-48 section-padding overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/[0.02] blur-3xl pointer-events-none" />

      <div ref={ref} className="relative z-10 max-w-5xl mx-auto">
        {/* Section label */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-body block mb-4"
        >
          About
        </motion.span>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-12"
        >
          I don't just build software.
          <br />
          <span className="text-gradient-gold">I engineer experiences.</span>
        </motion.h2>

        {/* Two-column text */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-20">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-sm md:text-base text-muted-foreground font-body leading-relaxed"
          >
            I'm Uchechukwu Godspower — known as MrChuks. A full-stack developer
            who believes that every pixel, every animation, and every line of code
            should serve a purpose. I approach each project as a craftsman approaches
            their art: with intention, precision, and an unwavering commitment to excellence.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-sm md:text-base text-muted-foreground font-body leading-relaxed"
          >
            From scalable backend architectures to immersive frontend experiences,
            I deliver solutions that don't just work — they leave an impression.
            I partner with forward-thinking brands and founders who demand nothing
            less than exceptional quality for their digital presence.
          </motion.p>
        </div>

        {/* Stats */}
        <motion.div
          ref={statsRef}
          className="grid grid-cols-3 gap-8 border-t border-border pt-12"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              className="text-center md:text-left"
            >
              <span className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-gradient-gold block mb-2">
                {stat.value}
              </span>
              <span className="text-xs md:text-sm text-muted-foreground font-body tracking-wide">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;

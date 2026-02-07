import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

interface Project {
  number: string;
  title: string;
  category: string;
  description: string;
  tech: string[];
  impact: string;
  year: string;
}

const projects: Project[] = [
  {
    number: "01",
    title: "Nexus Platform",
    category: "Web Application",
    description:
      "A next-generation SaaS platform for enterprise teams. Built from scratch with a focus on real-time collaboration, scalable architecture, and a seamless user experience that handles thousands of concurrent users.",
    tech: ["React", "Node.js", "PostgreSQL", "WebSocket", "AWS"],
    impact: "40% increase in team productivity",
    year: "2024",
  },
  {
    number: "02",
    title: "Vault Finance",
    category: "Fintech Dashboard",
    description:
      "A comprehensive financial analytics dashboard that transforms complex data into intuitive visualizations. Designed for precision and built for performance, handling millions of data points in real-time.",
    tech: ["TypeScript", "Next.js", "D3.js", "Redis", "Stripe API"],
    impact: "Processing $2M+ in transactions",
    year: "2024",
  },
  {
    number: "03",
    title: "Echo Commerce",
    category: "E-Commerce Platform",
    description:
      "A headless commerce solution with a custom storefront that delivers sub-second load times. Engineered with a microservices architecture for infinite scalability and personalized shopping experiences.",
    tech: ["React", "GraphQL", "Tailwind CSS", "Vercel", "Sanity CMS"],
    impact: "3x conversion rate improvement",
    year: "2023",
  },
];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.9,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative"
    >
      {/* Horizontal divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="h-px bg-border origin-left mb-10 md:mb-14"
      />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 pb-16 md:pb-24">
        {/* Left column - Number & Category */}
        <div className="md:col-span-3 flex md:flex-col justify-between md:justify-start gap-4">
          <span className="font-display text-5xl md:text-6xl font-bold text-gradient-gold opacity-60">
            {project.number}
          </span>
          <div className="flex flex-col gap-2">
            <span className="text-xs tracking-[0.25em] uppercase text-muted-foreground font-body">
              {project.category}
            </span>
            <span className="text-xs text-dim font-body">{project.year}</span>
          </div>
        </div>

        {/* Center column - Title & Description */}
        <div className="md:col-span-5">
          <motion.h3
            className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-4 leading-tight group-hover:text-gradient-gold transition-all duration-500"
          >
            {project.title}
          </motion.h3>
          <p className="text-sm md:text-base text-muted-foreground font-body leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Right column - Tech & Impact */}
        <div className="md:col-span-4 flex flex-col justify-between gap-6">
          <div>
            <span className="text-[10px] tracking-[0.25em] uppercase text-dim font-body block mb-3">
              Technology
            </span>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="text-xs font-body text-muted-foreground border border-border px-3 py-1 hover:border-primary/30 hover:text-foreground transition-colors duration-300"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div>
            <span className="text-[10px] tracking-[0.25em] uppercase text-dim font-body block mb-2">
              Impact
            </span>
            <span className="text-sm font-body text-primary font-medium">
              {project.impact}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const isTitleInView = useInView(titleRef, { once: true, margin: "-100px" });

  return (
    <section id="projects" ref={sectionRef} className="relative py-32 md:py-48 section-padding">
      {/* Section header */}
      <div ref={titleRef} className="mb-20 md:mb-32">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-body block mb-4"
        >
          Selected Work
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground"
        >
          Projects that
          <br />
          <span className="text-gradient-gold">define craft.</span>
        </motion.h2>
      </div>

      {/* Project list */}
      <div>
        {projects.map((project, i) => (
          <ProjectCard key={project.number} project={project} index={i} />
        ))}
      </div>
    </section>
  );
};

export default Projects;

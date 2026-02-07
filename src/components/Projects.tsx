import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Project {
  number: string;
  title: string;
  category: string;
  description: string;
  tech: string[];
  year: string;
  github: string;
  live?: string;
}

const projects: Project[] = [
  {
    number: "01",
    title: "Uni Results Hub",
    category: "Web Application",
    description:
      "A university results management platform built for seamless academic record access. Engineered with a modern React stack for fast, responsive performance and intuitive navigation across student result data.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Vite", "shadcn/ui"],
    year: "2026",
    github: "https://github.com/MrChuksx/uni-results-hub-09811d83",
  },
  {
    number: "02",
    title: "Guidora",
    category: "Career Guidance Platform",
    description:
      "An intelligent career compass application that helps users navigate their professional journey. Features a robust backend with PostgreSQL for data persistence and a polished React frontend for an engaging user experience.",
    tech: ["React", "TypeScript", "PostgreSQL", "Tailwind CSS", "Vite"],
    year: "2025",
    github: "https://github.com/MrChuksx/guidora-your-career-compass",
  },
  {
    number: "03",
    title: "MrChuks Org",
    category: "AI-Powered Platform",
    description:
      "A dynamic organization platform generated from Google Gemini's AI Studio template. Built with a modern TypeScript stack, showcasing the intersection of AI tooling and full-stack development.",
    tech: ["TypeScript", "React", "Gemini AI", "Tailwind CSS", "Vercel"],
    year: "2026",
    github: "https://github.com/MrChuksx/MrChuksx-s-Org",
    live: "https://mr-chuksx-s-org.vercel.app",
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
          <p className="text-sm md:text-base text-muted-foreground font-body leading-relaxed mb-6">
            {project.description}
          </p>

          {/* Visit links */}
          <div className="flex items-center gap-5">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link flex items-center gap-2 text-xs tracking-[0.2em] uppercase font-body text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              <span>GitHub</span>
              <svg
                className="w-3.5 h-3.5 transform transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M4 12L12 4M12 4H5M12 4V11" />
              </svg>
            </a>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link flex items-center gap-2 text-xs tracking-[0.2em] uppercase font-body text-primary hover:text-foreground transition-colors duration-300"
              >
                <span>Live Site</span>
                <svg
                  className="w-3.5 h-3.5 transform transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M4 12L12 4M12 4H5M12 4V11" />
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Right column - Tech */}
        <div className="md:col-span-4 flex flex-col justify-start gap-6">
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
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section id="projects" ref={sectionRef} className="relative py-32 md:py-48 section-padding">
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

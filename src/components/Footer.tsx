import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import MagneticButton from "./MagneticButton";
const socials = [{
  label: "LinkedIn",
  href: "https://www.linkedin.com/in/godspower-uchechukwu-69a200397"
}, {
  label: "X / Twitter",
  href: "https://x.com/mrchuks_?s=21"
}, {
  label: "Instagram",
  href: "https://www.instagram.com/bluestoneon"
}];
const Footer = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-50px"
  });
  return <footer id="footer" className="relative py-32 md:py-48 section-padding overflow-hidden">
      {/* Top divider */}
      <motion.div initial={{
      scaleX: 0
    }} animate={isInView ? {
      scaleX: 1
    } : {}} transition={{
      duration: 1,
      ease: [0.16, 1, 0.3, 1]
    }} className="h-px bg-border origin-left mb-20" />

      <div ref={ref} className="max-w-5xl mx-auto">
        {/* CTA */}
        <motion.div initial={{
        opacity: 0,
        y: 40
      }} animate={isInView ? {
        opacity: 1,
        y: 0
      } : {}} transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }} className="mb-20">
          <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-body block mb-6">
            Let's Connect
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold text-foreground leading-none mb-6">
            Have a project
            <br />
            <span className="text-gradient-gold">in mind?</span>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground font-body max-w-md leading-relaxed">
            I'm always open to discussing new projects, creative ideas, or
            opportunities to bring your vision to life.
          </p>
        </motion.div>

        {/* Social links */}
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={isInView ? {
        opacity: 1,
        y: 0
      } : {}} transition={{
        duration: 0.7,
        delay: 0.2
      }} className="flex flex-col md:flex-row gap-6 md:gap-12 mb-32">
          {socials.map(social => <MagneticButton key={social.label} href={social.href} target="_blank" className="group flex items-center gap-3 text-foreground hover:text-primary transition-colors duration-300" strength={0.2}>
              <span className="text-sm md:text-base font-body tracking-wide">
                {social.label}
              </span>
              <svg className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 12L12 4M12 4H5M12 4V11" />
              </svg>
            </MagneticButton>)}
        </motion.div>

        {/* Bottom bar */}
        
      </div>
    </footer>;
};
export default Footer;
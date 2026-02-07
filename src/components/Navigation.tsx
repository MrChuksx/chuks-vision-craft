import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import MagneticButton from "./MagneticButton";
import logoImage from "@/assets/mrchuks-logo.png";

const Navigation = () => {
  const { scrollYProgress } = useScroll();
  const bgOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 0.9]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 section-padding py-5 flex items-center justify-between"
      style={{
        backgroundColor: `hsla(225, 20%, 4%, ${bgOpacity})`,
        backdropFilter: "blur(12px)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex items-center gap-3"
      >
        <img src={logoImage} alt="MrChuks logo" className="w-8 h-8 object-contain" />
        <span className="font-display text-lg font-semibold tracking-tight text-foreground">
          MrChuks
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="hidden md:flex items-center gap-8"
      >
        {[
          { label: "Work", id: "projects" },
          { label: "About", id: "about" },
          { label: "Connect", id: "footer" },
        ].map((item) => (
          <MagneticButton
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors duration-300 tracking-wide uppercase"
            strength={0.2}
          >
            {item.label}
          </MagneticButton>
        ))}
      </motion.div>
    </motion.nav>
  );
};

export default Navigation;

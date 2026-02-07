import { useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import MagneticButton from "./MagneticButton";
import logoImage from "@/assets/mrchuks-logo.png";

const navItems = [
  { label: "Work", id: "projects" },
  { label: "About", id: "about" },
  { label: "Connect", id: "footer" },
];

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const bgOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 0.9]);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
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

        {/* Desktop nav */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="hidden md:flex items-center gap-8"
        >
          {navItems.map((item) => (
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

        {/* Mobile hamburger button */}
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden relative z-[60] w-10 h-10 flex flex-col items-center justify-center gap-1.5"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="block w-6 h-px bg-foreground origin-center"
          />
          <motion.span
            animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.2 }}
            className="block w-6 h-px bg-foreground"
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="block w-6 h-px bg-foreground origin-center"
          />
        </motion.button>
      </motion.nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-10">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.1 + i * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  onClick={() => scrollTo(item.id)}
                  className="font-display text-3xl font-semibold text-foreground hover:text-gradient-gold transition-all duration-300 tracking-wide uppercase"
                >
                  {item.label}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;

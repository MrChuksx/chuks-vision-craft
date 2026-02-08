import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import profilePhoto from "@/assets/profile-photo.jpg";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const subtitleY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.8], [0, 0.6]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const letterVariants = {
    hidden: { y: "110%", rotateX: -80, opacity: 0 },
    visible: (i: number) => ({
      y: "0%",
      rotateX: 0,
      opacity: 1,
      transition: {
        duration: 1,
        delay: 0.8 + i * 0.06,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  const brandName = "MrChuks";

  return (
    <motion.section
      ref={containerRef}
      className="relative h-screen flex items-center justify-center overflow-hidden cinematic-gradient"
      style={{ scale }}
    >
      {/* Ambient orbs */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-[0.04]"
        style={{
          x: smoothX,
          y: smoothY,
          background: "radial-gradient(circle, hsl(38 65% 50%), transparent 70%)",
          top: "10%",
          right: "10%",
        }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full opacity-[0.03]"
        style={{
          x: useTransform(smoothX, (v) => -v * 0.5),
          y: useTransform(smoothY, (v) => -v * 0.5),
          background: "radial-gradient(circle, hsl(225 40% 30%), transparent 70%)",
          bottom: "20%",
          left: "5%",
        }}
      />

      {/* Grid lines - subtle */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute left-[20%] top-0 bottom-0 w-px bg-foreground" />
        <div className="absolute left-[40%] top-0 bottom-0 w-px bg-foreground" />
        <div className="absolute left-[60%] top-0 bottom-0 w-px bg-foreground" />
        <div className="absolute left-[80%] top-0 bottom-0 w-px bg-foreground" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center section-padding">
        {/* Preheader */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{ y: subtitleY }}
          className="mb-8"
        >
          <span className="text-xs md:text-sm tracking-[0.3em] uppercase text-muted-foreground font-body">
            Full-Stack Developer & Digital Craftsman
          </span>
        </motion.div>

        {/* Main brand name */}
        <motion.h1
          style={{ y: titleY }}
          className="perspective-1000 mb-8"
        >
          <span className="flex justify-center items-center overflow-hidden">
            {brandName.split("").map((letter, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                className="inline-block font-display text-7xl sm:text-8xl md:text-9xl lg:text-[11rem] xl:text-[13rem] font-bold tracking-tighter text-gradient-gold preserve-3d"
                style={{
                  lineHeight: 1,
                }}
              >
                {letter}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        {/* Profile Image - below brand name */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 flex justify-center"
        >
          <div className="relative w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden border-2 border-primary/30 glow-gold">
            <img
              src={profilePhoto}
              alt="MrChuks"
              className="w-full h-full object-cover"
            />
            {/* Ring glow effect */}
            <div className="absolute inset-0 rounded-full border border-primary/20" />
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          style={{ y: subtitleY }}
          className="text-base md:text-lg lg:text-xl text-muted-foreground font-body max-w-xl mx-auto leading-relaxed"
        >
          Building digital experiences with precision, vision, and obsessive attention to detail.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="mt-12"
        >
          <motion.button
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            className="group relative px-8 py-3 text-sm tracking-[0.2em] uppercase font-body text-foreground border border-border hover:border-primary/50 transition-colors duration-500 overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">View Work</span>
            <motion.div
              className="absolute inset-0 bg-primary/10"
              initial={{ x: "-100%" }}
              whileHover={{ x: "0%" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.button>
        </motion.div>
      </div>

      {/* Bottom fade overlay */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"
        style={{ opacity: overlayOpacity }}
      />
    </motion.section>
  );
};

export default Hero;

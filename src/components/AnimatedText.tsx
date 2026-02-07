import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  splitBy?: "word" | "char";
  once?: boolean;
}

const AnimatedText = ({ text, className = "", delay = 0, as: Tag = "p", splitBy = "word", once = true }: AnimatedTextProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-50px" });

  const items = splitBy === "word" ? text.split(" ") : text.split("");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: splitBy === "char" ? 0.02 : 0.06,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = {
    hidden: {
      y: "100%",
      opacity: 0,
    },
    visible: {
      y: "0%",
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`flex flex-wrap ${className}`}
      aria-label={text}
    >
      {items.map((item, i) => (
        <span key={i} className="overflow-hidden inline-block">
          <motion.span
            variants={itemVariants}
            className="inline-block"
          >
            {Tag === "h1" || Tag === "h2" || Tag === "h3" ? (
              <Tag className={className}>{item}</Tag>
            ) : (
              item
            )}
          </motion.span>
          {splitBy === "word" && i < items.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </motion.div>
  );
};

export default AnimatedText;

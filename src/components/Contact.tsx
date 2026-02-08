import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const Contact = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // mailto fallback
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formState.name}`);
    const body = encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\n\n${formState.message}`
    );
    window.open(`mailto:godspoweruchechukwu59@gmail.com?subject=${subject}&body=${body}`);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormState({ name: "", email: "", message: "" });
  };

  const inputClasses =
    "w-full bg-transparent border-b border-border px-0 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors duration-300";

  return (
    <section id="contact" className="relative py-32 md:py-48 section-padding overflow-hidden">
      {/* Top divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="h-px bg-border origin-left mb-20"
      />

      <div ref={ref} className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-body block mb-6">
            Get In Touch
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-none">
            Let's work
            <br />
            <span className="text-gradient-gold">together.</span>
          </h2>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-10"
        >
          <div>
            <label
              htmlFor="name"
              className="text-xs tracking-[0.2em] uppercase text-muted-foreground font-body block mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formState.name}
              onChange={handleChange}
              placeholder="Your name"
              className={inputClasses}
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="text-xs tracking-[0.2em] uppercase text-muted-foreground font-body block mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formState.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className={inputClasses}
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="text-xs tracking-[0.2em] uppercase text-muted-foreground font-body block mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              value={formState.message}
              onChange={handleChange}
              placeholder="Tell me about your project..."
              className={`${inputClasses} resize-none`}
            />
          </div>

          <motion.button
            type="submit"
            className="group relative px-10 py-4 text-sm tracking-[0.2em] uppercase font-body text-foreground border border-border hover:border-primary/50 transition-colors duration-500 overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">
              {submitted ? "Opening Mail Client..." : "Send Message"}
            </span>
            <motion.div
              className="absolute inset-0 bg-primary/10"
              initial={{ x: "-100%" }}
              whileHover={{ x: "0%" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { stats } from "../data";

function AnimatedCounter({ value, suffix, isInView }) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!isInView || started.current) return;
    started.current = true;

    const duration = 2200;
    const steps = 60;
    const increment = value / steps;
    const interval = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isInView, value]);

  const display =
    count >= 1000 ? `${(count / 1000).toFixed(1)}K` : count.toLocaleString();

  return (
    <span>
      {display}
      {suffix}
    </span>
  );
}

export default function ImpactStats() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="impact"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0d3320 0%, #1B4332 50%, #0d3320 100%)",
      }}
    >
      {/* Decorative dots */}
      <div className="absolute inset-0 bg-hero-pattern pointer-events-none opacity-30" />

      {/* Top/bottom borders */}
      <div className="absolute top-0    left-0 right-0 h-px bg-gradient-to-r from-transparent via-saffron/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-saffron/50 to-transparent" />

      {/* Big decorative text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span className="font-serif text-[18rem] font-bold text-white/[0.02] select-none leading-none">
          गौ
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-semibold tracking-widest uppercase text-saffron mb-3">
            Our Impact
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            Numbers That{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-saffron-light to-saffron">
              Tell Our Story
            </span>
          </h2>
          <p className="text-white/60 max-w-xl mx-auto text-lg">
            Over 14 years of dedicated service to India's sacred cows
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              whileHover={{ scale: 1.04, y: -4 }}
              className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-3xl p-7 text-center hover:border-saffron/30 hover:bg-white/12 transition-all duration-300 group"
            >
              <motion.div
                animate={isInView ? { scale: [0, 1.2, 1] } : {}}
                transition={{ duration: 0.6, delay: i * 0.12 + 0.2 }}
                className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300"
              >
                {stat.icon}
              </motion.div>

              <div className="font-serif text-4xl lg:text-5xl font-bold text-saffron leading-none mb-2">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  isInView={isInView}
                />
              </div>

              <div className="text-white font-semibold text-base mb-1">
                {stat.label}
              </div>
              <div className="text-white/45 text-xs">{stat.description}</div>
            </motion.div>
          ))}
        </div>

        {/* Timeline / milestones */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="relative"
        >
          <h3 className="text-center font-serif text-2xl font-bold text-white mb-10 opacity-90">
            Our Journey
          </h3>

          {/* Horizontal line */}
          <div className="hidden md:block absolute top-14 left-0 right-0 h-0.5 bg-white/10">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.7 }}
              className="h-full bg-gradient-to-r from-saffron/30 via-saffron to-saffron/30 origin-left"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
            {[
              {
                year: "2010",
                event: "Founded in Mathura with 12 rescued cows",
              },
              { year: "2014", event: "Expanded to 10 gaushalas across UP" },
              { year: "2018", event: "Launched organic products program" },
              { year: "2024", event: "54 gaushalas, 5,200+ cows protected" },
            ].map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
                className="relative text-center"
              >
                {/* Dot on timeline */}
                <div className="hidden md:flex justify-center mb-6">
                  <div className="w-4 h-4 rounded-full bg-saffron shadow-lg shadow-saffron/40 ring-4 ring-saffron/20" />
                </div>
                <div className="bg-white/8 border border-white/10 rounded-2xl p-5">
                  <div className="text-saffron font-bold text-xl mb-2">
                    {m.year}
                  </div>
                  <p className="text-white/65 text-xs leading-relaxed">
                    {m.event}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

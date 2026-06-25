import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import _LottieRaw from "lottie-react";
const Lottie = _LottieRaw?.default ?? _LottieRaw;

// ── Inline minimal Lottie (pulsing lotus / mandala) ──────────────
// A simple 3-petal rotating shape that symbolises the lotus.
const lottieCowData = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 120,
  w: 400,
  h: 400,
  nm: "Lotus",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Ring 1",
      sr: 1,
      st: 0,
      ip: 0,
      op: 120,
      ks: {
        o: { a: 0, k: 70 },
        r: {
          a: 1,
          k: [
            {
              t: 0,
              s: [0],
              e: [360],
              i: { x: [0.5], y: [1] },
              o: { x: [0.5], y: [0] },
            },
            { t: 120 },
          ],
        },
        p: { a: 0, k: [200, 200, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            {
              t: 0,
              s: [80, 80, 100],
              e: [100, 100, 100],
              i: { x: [0.5], y: [1] },
              o: { x: [0.5], y: [0] },
            },
            {
              t: 60,
              s: [100, 100, 100],
              e: [80, 80, 100],
              i: { x: [0.5], y: [1] },
              o: { x: [0.5], y: [0] },
            },
            { t: 120 },
          ],
        },
      },
      shapes: [
        {
          ty: "gr",
          it: [
            { ty: "el", p: { a: 0, k: [0, 0] }, s: { a: 0, k: [160, 160] } },
            {
              ty: "st",
              c: { a: 0, k: [0.957, 0.635, 0.38, 1] },
              o: { a: 0, k: 100 },
              w: { a: 0, k: 6 },
            },
            {
              ty: "tr",
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 },
            },
          ],
        },
      ],
    },
    {
      ddd: 0,
      ind: 2,
      ty: 4,
      nm: "Ring 2",
      sr: 1,
      st: 0,
      ip: 0,
      op: 120,
      ks: {
        o: { a: 0, k: 50 },
        r: {
          a: 1,
          k: [
            {
              t: 0,
              s: [0],
              e: [-360],
              i: { x: [0.5], y: [1] },
              o: { x: [0.5], y: [0] },
            },
            { t: 120 },
          ],
        },
        p: { a: 0, k: [200, 200, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] },
      },
      shapes: [
        {
          ty: "gr",
          it: [
            { ty: "el", p: { a: 0, k: [0, 0] }, s: { a: 0, k: [240, 240] } },
            {
              ty: "st",
              c: { a: 0, k: [0.105, 0.263, 0.196, 1] },
              o: { a: 0, k: 100 },
              w: { a: 0, k: 4 },
            },
            {
              ty: "tr",
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 },
            },
          ],
        },
      ],
    },
    {
      ddd: 0,
      ind: 3,
      ty: 4,
      nm: "Center",
      sr: 1,
      st: 0,
      ip: 0,
      op: 120,
      ks: {
        o: {
          a: 1,
          k: [
            {
              t: 0,
              s: [60],
              e: [100],
              i: { x: [0.5], y: [1] },
              o: { x: [0.5], y: [0] },
            },
            {
              t: 60,
              s: [100],
              e: [60],
              i: { x: [0.5], y: [1] },
              o: { x: [0.5], y: [0] },
            },
            { t: 120 },
          ],
        },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [200, 200, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] },
      },
      shapes: [
        {
          ty: "gr",
          it: [
            { ty: "el", p: { a: 0, k: [0, 0] }, s: { a: 0, k: [60, 60] } },
            {
              ty: "fl",
              c: { a: 0, k: [0.957, 0.568, 0.102, 1] },
              o: { a: 0, k: 100 },
            },
            {
              ty: "tr",
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 },
            },
          ],
        },
      ],
    },
  ],
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.15,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const floatVariant = {
  animate: {
    y: [0, -18, 0],
    transition: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
  },
};

export default function Hero() {
  const [donated, setDonated] = useState(false);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0d3320 0%, #1B4332 35%, #2D6A4F 65%, #1a3a28 100%)",
      }}
    >
      {/* Texture overlay */}
      <div className="absolute inset-0 bg-hero-pattern opacity-30 pointer-events-none" />

      {/* Decorative blobs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-saffron/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 pt-24 pb-16 grid md:grid-cols-2 gap-12 items-center">
        {/* ── Left: Text content ── */}
        <div>
          <motion.span
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="inline-flex items-center gap-2 bg-saffron/20 border border-saffron/30 text-saffron-light text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6"
          >
            <span className="w-1.5 h-1.5 bg-saffron rounded-full animate-pulse" />
            गौरक्षण मिशन
          </motion.span>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="font-serif text-5xl md:text-6xl lg:text-7xl text-white font-bold leading-[1.1] mb-6"
          >
            Protect the{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-saffron-light to-saffron">
                Sacred Cow
              </span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.9, duration: 0.5, ease: "easeOut" }}
                className="absolute bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-saffron/60 to-transparent origin-left rounded-full"
              />
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="text-white/75 text-lg leading-relaxed mb-8 max-w-lg"
          >
            Join India's most trusted cow protection movement. Every donation
            rescues, heals, and provides a safe sanctuary for abandoned and
            injured cows across the nation.
          </motion.p>

          {/* ── Stat pills ── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="flex flex-wrap gap-4 mb-10"
          >
            {[
              { n: "5,200+", t: "Cows Rescued" },
              { n: "54", t: "Gaushalas" },
              { n: "₹2Cr+", t: "Raised" },
            ].map((stat) => (
              <div
                key={stat.t}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-5 py-3"
              >
                <div className="font-serif text-2xl font-bold text-saffron leading-none">
                  {stat.n}
                </div>
                <div className="text-white/60 text-xs mt-0.5">{stat.t}</div>
              </div>
            ))}
          </motion.div>

          {/* ── CTAs ── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={4}
            className="flex flex-wrap gap-4"
          >
            <motion.a
              href="#donate"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(244,145,26,0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-saffron-dark to-saffron text-white font-semibold text-lg shadow-xl"
              onClick={() => setDonated(true)}
            >
              <span>❤️</span> Donate Now
            </motion.a>

            <motion.a
              href="#stories"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full border-2 border-white/40 text-white font-semibold text-lg hover:bg-white/10 transition-colors duration-300"
            >
              Our Stories →
            </motion.a>
          </motion.div>

          {/* ── Trust badges ── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={5}
            className="flex items-center gap-6 mt-10 pt-10 border-t border-white/10"
          >
            {["80G Tax Exempt", "FCRA Registered", "ISO Certified"].map(
              (badge) => (
                <div
                  key={badge}
                  className="flex items-center gap-1.5 text-white/50 text-xs"
                >
                  <span className="text-green-400">✓</span>
                  {badge}
                </div>
              ),
            )}
          </motion.div>
        </div>

        {/* ── Right: Photo collage ── */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="relative hidden md:block"
        >
          {/* Glow blob behind collage */}
          <div className="absolute -inset-8 bg-saffron/10 rounded-full blur-3xl pointer-events-none" />

          {/* Photo grid */}
          <div className="relative z-10 grid grid-cols-2 gap-3">
            {/* Top-left: large portrait */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              className="col-span-2 rounded-3xl overflow-hidden h-52 shadow-2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1471193945509-9ad0617afabf?w=800&q=80&auto=format&fit=crop"
                alt="Sacred cow in a lush green field"
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl pointer-events-none" />
            </motion.div>

            {/* Bottom-left */}
            <motion.div
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl overflow-hidden h-44 shadow-xl"
            >
              <img
                src="https://images.unsplash.com/photo-1546445317-29f4545e9d53?w=500&q=80&auto=format&fit=crop"
                alt="White cow close up"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>

            {/* Bottom-right: stacked */}
            <div className="flex flex-col gap-3">
              <motion.div
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl overflow-hidden flex-1 shadow-xl"
                style={{ height: "80px" }}
              >
                <img
                  src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=500&q=80&auto=format&fit=crop"
                  alt="Cows grazing"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl overflow-hidden flex-1 shadow-xl"
                style={{ height: "80px" }}
              >
                <img
                  src="https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=500&q=80&auto=format&fit=crop"
                  alt="Herd of cattle"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </motion.div>
            </div>
          </div>

          {/* Floating stat card */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="absolute -bottom-5 -left-6 bg-white rounded-2xl px-5 py-3.5 shadow-2xl flex items-center gap-3 z-20"
          >
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-xl">
              🐄
            </div>
            <div>
              <div className="font-bold text-primary-900 text-lg leading-none">
                5,200+
              </div>
              <div className="text-gray-400 text-xs">Cows Rescued</div>
            </div>
          </motion.div>

          {/* Floating verified badge */}
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 1.4, duration: 0.5 }}
            className="absolute top-4 -right-4 bg-saffron text-white rounded-full px-4 py-2 shadow-lg flex items-center gap-2 text-sm font-semibold z-20"
          >
            <span className="text-base">❤️</span> Gau Seva
          </motion.div>

          {/* Bottom label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            className="absolute -bottom-5 right-0 text-white/40 text-xs"
          >
            Real cows from our gaushalas
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/40 text-xs tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 border-2 border-white/30 rounded-full flex justify-center pt-1.5"
        >
          <div className="w-1 h-2 bg-white/50 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}

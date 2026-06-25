import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import _LottieRaw from "lottie-react";
const Lottie = _LottieRaw?.default ?? _LottieRaw;
import { donationAmounts } from "../data";

// ── Simple heart-pulse Lottie (inline) ───────────────────────────
const heartAnimation = {
  v: "5.7.4",
  fr: 24,
  ip: 0,
  op: 48,
  w: 200,
  h: 200,
  nm: "Heart",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Heart",
      sr: 1,
      st: 0,
      ip: 0,
      op: 48,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [100, 100, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            {
              t: 0,
              s: [100, 100, 100],
              e: [120, 120, 100],
              i: { x: [0.5], y: [1] },
              o: { x: [0.5], y: [0] },
            },
            {
              t: 12,
              s: [120, 120, 100],
              e: [100, 100, 100],
              i: { x: [0.5], y: [1] },
              o: { x: [0.5], y: [0] },
            },
            {
              t: 24,
              s: [100, 100, 100],
              e: [110, 110, 100],
              i: { x: [0.5], y: [1] },
              o: { x: [0.5], y: [0] },
            },
            {
              t: 36,
              s: [110, 110, 100],
              e: [100, 100, 100],
              i: { x: [0.5], y: [1] },
              o: { x: [0.5], y: [0] },
            },
            { t: 48 },
          ],
        },
      },
      shapes: [
        {
          ty: "gr",
          it: [
            {
              ty: "sr",
              p: { a: 0, k: [0, 0] },
              r: { a: 0, k: 40 },
              ir: { a: 0, k: 20 },
              is: { a: 0, k: 0 },
              or: { a: 0, k: 40 },
              os: { a: 0, k: 0 },
              ix: 2,
              pt: { a: 0, k: 5 },
              sy: 1,
            },
            {
              ty: "fl",
              c: { a: 0, k: [0.96, 0.57, 0.1, 1] },
              o: { a: 0, k: 100 },
            },
            {
              ty: "tr",
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: -90 },
              o: { a: 0, k: 100 },
            },
          ],
        },
      ],
    },
  ],
};

const RAISED = 1875000;
const GOAL = 2500000;
const DONORS = 3241;
const progress = Math.round((RAISED / GOAL) * 100);

const perks = [
  { icon: "🐄", title: "₹108 feeds a cow for a day" },
  { icon: "💊", title: "₹501 covers medical treatment" },
  { icon: "🏡", title: "₹1001 provides shelter upgrades" },
  { icon: "🌿", title: "₹2100 rescues one abandoned cow" },
  { icon: "🙏", title: "₹5001 sponsors a cow for a month" },
];

export default function Donation() {
  const [selected, setSelected] = useState(donationAmounts[2]);
  const [custom, setCustom] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const amount =
    selected.amount === 0 ? parseInt(custom) || 0 : selected.amount;

  const handleDonate = () => {
    if (amount < 1) return;
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 4000);
  };

  return (
    <section
      id="donate"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #6B3A2A 0%, #8B4C3B 35%, #A05E4A 65%, #7A3F2E 100%)",
      }}
    >
      {/* Texture */}
      <div className="absolute inset-0 bg-hero-pattern opacity-20" />

      <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block text-sm font-semibold tracking-widest uppercase text-saffron-light mb-4">
              Make a Difference
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
              Support a Cow's
              <br />
              <span className="text-saffron-light">Sacred Life</span>
            </h2>
            <p className="text-white/70 leading-relaxed mb-10 text-lg">
              Your donation provides nutritious food, medical care and a safe
              sanctuary for abandoned, injured and elderly cows. Every rupee
              reaches the cows directly.
            </p>

            {/* Progress */}
            <div className="mb-10">
              <div className="flex justify-between text-white text-sm font-medium mb-2">
                <span>₹{(RAISED / 100000).toFixed(1)}L raised</span>
                <span>Goal: ₹{(GOAL / 100000).toFixed(0)}L</span>
              </div>
              <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${progress}%` } : {}}
                  transition={{ duration: 1.4, delay: 0.5, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-saffron-light to-saffron rounded-full"
                />
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-saffron-light text-sm font-bold">
                  {progress}% funded
                </span>
                <span className="text-white/60 text-sm">
                  {DONORS.toLocaleString()} donors
                </span>
              </div>
            </div>

            {/* What your donation does */}
            <div className="space-y-3">
              <h4 className="text-white font-semibold mb-4 uppercase text-xs tracking-widest">
                What Your Donation Does
              </h4>
              {perks.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.6 + i * 0.08 }}
                  className="flex items-center gap-3 text-white/75 text-sm"
                >
                  <span className="text-lg">{p.icon}</span>
                  <span>{p.title}</span>
                </motion.div>
              ))}
            </div>

            {/* Lottie */}
            <div className="mt-8 flex justify-center">
              <Lottie
                animationData={heartAnimation}
                loop
                style={{ width: 100, height: 100, opacity: 0.9 }}
              />
            </div>
          </motion.div>

          {/* Right: Donation form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl"
          >
            <h3 className="font-serif text-2xl font-bold text-white mb-6">
              Choose an Amount
            </h3>

            {/* Amount buttons */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {donationAmounts.map((opt) => (
                <motion.button
                  key={opt.amount}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.04 }}
                  onClick={() => {
                    setSelected(opt);
                    setCustom("");
                  }}
                  className={`py-3 px-2 rounded-2xl text-sm font-semibold transition-all duration-200 text-center ${
                    selected.amount === opt.amount
                      ? "bg-saffron text-white shadow-lg scale-105"
                      : "bg-white/15 border border-white/25 text-white hover:bg-white/25"
                  }`}
                >
                  <div className="text-lg font-bold">{opt.label}</div>
                  {opt.amount > 0 && (
                    <div className="text-[10px] opacity-70 mt-0.5 leading-tight">
                      {opt.benefit}
                    </div>
                  )}
                </motion.button>
              ))}
            </div>

            {/* Custom amount */}
            <AnimatePresence>
              {selected.amount === 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 overflow-hidden"
                >
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 font-bold text-lg">
                      ₹
                    </span>
                    <input
                      type="number"
                      min="1"
                      placeholder="Enter amount"
                      value={custom}
                      onChange={(e) => setCustom(e.target.value)}
                      className="w-full pl-9 pr-4 py-3.5 bg-white/15 border border-white/30 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:border-saffron font-semibold text-lg"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Donation type */}
            <div className="flex gap-3 mb-6">
              {["One Time", "Monthly"].map((type) => (
                <button
                  key={type}
                  className="flex-1 py-2.5 rounded-xl text-sm font-medium bg-white/10 border border-white/20 text-white/70 hover:bg-white/20 transition-colors"
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Selected amount display */}
            <div className="bg-white/5 rounded-2xl p-4 mb-6 flex justify-between items-center">
              <span className="text-white/70 text-sm">Donation Amount</span>
              <span className="text-white font-bold text-xl">
                ₹{amount > 0 ? amount.toLocaleString() : "—"}
              </span>
            </div>

            {/* Donate button */}
            <motion.button
              whileHover={{
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(244,145,26,0.4)",
              }}
              whileTap={{ scale: 0.98 }}
              onClick={handleDonate}
              disabled={amount < 1}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-saffron-dark to-saffron text-white font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed shadow-xl transition-all duration-300"
            >
              ❤️ Donate ₹{amount > 0 ? amount.toLocaleString() : "—"} Now
            </motion.button>

            {/* Trust icons */}
            <div className="mt-5 flex justify-center gap-6 text-white/40 text-xs">
              <span>🔒 Secure Payment</span>
              <span>📋 80G Receipt</span>
              <span>🏛️ FCRA Approved</span>
            </div>

            {/* Success overlay */}
            <AnimatePresence>
              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-primary-900/95 backdrop-blur-sm rounded-3xl z-20"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    className="text-7xl mb-4"
                  >
                    🙏
                  </motion.div>
                  <h3 className="text-white font-serif text-2xl font-bold mb-2">
                    Thank You!
                  </h3>
                  <p className="text-white/70 text-center">
                    Your ₹{amount.toLocaleString()} will protect
                    <br />
                    our sacred cows. Jai Gau Mata!
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

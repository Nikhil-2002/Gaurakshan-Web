import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1471193945509-9ad0617afabf?w=800&q=80&auto=format&fit=crop",
    alt: "Sacred cow in lush green meadow",
    label: "Free Grazing",
    span: "col-span-2 row-span-2",
    aspect: "aspect-square",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1546445317-29f4545e9d53?w=600&q=80&auto=format&fit=crop",
    alt: "White cow close-up portrait",
    label: "Nandini – Rescued 2024",
    span: "col-span-1",
    aspect: "aspect-video",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=600&q=80&auto=format&fit=crop",
    alt: "Herd of cattle in golden light",
    label: "Sunrise at Gaushala",
    span: "col-span-1",
    aspect: "aspect-video",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=600&q=80&auto=format&fit=crop",
    alt: "Brown cow close-up with soft eyes",
    label: "Every Life Matters",
    span: "col-span-1",
    aspect: "aspect-video",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=700&q=80&auto=format&fit=crop",
    alt: "Cows in rural Indian countryside",
    label: "Village Rescue, Rajasthan",
    span: "col-span-2",
    aspect: "aspect-video",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1598030304671-5aa1d6f21128?w=600&q=80&auto=format&fit=crop",
    alt: "Gaushala caretaker with cows",
    label: "Our Volunteers",
    span: "col-span-1",
    aspect: "aspect-square",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80&auto=format&fit=crop",
    alt: "Organic green farm fields",
    label: "Organic Feed Fields",
    span: "col-span-1",
    aspect: "aspect-square",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&q=80&auto=format&fit=crop",
    alt: "Fresh pure A2 milk",
    label: "Pure A2 Milk",
    span: "col-span-1",
    aspect: "aspect-video",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=700&q=80&auto=format&fit=crop",
    alt: "India countryside and heritage",
    label: "Our Sacred Heritage",
    span: "col-span-2",
    aspect: "aspect-video",
  },
];

export default function GallerySection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [lightbox, setLightbox] = useState(null);

  return (
    <section ref={sectionRef} className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="section-tag">Photo Gallery</span>
          <h2 className="section-title text-primary-900 mb-4">
            Life Inside Our <span className="text-gradient">Gaushalas</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
            A glimpse into the daily lives of the cows we protect — fed, healed,
            loved and set free to graze.
          </p>
        </motion.div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-3 md:grid-cols-4 gap-3 auto-rows-[180px]">
          {galleryImages.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className={`relative overflow-hidden rounded-2xl cursor-pointer group ${img.span}`}
              onClick={() => setLightbox(img)}
              style={{
                gridRow: img.span.includes("row-span-2") ? "span 2" : "span 1",
                gridColumn: img.span.includes("col-span-2")
                  ? "span 2"
                  : "span 1",
              }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Label */}
              <motion.div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-white text-xs font-semibold bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  {img.label}
                </span>
              </motion.div>

              {/* Zoom icon */}
              <div className="absolute top-3 right-3 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center text-gray-700 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
                ⤢
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-10"
        >
          <a
            href="#donate"
            className="inline-flex items-center gap-2 bg-primary-900 text-white font-semibold px-7 py-3.5 rounded-full hover:bg-primary-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Help Us Create More Such Stories →
          </a>
        </motion.div>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative max-w-4xl w-full rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightbox.src.replace(/w=\d+/, "w=1200")}
                alt={lightbox.alt}
                className="w-full max-h-[80vh] object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/70 to-transparent">
                <p className="text-white font-semibold">{lightbox.label}</p>
                <p className="text-white/60 text-sm">{lightbox.alt}</p>
              </div>
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center text-xl hover:bg-black/70 transition-colors"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

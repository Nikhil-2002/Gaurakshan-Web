import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-cards";
import { rescueStories } from "../data";

const categoryColors = {
  Rescue: "bg-red-100 text-red-700",
  Recovery: "bg-blue-100 text-blue-700",
  Gaushala: "bg-green-100 text-green-700",
  Program: "bg-purple-100 text-purple-700",
  Campaign: "bg-amber-100 text-amber-700",
};

export default function AwarenessCarousel() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="stories"
      ref={sectionRef}
      className="py-24 bg-cream-dark overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-tag">Rescue Stories</span>
          <h2 className="section-title text-primary-900 mb-4">
            Lives Changed,{" "}
            <span className="text-gradient">One Cow at a Time</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Every cow has a story. These are real rescues made possible by the
            generosity of donors and the dedication of our volunteers.
          </p>
        </motion.div>

        {/* Main Swiper – story cards */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={28}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true, dynamicBullets: true }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              640: { slidesPerView: 1.5 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-14"
          >
            {rescueStories.map((story, i) => (
              <SwiperSlide key={story.id}>
                <StoryCard story={story} index={i} />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-4"
        >
          <a
            href="#donate"
            className="inline-flex items-center gap-2 text-primary-700 font-semibold hover:text-saffron transition-colors duration-200 group"
          >
            Help rescue more cows
            <span className="group-hover:translate-x-1 transition-transform duration-200">
              →
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function StoryCard({ story, index }) {
  return (
    <motion.article
      whileHover={{ y: -8, boxShadow: "0 24px 48px rgba(27,67,50,0.15)" }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-3xl overflow-hidden shadow-md h-full flex flex-col"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={story.image}
          alt={story.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Category badge */}
        <span
          className={`absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[story.category] ?? "bg-gray-100 text-gray-600"}`}
        >
          {story.category}
        </span>

        {/* Location */}
        <span className="absolute bottom-4 left-4 flex items-center gap-1 text-white text-xs font-medium">
          <span>📍</span> {story.location}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-gray-400 font-medium">
            {story.date}
          </span>
          <span className="text-xs bg-primary-50 text-primary-700 px-2 py-0.5 rounded-full font-medium">
            #{story.id.toString().padStart(3, "0")}
          </span>
        </div>

        <h3 className="font-serif text-xl font-bold text-gray-900 mb-3 leading-tight">
          {story.title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed flex-1">
          {story.description}
        </p>

        <motion.button
          whileTap={{ scale: 0.95 }}
          className="mt-5 flex items-center gap-2 text-primary-700 font-semibold text-sm group"
        >
          Read full story
          <span className="group-hover:translate-x-1 transition-transform duration-200">
            →
          </span>
        </motion.button>
      </div>
    </motion.article>
  );
}

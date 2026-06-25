import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { testimonials } from "../data";

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`text-base ${i < rating ? "text-amber-400" : "text-gray-200"}`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="py-24 bg-cream-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-tag">Testimonials</span>
          <h2 className="section-title text-primary-900 mb-4">
            Voices of <span className="text-gradient">Compassion</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-lg">
            Hear from donors, volunteers and customers who are part of our
            Gaurakshan family.
          </p>
        </motion.div>

        {/* Swiper */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true, dynamicBullets: true }}
            autoplay={{
              delay: 5500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              640: { slidesPerView: 1.3 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-14"
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.id}>
                <TestimonialCard testimonial={t} />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Overall rating */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 p-6 bg-white rounded-3xl shadow-sm border border-gray-100"
        >
          <div className="text-center sm:border-r sm:border-gray-200 sm:pr-8">
            <div className="font-serif text-5xl font-bold text-primary-900">
              4.9
            </div>
            <StarRating rating={5} />
            <div className="text-xs text-gray-500 mt-1">Overall rating</div>
          </div>
          <div className="grid grid-cols-5 gap-2 flex-1 max-w-xs">
            {[5, 4, 3, 2, 1].map((star) => {
              const pct = star === 5 ? 90 : star === 4 ? 7 : 2;
              return (
                <div key={star} className="contents">
                  <span className="text-xs text-gray-500 text-right">
                    {star}★
                  </span>
                  <div className="col-span-3 flex items-center">
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-400 rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">{pct}%</span>
                </div>
              );
            })}
          </div>
          <div className="text-center sm:border-l sm:border-gray-200 sm:pl-8">
            <div className="font-bold text-2xl text-primary-900">3,241</div>
            <div className="text-xs text-gray-500">
              Happy donors &<br />
              customers
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial: t }) {
  return (
    <motion.div
      whileHover={{ y: -8, boxShadow: "0 24px 48px rgba(27,67,50,0.12)" }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-3xl p-7 shadow-md h-full flex flex-col"
    >
      {/* Quote mark */}
      <div className="font-serif text-6xl text-saffron/25 leading-none mb-3 -mt-2">
        "
      </div>

      {/* Stars */}
      <StarRating rating={t.rating} />

      {/* Message */}
      <p className="text-gray-600 text-sm leading-relaxed mt-4 mb-6 flex-1">
        {t.message}
      </p>

      {/* Divider */}
      <div className="h-px bg-gray-100 mb-5" />

      {/* Author */}
      <div className="flex items-center gap-4">
        <div className="relative w-11 h-11 flex-shrink-0">
          <img
            src={t.avatar}
            alt={t.name}
            className="w-11 h-11 rounded-full object-cover ring-2 ring-offset-1 ring-primary-100"
            loading="lazy"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
          <div
            className={`w-11 h-11 rounded-full items-center justify-center text-white font-bold text-sm ${t.color} hidden`}
          >
            {t.initials}
          </div>
        </div>
        <div>
          <div className="font-semibold text-gray-900 text-sm">{t.name}</div>
          <div className="text-xs text-gray-400">
            {t.role} · {t.location}
          </div>
        </div>
        <div className="ml-auto">
          <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center text-lg">
            ✓
          </div>
        </div>
      </div>
    </motion.div>
  );
}

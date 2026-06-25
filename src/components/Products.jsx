import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { products } from "../data";

const filterCategories = ["All", "Dairy", "Health", "Spiritual", "Farm"];

export default function Products({ onAddToCart }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [addedId, setAddedId] = useState(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const filtered =
    activeFilter === "All"
      ? products
      : products.filter((p) => p.category === activeFilter);

  const handleAdd = (id) => {
    setAddedId(id);
    onAddToCart?.();
    setTimeout(() => setAddedId(null), 1800);
  };

  return (
    <section
      id="products"
      ref={sectionRef}
      className="py-24 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="section-tag">Pure Cow Products</span>
          <h2 className="section-title text-primary-900 mb-4">
            From Gaushala <span className="text-gradient">To Your Home</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
            Every purchase directly supports our rescued cows. 100% natural,
            ethically sourced and traditionally processed.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {filterCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === cat
                  ? "bg-primary-900 text-white shadow-lg scale-105"
                  : "bg-gray-100 text-gray-600 hover:bg-primary-50 hover:text-primary-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Product grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                index={i}
                isAdded={addedId === product.id}
                onAdd={() => handleAdd(product.id)}
                isInView={isInView}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 rounded-3xl p-8 text-center"
          style={{
            background: "linear-gradient(135deg, #1B4332 0%, #2D6A4F 100%)",
          }}
        >
          <p className="text-white font-serif text-2xl font-bold mb-2">
            🌿 100% of profits fund cow rescue & care
          </p>
          <p className="text-white/70 mb-6">
            Shop consciously. Every rupee makes a difference.
          </p>
          <a
            href="#donate"
            className="inline-flex items-center gap-2 bg-saffron text-white font-semibold px-7 py-3 rounded-full hover:bg-saffron-dark transition-colors duration-200"
          >
            Also Donate Directly →
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function ProductCard({ product, index, isAdded, onAdd, isInView }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -10 }}
      className={`relative bg-gradient-to-br ${product.color} rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-400 flex flex-col`}
    >
      {/* Badge */}
      <div
        className={`absolute top-4 left-4 z-10 text-xs font-semibold px-3 py-1 rounded-full ${product.badgeColor}`}
      >
        {product.badge}
      </div>

      {/* Product image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{ transform: hovered ? "scale(1.1)" : "scale(1)" }}
          loading="lazy"
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

        {/* Emoji badge bottom-right */}
        <div className="absolute bottom-3 right-3 text-3xl bg-white/90 backdrop-blur-sm w-12 h-12 rounded-xl flex items-center justify-center shadow-md">
          {product.emoji}
        </div>

        {/* Decorative circles */}
        <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-white/10 rounded-full pointer-events-none" />
        <div className="absolute -top-4  -left-4  w-20 h-20 bg-white/10 rounded-full pointer-events-none" />
      </div>

      {/* Info */}
      <div className="flex-1 flex flex-col p-6 pt-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-serif text-xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h3>
            <span className="text-xs text-gray-500 font-medium">
              {product.category}
            </span>
          </div>
          <div className="text-right">
            <div className="font-bold text-xl text-primary-900">
              ₹{product.price}
            </div>
            <div className="text-xs text-gray-500">{product.unit}</div>
          </div>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={`text-sm ${i < Math.floor(product.rating) ? "text-amber-400" : "text-gray-300"}`}
              >
                ★
              </span>
            ))}
          </div>
          <span className="text-xs text-gray-500 font-medium">
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* Add to cart */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onAdd}
          className={`w-full py-3 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
            isAdded
              ? "bg-green-500 text-white"
              : "bg-primary-900 text-white hover:bg-primary-700 hover:shadow-lg"
          }`}
        >
          <motion.span
            key={isAdded ? "check" : "cart"}
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {isAdded ? "✓" : "🛒"}
          </motion.span>
          {isAdded ? "Added to Cart!" : "Add to Cart"}
        </motion.button>
      </div>
    </motion.div>
  );
}

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Stories", href: "#stories" },
  { label: "Our Cow", href: "#cow3d" },
  { label: "Products", href: "#products" },
  { label: "Donate", href: "#donate" },
  { label: "About", href: "#impact" },
];

export default function Navbar({ cartCount = 0 }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navBg = scrolled
    ? "bg-white/95 backdrop-blur-md shadow-sm"
    : "bg-transparent";

  const textColor = scrolled ? "text-primary-900" : "text-white";

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${navBg}`}
    >
      <nav className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a
          href="#home"
          className="flex items-center gap-2.5 group"
          onClick={() => setActive("#home")}
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-saffron to-saffron-dark flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-200">
            <span className="text-xl leading-none">🐄</span>
          </div>
          <div>
            <div
              className={`font-serif font-bold text-lg leading-tight transition-colors duration-300 ${scrolled ? "text-primary-900" : "text-white"}`}
            >
              Gaurakshan
            </div>
            <div
              className={`text-[10px] tracking-widest uppercase leading-tight transition-colors duration-300 ${scrolled ? "text-saffron" : "text-saffron-light"}`}
            >
              Cow Protection
            </div>
          </div>
        </a>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setActive(link.href)}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                  ${
                    active === link.href
                      ? scrolled
                        ? "bg-primary-900/10 text-primary-900"
                        : "bg-white/20 text-white"
                      : scrolled
                        ? "text-gray-700 hover:text-primary-900 hover:bg-gray-100"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                  }
                `}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {/* Cart */}
          <motion.a
            href="#products"
            whileTap={{ scale: 0.9 }}
            className="relative hidden md:flex items-center justify-center w-10 h-10"
          >
            <span
              className={`text-xl transition-colors duration-300 ${scrolled ? "text-gray-700" : "text-white"}`}
            >
              🛒
            </span>
            {cartCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-saffron text-white text-[10px] font-bold rounded-full flex items-center justify-center"
              >
                {cartCount}
              </motion.span>
            )}
          </motion.a>

          {/* Donate CTA */}
          <motion.a
            href="#donate"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-saffron-dark to-saffron text-white text-sm font-semibold shadow-lg hover:shadow-saffron/30 hover:shadow-xl transition-shadow duration-300"
          >
            <span>❤️</span>
            <span>Donate Now</span>
          </motion.a>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className={`lg:hidden flex flex-col gap-1.5 p-2 rounded-md transition-colors ${scrolled ? "text-gray-700" : "text-white"}`}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-5 h-0.5 bg-current transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block w-5 h-0.5 bg-current transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-5 h-0.5 bg-current transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white/98 backdrop-blur-md border-t border-gray-100 shadow-xl overflow-hidden"
          >
            <ul className="flex flex-col py-4 px-5 gap-1">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <a
                    href={link.href}
                    onClick={() => {
                      setActive(link.href);
                      setMenuOpen(false);
                    }}
                    className="block px-4 py-3 rounded-xl text-gray-700 hover:bg-primary-50 hover:text-primary-900 font-medium transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <li className="mt-2 pt-2 border-t border-gray-100">
                <a
                  href="#donate"
                  onClick={() => setMenuOpen(false)}
                  className="block text-center px-4 py-3 rounded-xl bg-gradient-to-r from-saffron-dark to-saffron text-white font-semibold"
                >
                  ❤️ Donate Now
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

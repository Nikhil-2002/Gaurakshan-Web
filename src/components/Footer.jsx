import React, { useState } from "react";
import { motion } from "framer-motion";

const footerLinks = {
  "Quick Links": [
    { label: "About Us", href: "#impact" },
    { label: "Rescue Stories", href: "#stories" },
    { label: "Products", href: "#products" },
    { label: "Donate", href: "#donate" },
    { label: "Volunteer", href: "#" },
    { label: "Contact Us", href: "#" },
  ],
  "Our Work": [
    { label: "Cow Rescue", href: "#" },
    { label: "Gaushala Network", href: "#" },
    { label: "Medical Treatment", href: "#" },
    { label: "Farmer Partnership", href: "#" },
    { label: "Education Programs", href: "#" },
    { label: "Annual Reports", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "80G Certificate", href: "#" },
    { label: "FCRA Registration", href: "#" },
    { label: "Refund Policy", href: "#" },
  ],
};

const socialLinks = [
  {
    icon: "📘",
    label: "Facebook",
    href: "https://facebook.com",
    color: "hover:bg-blue-600",
  },
  {
    icon: "📸",
    label: "Instagram",
    href: "https://instagram.com",
    color: "hover:bg-pink-600",
  },
  {
    icon: "🐦",
    label: "Twitter",
    href: "https://twitter.com",
    color: "hover:bg-sky-500",
  },
  {
    icon: "▶️",
    label: "YouTube",
    href: "https://youtube.com",
    color: "hover:bg-red-600",
  },
  {
    icon: "💬",
    label: "WhatsApp",
    href: "https://wa.me/",
    color: "hover:bg-green-600",
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer
      className="relative overflow-hidden text-white"
      style={{
        background:
          "linear-gradient(135deg, #2D1B0E 0%, #3D2B1F 40%, #2D1B0E 100%)",
      }}
    >
      {/* Top gradient border */}
      <div className="h-1 w-full bg-gradient-to-r from-saffron via-primary-400 to-saffron opacity-60" />

      <div className="max-w-7xl mx-auto px-5 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-saffron to-saffron-dark flex items-center justify-center shadow-lg text-2xl">
                🐄
              </div>
              <div>
                <div className="font-serif text-xl font-bold text-white">
                  Gaurakshan
                </div>
                <div className="text-saffron/80 text-xs tracking-widest uppercase">
                  Cow Protection Mission
                </div>
              </div>
            </div>

            <p className="text-white/55 text-sm leading-relaxed mb-6 max-w-xs">
              Dedicated to protecting India's sacred cows since 2010. We rescue,
              rehabilitate and provide loving care for abandoned and injured
              cows across the nation.
            </p>

            {/* Contact info */}
            <div className="space-y-3 mb-7">
              {[
                { icon: "📍", text: "Gaushala Road, Vrindavan, UP – 281121" },
                { icon: "📞", text: "+91 99999 88888" },
                { icon: "📧", text: "seva@gaurakshan.org" },
                { icon: "🕐", text: "Mon–Sun: 8:00 AM – 8:00 PM" },
              ].map((item) => (
                <div
                  key={item.text}
                  className="flex items-start gap-3 text-white/55 text-sm"
                >
                  <span className="text-base mt-0.5 flex-shrink-0">
                    {item.icon}
                  </span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            {/* Social */}
            <div>
              <div className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-3">
                Follow Us
              </div>
              <div className="flex gap-2 flex-wrap">
                {socialLinks.map((s) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-lg transition-colors duration-200 ${s.color}`}
                  >
                    {s.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-semibold text-sm mb-5 uppercase tracking-wider">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white/50 text-sm hover:text-saffron transition-colors duration-200 flex items-center gap-1.5 group"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-saffron transition-all duration-200" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div
          className="rounded-3xl p-8 mb-12 flex flex-col sm:flex-row items-center justify-between gap-6"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <div>
            <h4 className="font-serif text-xl font-bold text-white mb-1">
              Stay Connected
            </h4>
            <p className="text-white/55 text-sm">
              Get rescue stories, impact updates & product launches in your
              inbox.
            </p>
          </div>
          <form
            onSubmit={handleSubscribe}
            className="flex gap-3 w-full sm:w-auto flex-shrink-0"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="flex-1 sm:w-64 px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-saffron text-sm"
            />
            <motion.button
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="px-5 py-3 rounded-2xl bg-saffron text-white font-semibold text-sm hover:bg-saffron-dark transition-colors duration-200 whitespace-nowrap"
            >
              {subscribed ? "✓ Done!" : "Subscribe"}
            </motion.button>
          </form>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-white/40 text-xs">
          <p>
            © 2024 Gaurakshan Mission. All rights reserved. Made with ❤️ for Gau
            Mata.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span>54 Gaushalas actively serving</span>
          </div>
        </div>
      </div>

      {/* Decorative bottom cow */}
      <div className="absolute bottom-0 right-8 text-[8rem] opacity-5 pointer-events-none leading-none select-none">
        🐄
      </div>
    </footer>
  );
}

import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AwarenessCarousel from "./components/AwarenessCarousel";
import CowModel3D from "./components/CowModel3D";
import Products from "./components/Products";
import GallerySection from "./components/GallerySection";
import Donation from "./components/Donation";
import ImpactStats from "./components/ImpactStats";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";

function App() {
  const [cartCount, setCartCount] = useState(0);

  const addToCart = () => setCartCount((prev) => prev + 1);

  return (
    <div className="font-sans bg-cream overflow-x-hidden">
      <Navbar cartCount={cartCount} />
      <Hero />
      <AwarenessCarousel />
      <CowModel3D />
      <Products onAddToCart={addToCart} />
      <GallerySection />
      <Donation />
      <ImpactStats />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default App;

import React from "react";
import { AppProvider } from "./context/AppContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import MenuSection from "./components/MenuSection";
import CustomCakes from "./components/CustomCakes";
import WhyChooseUs from "./components/WhyChooseUs";
import GallerySection from "./components/GallerySection";
import TestimonialsSection from "./components/TestimonialsSection";
import FAQSection from "./components/FAQSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import FloatingWhatsApp from "./components/FloatingWhatsApp";

export default function App() {
  return (
    <AppProvider>
      <div id="app-root-container" className="min-h-screen flex flex-col justify-between selection:bg-bakery-accent/30 selection:text-bakery-brown">
        {/* Sticky Header */}
        <Navbar />

        {/* Core Showcase Layout */}
        <main className="flex-grow">
          {/* Hero Landing */}
          <Hero />

          {/* About Brand Story */}
          <About />

          {/* Storefront Menu */}
          <MenuSection />

          {/* Custom Cake Builder */}
          <CustomCakes />

          {/* Brand Promises */}
          <WhyChooseUs />

          {/* Visual Gallery */}
          <GallerySection />

          {/* Customer Reviews & Feedback Panel */}
          <TestimonialsSection />

          {/* Expandable FAQs Accordion */}
          <FAQSection />

          {/* Contact Coordinates & Map */}
          <ContactSection />
        </main>

        {/* Page Footer */}
        <Footer />

        {/* Shopping Cart Drawer Slide */}
        <CartDrawer />

        {/* WhatsApp Floating Utility */}
        <FloatingWhatsApp />
      </div>
    </AppProvider>
  );
}

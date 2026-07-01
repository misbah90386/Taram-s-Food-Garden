import React, { useState } from "react";
import { Facebook, Instagram, Youtube, Heart, Flower2, Send, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    // Simulate database subscription
    const saved = localStorage.getItem("tarams_newsletter");
    const currentList = saved ? JSON.parse(saved) : [];
    currentList.push(newsletterEmail);
    localStorage.setItem("tarams_newsletter", JSON.stringify(currentList));

    setIsSubscribed(true);
    setNewsletterEmail("");

    setTimeout(() => {
      setIsSubscribed(false);
    }, 4000);
  };

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer id="main-footer" className="bg-bakery-dark text-white pt-20 pb-10 border-t-2 border-bakery-accent/30 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-bakery-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-bakery-rose/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Row 1: Brand details, links, newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-white/10 pb-16">
          
          {/* Brand Intro column */}
          <div className="md:col-span-4 space-y-5">
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="w-9 h-9 rounded-full bg-bakery-accent/15 flex items-center justify-center border border-bakery-accent/20">
                <Flower2 className="w-4 h-4 text-bakery-accent" />
              </div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white">
                Taram's <span className="text-bakery-accent font-normal italic">Food Garden</span>
              </span>
            </div>
            
            <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
              An elegant, luxury pâtisserie specializing in hand-rolled buttery croissants, naturally leavened artisan sourdough boules, and custom-designed grand celebration cakes built for your most cherished life milestones.
            </p>

            {/* Social media links */}
            <div className="flex items-center gap-3 pt-2">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-bakery-accent hover:text-bakery-dark transition-all hover:scale-110" title="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-bakery-accent hover:text-bakery-dark transition-all hover:scale-110" title="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-bakery-accent hover:text-bakery-dark transition-all hover:scale-110" title="YouTube">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links column */}
          <div className="md:col-span-3 space-y-5">
            <h4 className="font-serif font-bold text-sm text-bakery-accent uppercase tracking-widest">
              Quick Navigation
            </h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-xs text-white/75">
              <a href="#home" onClick={(e) => handleScrollToSection(e, "#home")} className="hover:text-bakery-accent transition-colors">Home</a>
              <a href="#about" onClick={(e) => handleScrollToSection(e, "#about")} className="hover:text-bakery-accent transition-colors">About Us</a>
              <a href="#menu" onClick={(e) => handleScrollToSection(e, "#menu")} className="hover:text-bakery-accent transition-colors">Sweet Menu</a>
              <a href="#custom-cakes" onClick={(e) => handleScrollToSection(e, "#custom-cakes")} className="hover:text-bakery-accent transition-colors">Custom Cakes</a>
              <a href="#gallery" onClick={(e) => handleScrollToSection(e, "#gallery")} className="hover:text-bakery-accent transition-colors">Gallery</a>
              <a href="#testimonials" onClick={(e) => handleScrollToSection(e, "#testimonials")} className="hover:text-bakery-accent transition-colors">Reviews</a>
              <a href="#faq" onClick={(e) => handleScrollToSection(e, "#faq")} className="hover:text-bakery-accent transition-colors">FAQs</a>
              <a href="#contact" onClick={(e) => handleScrollToSection(e, "#contact")} className="hover:text-bakery-accent transition-colors">Contact</a>
            </div>
          </div>

          {/* Newsletter signup column */}
          <div className="md:col-span-5 space-y-5">
            <h4 className="font-serif font-bold text-sm text-bakery-accent uppercase tracking-widest">
              The Sweet Club Newsletter
            </h4>
            <p className="text-xs text-white/75 leading-relaxed">
              Subscribe to unlock premium custom recipes, early booking slots for holiday cake collections, and seasonal VIP tasting invitations.
            </p>

            <AnimatePresence mode="wait">
              {isSubscribed ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 p-3.5 bg-bakery-accent/10 border border-bakery-accent/25 rounded-xl text-bakery-accent text-xs font-semibold"
                >
                  <Check className="w-4 h-4 shrink-0" />
                  <span>Subscribed! Welcome to the Sweet Club list.</span>
                </motion.div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="baker@domain.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-bakery-accent/30 focus:border-bakery-accent"
                  />
                  <button
                    id="newsletter-subscribe-btn"
                    type="submit"
                    className="bg-bakery-accent hover:bg-white text-bakery-dark hover:scale-105 font-bold text-xs uppercase px-5 py-3 rounded-xl transition-all flex items-center justify-center gap-1 shrink-0 cursor-pointer"
                  >
                    <span>Join</span>
                    <Send className="w-3 h-3" />
                  </button>
                </form>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Row 2: Bottom copyright / developer signature */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-10 text-xs text-white/50">
          <div className="flex items-center gap-1 text-center sm:text-left">
            <span>© {currentYear} Taram's Food Garden Pâtisserie. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-1">
            <span>Baked with</span>
            <Heart className="w-3.5 h-3.5 text-bakery-rose fill-bakery-rose" />
            <span>for beautiful life celebrations.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

import React from "react";
import { ArrowRight, Sparkles, CakeSlice } from "lucide-react";
import { motion } from "motion/react";
// @ts-ignore
import heroBanner from "../assets/images/bakery_hero_banner_1782892759286.jpg";

export default function Hero() {
  const handleScrollToSection = (id: string) => {
    const element = document.querySelector(id);
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

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center pt-24 pb-16 bg-gradient-to-b from-bakery-cream via-bakery-warm-white/40 to-bakery-cream overflow-hidden"
    >
      {/* Bold Watermark Typography Background */}
      <div className="absolute top-12 left-6 text-[120px] sm:text-[180px] font-serif italic text-bakery-accent/10 opacity-25 -z-10 leading-none select-none pointer-events-none">
        Bakery
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute top-1/4 -left-36 w-72 h-72 rounded-full bg-bakery-accent/10 blur-3xl animate-pulse" />
      <div className="absolute bottom-1/3 -right-36 w-96 h-96 rounded-full bg-bakery-rose/10 blur-3xl" />
      <div className="absolute top-12 right-12 w-2 h-2 rounded-full bg-bakery-accent" />
      <div className="absolute bottom-24 left-1/3 w-3 h-3 rounded-full bg-bakery-rose/40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Text Content */}
          <div className="lg:col-span-6 flex flex-col justify-center text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-bakery-accent/15 text-bakery-brown text-xs sm:text-sm font-bold uppercase tracking-[0.25em] self-center lg:self-start mb-6"
            >
              <Sparkles className="w-3.5 h-3.5 text-bakery-accent" />
              <span>Artisanal Pâtisserie</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-bakery-brown tracking-tight leading-[1.0] lg:leading-[0.95] mb-6"
            >
              Freshly Baked <br />
              <span className="text-bakery-accent font-light italic">Happiness</span> <br className="hidden sm:inline" />Every Day
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-bakery-dark/80 font-light italic leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-8 sm:mb-10"
            >
              Delicious celebration cakes, hand-folded pastries, naturally leavened breads, and signature treats made with rich ingredients and baked fresh daily for your special moments.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-5"
            >
              <button
                id="hero-order-now-btn"
                onClick={() => handleScrollToSection("#menu")}
                className="w-full sm:w-auto px-10 py-4 rounded-full bg-[#4A3728] hover:bg-[#D4AF37] text-[#FAF9F6] font-bold uppercase text-xs tracking-widest shadow-xl transition-all duration-300 hover:scale-[1.03] flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Order Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-view-menu-btn"
                onClick={() => handleScrollToSection("#menu")}
                className="w-full sm:w-auto px-10 py-4 rounded-full border border-[#4A3728] text-[#4A3728] hover:bg-bakery-accent/15 font-bold uppercase text-xs tracking-widest transition-all duration-300 hover:scale-[1.03] flex items-center justify-center gap-2 cursor-pointer"
              >
                <CakeSlice className="w-4 h-4 text-bakery-accent" />
                <span>View Menu</span>
              </button>
            </motion.div>

            {/* Stats / Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="grid grid-cols-3 gap-4 border-t border-[#E5E1D8] pt-8 mt-10 max-w-md mx-auto lg:mx-0"
            >
              <div>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-bakery-brown">100%</div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-bakery-dark/60 mt-0.5">Organic Flour</div>
              </div>
              <div className="border-x border-[#E5E1D8]">
                <div className="font-serif text-2xl sm:text-3xl font-bold text-bakery-brown">Daily</div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-bakery-dark/60 mt-0.5">Freshly Leavened</div>
              </div>
              <div>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-bakery-brown">4.9★</div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-bakery-dark/60 mt-0.5">Over 2k Reviews</div>
              </div>
            </motion.div>
          </div>

          {/* Gorgeous Image Frame */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, rotate: 1 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-xl aspect-[16/10] sm:aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl border-4 border-white"
            >
              <img
                src={heroBanner}
                alt="Artisanal Bakery Display"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-bakery-dark/30 via-transparent to-transparent pointer-events-none" />

              {/* Floating review card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-white/50"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-bakery-accent/30 text-[#4A3728]">
                  ✨
                </div>
                <div>
                  <div className="text-xs font-serif italic text-bakery-dark">
                    "The best croissants in town! Shatteringly crisp, buttery, absolute perfection!"
                  </div>
                  <div className="text-[10px] font-semibold text-bakery-accent uppercase tracking-wider mt-1">
                    — Arthur K., Food Critic
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Floating Badges */}
            <div className="absolute -top-6 right-4 sm:-top-8 sm:right-8 w-28 h-28 sm:w-32 sm:h-32 bg-white rounded-full flex flex-col items-center justify-center shadow-2xl border border-[#E5E1D8] rotate-12 z-20">
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#D4AF37]">Freshly</span>
              <span className="text-2xl sm:text-3xl font-serif font-bold text-[#4A3728] leading-tight">100%</span>
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#D4AF37]">Daily Baked</span>
            </div>

            {/* Backplate decoration */}
            <div className="absolute -z-10 top-6 left-6 right-[-10px] bottom-[-10px] border-2 border-bakery-accent rounded-3xl opacity-30 pointer-events-none max-w-xl ml-auto" />
          </div>
        </div>
      </div>
    </section>
  );
}

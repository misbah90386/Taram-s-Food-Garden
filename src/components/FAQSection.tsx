import React, { useState } from "react";
import { HelpCircle, ChevronDown, Sparkles } from "lucide-react";
import { FAQS } from "../data";
import { motion, AnimatePresence } from "motion/react";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // first open by default

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="py-24 bg-bakery-cream scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-bakery-accent block mb-3">Got Questions?</span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#4A3728] tracking-tight leading-[1.1] mb-6">
            Frequently Asked Questions
          </h2>
          <div className="w-16 h-0.5 bg-bakery-accent mx-auto mb-6" />
          <p className="text-base sm:text-lg text-bakery-dark/80 font-light italic leading-relaxed">
            Have queries regarding allergen cross-contamination, delivery zones, or custom cake consultation timelines? Find clear, helpful answers below.
          </p>
        </div>

        {/* Accordions */}
        <div id="faq-accordions" className="max-w-3xl mx-auto space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.question}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden bg-white ${
                  isOpen
                    ? "border-bakery-accent shadow-md"
                    : "border-bakery-accent/10 hover:border-bakery-accent/30"
                }`}
              >
                {/* Header Toggle bar */}
                <button
                  id={`faq-toggle-btn-${idx}`}
                  onClick={() => handleToggle(idx)}
                  className="w-full flex items-center justify-between p-5 text-left focus:outline-none select-none cursor-pointer"
                >
                  <div className="flex items-center gap-3 pr-4">
                    <HelpCircle className="w-4 h-4 text-bakery-accent shrink-0" />
                    <span className="font-serif font-bold text-sm sm:text-base text-bakery-dark">
                      {faq.question}
                    </span>
                  </div>
                  <div className={`p-1 rounded-full bg-bakery-cream text-bakery-brown transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Answer Sliding Panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="p-5 pt-0 border-t border-bakery-accent/5 text-xs sm:text-sm text-bakery-dark/70 leading-relaxed bg-bakery-warm-white/10">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Still Have Questions CTA */}
        <div className="text-center mt-12 bg-bakery-warm-white/40 p-6 rounded-2xl border border-bakery-accent/10 max-w-xl mx-auto shadow-sm">
          <p className="text-xs text-bakery-dark/70">
            Still have questions about corporate catering menus, custom fondant toppers, or gluten-free cake tasting events?
          </p>
          <a
            id="faq-contact-cta"
            href="#contact"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-bakery-brown hover:text-bakery-accent uppercase tracking-wider mt-3 underline"
          >
            <span>Ask Our Pastry Chef Direct</span>
            <Sparkles className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
}

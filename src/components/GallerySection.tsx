import React, { useState } from "react";
import { Eye, ChevronLeft, ChevronRight, X, Sparkles } from "lucide-react";
import { GALLERY_ITEMS } from "../data";
import { motion, AnimatePresence } from "motion/react";

export default function GallerySection() {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filters = ["All", "Cakes", "Cupcakes", "Pastries", "Bread", "Process", "Gift Boxes"];

  // Normalize categories for mapping
  const getMappedCategory = (cat: string) => {
    if (cat.toLowerCase() === "baking process") return "Process";
    if (cat.toLowerCase() === "gift boxes") return "Gift Boxes";
    return cat;
  };

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (selectedFilter === "All") return true;
    const mapped = getMappedCategory(item.category);
    return mapped.toLowerCase() === selectedFilter.toLowerCase();
  });

  const handleOpenLightbox = (itemTitle: string) => {
    const globalIndex = GALLERY_ITEMS.findIndex((i) => i.title === itemTitle);
    if (globalIndex > -1) {
      setLightboxIndex(globalIndex);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : GALLERY_ITEMS.length - 1));
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev !== null && prev < GALLERY_ITEMS.length - 1 ? prev + 1 : 0));
    }
  };

  return (
    <section id="gallery" className="py-24 bg-bakery-cream scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-bakery-accent block mb-3">Visual Masterpieces</span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#4A3728] tracking-tight leading-[1.1] mb-6">
            Our Sweet Design Gallery
          </h2>
          <div className="w-16 h-0.5 bg-bakery-accent mx-auto mb-6" />
          <p className="text-base sm:text-lg text-bakery-dark/80 font-light italic leading-relaxed">
            A sneak peek behind the scenes and a showcase of our finest handcrafted creation cakes, pastries, custom dessert spreads, and luxury ribbons.
          </p>
        </div>

        {/* Filters bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12 border-b border-[#E5E1D8] pb-6 max-w-3xl mx-auto">
          {filters.map((f) => {
            const active = selectedFilter === f;
            return (
              <button
                key={f}
                id={`gallery-filter-${f.toLowerCase().replace(" ", "-")}`}
                onClick={() => setSelectedFilter(f)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all duration-300 cursor-pointer border ${
                  active
                    ? "bg-[#4A3728] text-[#FAF9F6] border-[#4A3728] shadow-md"
                    : "bg-white hover:bg-bakery-accent/10 text-[#6B5A4E] border-[#E5E1D8]"
                }`}
              >
                {f}
              </button>
            );
          })}
        </div>

        {/* Gallery Bento Grid */}
        <div id="gallery-grid" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.4 }}
                className="group relative aspect-square rounded-2xl overflow-hidden shadow-sm hover:shadow-xl cursor-pointer border border-bakery-accent/10 bg-bakery-beige"
                onClick={() => handleOpenLightbox(item.title)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Dark Hover Mask overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-bakery-dark/80 via-bakery-dark/25 to-transparent opacity-0 group-hover:opacity-100 flex flex-col justify-end p-5 transition-all duration-300">
                  <div className="flex items-center justify-between transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-widest text-bakery-accent bg-white/10 px-2 py-0.5 rounded-full backdrop-blur-sm">
                        {item.category}
                      </span>
                      <h4 className="font-serif font-bold text-sm text-white mt-1.5 leading-snug line-clamp-1">
                        {item.title}
                      </h4>
                    </div>
                    <div className="bg-bakery-accent text-bakery-dark p-2 rounded-full shadow-lg">
                      <Eye className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>

      {/* Lightbox Modal overlay */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Close Button */}
            <button
              id="close-gallery-lightbox"
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-bakery-accent hover:text-bakery-dark transition-colors focus:outline-none cursor-pointer"
              title="Close Gallery Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Main Lightbox Frame */}
            <div className="relative max-w-4xl w-full aspect-[4/3] max-h-[75vh] flex items-center justify-center">
              
              {/* Previous Trigger */}
              <button
                id="lightbox-prev-btn"
                onClick={handlePrev}
                className="absolute left-4 z-10 p-3 rounded-full bg-white/10 text-white hover:bg-bakery-accent hover:text-bakery-dark transition-colors focus:outline-none cursor-pointer"
                title="Previous Image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Live Image */}
              <motion.img
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                src={GALLERY_ITEMS[lightboxIndex].image}
                alt={GALLERY_ITEMS[lightboxIndex].title}
                referrerPolicy="no-referrer"
                className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl border-2 border-white/20"
                onClick={(e) => e.stopPropagation()}
              />

              {/* Next Trigger */}
              <button
                id="lightbox-next-btn"
                onClick={handleNext}
                className="absolute right-4 z-10 p-3 rounded-full bg-white/10 text-white hover:bg-bakery-accent hover:text-bakery-dark transition-colors focus:outline-none cursor-pointer"
                title="Next Image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

            </div>

            {/* Captions Footer */}
            <div className="text-center mt-6 text-white max-w-lg px-4" onClick={(e) => e.stopPropagation()}>
              <span className="text-[10px] font-bold uppercase tracking-widest text-bakery-accent flex items-center justify-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                {GALLERY_ITEMS[lightboxIndex].category}
              </span>
              <h4 className="font-serif font-semibold text-lg sm:text-xl mt-1">
                {GALLERY_ITEMS[lightboxIndex].title}
              </h4>
              <p className="text-xs text-white/50 mt-1 uppercase tracking-widest">
                Image {lightboxIndex + 1} of {GALLERY_ITEMS.length}
              </p>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

import React, { useState, useMemo } from "react";
import { Search, Star, Sparkles, Filter, SlidersHorizontal, ShoppingCart, Info, Eye, X, Check } from "lucide-react";
import { useApp } from "../context/AppContext";
import { MENU_ITEMS } from "../data";
import { MenuItem, Category } from "../types";
import { motion, AnimatePresence } from "motion/react";

export default function MenuSection() {
  const { addToCart } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"popular" | "price-asc" | "price-desc">("popular");
  
  // Modal for customizing/viewing product details
  const [detailItem, setDetailItem] = useState<MenuItem | null>(null);
  const [selectedSize, setSelectedSize] = useState("Regular");
  const [customNotes, setCustomNotes] = useState("");
  const [isSuccessAdded, setIsSuccessAdded] = useState(false);

  const categories: Category[] = [
    "All",
    "Cakes",
    "Cupcakes",
    "Pastries",
    "Cookies & Brownies",
    "Donuts",
    "Cheesecakes",
    "Macarons",
    "Artisan Bread",
    "Dessert Boxes"
  ];

  const dietaryOptions = ["Gluten-Free", "Vegan", "Nut-Free", "Eggless"];

  // Handle dietary filtering toggle
  const handleDietaryToggle = (diet: string) => {
    setSelectedDietary((prev) =>
      prev.includes(diet) ? prev.filter((d) => d !== diet) : [...prev, diet]
    );
  };

  // Filter and sort items
  const filteredItems = useMemo(() => {
    let result = [...MENU_ITEMS];

    // Category filter
    if (selectedCategory !== "All") {
      result = result.filter((item) => item.category === selectedCategory);
    }

    // Search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.tags?.some((t) => t.toLowerCase().includes(query))
      );
    }

    // Dietary filters (must match ALL selected dietary requirements)
    if (selectedDietary.length > 0) {
      result = result.filter((item) =>
        selectedDietary.every((diet) => item.dietary?.includes(diet as any))
      );
    }

    // Sorting
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "popular") {
      result.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
    }

    return result;
  }, [selectedCategory, searchQuery, selectedDietary, sortBy]);

  // Open customization modal
  const handleOpenDetail = (item: MenuItem) => {
    setDetailItem(item);
    setSelectedSize(item.category === "Cakes" ? "8-inch (Feeds 15-20)" : "Regular");
    setCustomNotes("");
    setIsSuccessAdded(false);
  };

  // Handle actual Add to Cart from modal or quick addition
  const handleAddToCartSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!detailItem) return;

    // Calculate dynamic pricing based on size for Cakes
    let finalItem = { ...detailItem };
    if (detailItem.category === "Cakes") {
      if (selectedSize.includes("6-inch")) finalItem.price = detailItem.price - 15;
      else if (selectedSize.includes("10-inch")) finalItem.price = detailItem.price + 35;
      else if (selectedSize.includes("Double-Tier")) finalItem.price = detailItem.price + 110;
      else if (selectedSize.includes("Triple-Tier")) finalItem.price = detailItem.price + 280;
    }

    addToCart(finalItem, 1, selectedSize, customNotes);
    setIsSuccessAdded(true);
    
    // Auto-close modal after brief success window
    setTimeout(() => {
      setDetailItem(null);
      setIsSuccessAdded(false);
    }, 1200);
  };

  const handleQuickAdd = (item: MenuItem) => {
    addToCart(item, 1, "Regular", "");
    // Display quick visual alert if desired or let AppContext handle slide-out cart
  };

  return (
    <section id="menu" className="py-24 bg-bakery-cream relative scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-bakery-accent block mb-3">Our Menu</span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#4A3728] tracking-tight leading-[1.1] mb-6">
            Browse Our Freshly Baked Treasures
          </h2>
          <div className="w-16 h-0.5 bg-bakery-accent mx-auto mb-6" />
          <p className="text-base sm:text-lg text-bakery-dark/80 font-light italic leading-relaxed">
            Handcrafted with organic grains, AOP butter, and locally sourced fruits. Order online for delivery within a 20-mile radius, or pick up fresh from our ovens.
          </p>
        </div>

        {/* Toolbar: Search, Filters, Sorting */}
        <div className="bg-bakery-warm-white/40 p-6 rounded-3xl border border-bakery-accent/10 mb-10 shadow-sm flex flex-col gap-6">
          
          {/* Row 1: Search and Sort */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Search Input */}
            <div className="relative md:col-span-7">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-bakery-accent pointer-events-none">
                <Search className="w-5 h-5" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search cakes, cookies, croissants, artisan breads..."
                className="w-full pl-11 pr-4 py-3.5 rounded-full bg-white border border-bakery-accent/20 focus:border-bakery-accent focus:ring-2 focus:ring-bakery-accent/10 placeholder-bakery-dark/40 text-sm text-bakery-dark focus:outline-none transition-all shadow-sm"
              />
            </div>

            {/* Sort Select */}
            <div className="relative md:col-span-5 flex items-center justify-end gap-3 w-full">
              <span className="text-xs font-semibold uppercase tracking-wider text-bakery-dark/60 flex items-center gap-1">
                <SlidersHorizontal className="w-3.5 h-3.5 text-bakery-accent" /> Sort By:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white border border-bakery-accent/20 rounded-full px-4 py-3 text-sm font-medium text-bakery-dark focus:outline-none focus:ring-2 focus:ring-bakery-accent/15 cursor-pointer shadow-sm"
              >
                <option value="popular">Recommended</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Row 2: Dietary Filters */}
          <div className="flex flex-wrap items-center gap-3 border-t border-bakery-accent/10 pt-4">
            <span className="text-xs font-bold uppercase tracking-wider text-bakery-dark/60 flex items-center gap-1 mr-2">
              <Filter className="w-3.5 h-3.5 text-bakery-accent" /> Dietary Focus:
            </span>
            {dietaryOptions.map((diet) => {
              const active = selectedDietary.includes(diet);
              return (
                <button
                  key={diet}
                  id={`dietary-filter-${diet.toLowerCase().replace(" ", "-")}`}
                  onClick={() => handleDietaryToggle(diet)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                    active
                      ? "bg-bakery-brown text-white shadow-sm"
                      : "bg-white hover:bg-bakery-beige text-bakery-dark/80 border border-bakery-accent/15"
                  }`}
                >
                  {diet}
                </button>
              );
            })}
            {selectedDietary.length > 0 && (
              <button
                id="clear-dietary-filters"
                onClick={() => setSelectedDietary([])}
                className="text-xs font-semibold text-bakery-accent hover:text-bakery-brown underline cursor-pointer ml-auto"
              >
                Clear all
              </button>
            )}
          </div>
        </div>

        {/* Categories Tab Bar */}
        <div className="mb-10 overflow-x-auto no-scrollbar flex pb-3 border-b border-[#E5E1D8]">
          <div className="flex gap-2 sm:gap-3 mx-auto">
            {categories.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  id={`category-tab-${category.toLowerCase().replace("& ", "").replace(" ", "-")}`}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all duration-300 cursor-pointer border ${
                    active
                      ? "bg-[#4A3728] text-[#FAF9F6] border-[#4A3728] shadow-md"
                      : "bg-white hover:bg-bakery-accent/10 text-[#6B5A4E] border-[#E5E1D8]"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Products Grid */}
        <div id="products-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300 border border-bakery-accent/10 flex flex-col justify-between"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-bakery-beige">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Floating tags */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start pointer-events-none">
                    {item.isPopular && (
                      <span className="bg-bakery-rose text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-sm">
                        <Sparkles className="w-2.5 h-2.5" /> Best Seller
                      </span>
                    )}
                    {item.tags?.map((tag) => (
                      <span key={tag} className="bg-bakery-brown/95 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Dietary Badge */}
                  {item.dietary && item.dietary.length > 0 && (
                    <div className="absolute top-3 right-3 flex gap-1 pointer-events-none">
                      {item.dietary.map((diet) => (
                        <span
                          key={diet}
                          className="bg-emerald-500/90 text-white text-[9px] font-bold px-2 py-0.5 rounded shadow-sm"
                          title={diet}
                        >
                          {diet.substring(0, 2).toUpperCase()}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Rating Overlay */}
                  <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-semibold text-bakery-brown flex items-center gap-1 shadow-sm border border-white/50">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{item.rating.toFixed(1)}</span>
                  </div>

                  {/* Quick Action Eye Hover Button */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                    <button
                      id={`view-details-${item.id}`}
                      onClick={() => handleOpenDetail(item)}
                      className="bg-white/95 text-bakery-brown hover:bg-bakery-accent hover:text-white p-3.5 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 font-semibold text-xs flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-white cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Customize & Order</span>
                    </button>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-bakery-accent block mb-1">
                      {item.category}
                    </span>
                    <h3 className="font-serif font-bold text-base text-bakery-dark group-hover:text-bakery-accent transition-colors duration-200 line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="text-xs text-bakery-dark/65 mt-2 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Footer Price & Add Button */}
                  <div className="flex items-center justify-between border-t border-bakery-accent/10 pt-4 mt-4">
                    <span className="font-serif text-lg font-bold text-bakery-brown">
                      ${item.price.toFixed(2)}
                    </span>
                    
                    {item.category === "Cakes" ? (
                      <button
                        id={`add-to-cart-btn-${item.id}`}
                        onClick={() => handleOpenDetail(item)}
                        className="text-xs font-bold text-bakery-accent hover:text-bakery-brown flex items-center gap-1 py-1.5 px-3 rounded-full hover:bg-bakery-accent/10 transition-colors cursor-pointer"
                      >
                        <span>Choose Size</span>
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        id={`add-to-cart-btn-${item.id}`}
                        onClick={() => handleQuickAdd(item)}
                        className="bg-bakery-warm-white hover:bg-bakery-brown text-bakery-brown hover:text-white px-3.5 py-2 rounded-full text-xs font-bold transition-all duration-300 flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-bakery-accent cursor-pointer"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>Add to Cart</span>
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Empty state */}
          {filteredItems.length === 0 && (
            <div className="col-span-full py-16 text-center">
              <div className="text-4xl mb-4">🧁</div>
              <h3 className="font-serif text-lg font-bold text-bakery-dark">No sweet treats found</h3>
              <p className="text-sm text-bakery-dark/60 mt-1 max-w-sm mx-auto">
                We couldn't find any items matching your selected tags or keywords. Try checking a different category!
              </p>
              <button
                id="reset-filters-btn"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                  setSelectedDietary([]);
                }}
                className="mt-5 px-5 py-2 rounded-full border border-bakery-accent text-bakery-brown hover:bg-bakery-accent/10 text-xs font-bold transition-colors cursor-pointer"
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Item Customization / Lightbox Modal */}
      <AnimatePresence>
        {detailItem && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
              onClick={() => setDetailItem(null)}
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed inset-y-auto left-0 right-0 max-w-2xl mx-auto bg-bakery-cream z-50 rounded-3xl overflow-hidden shadow-2xl border border-bakery-accent/20 p-0 overflow-y-auto max-h-[90vh] md:max-h-none"
            >
              <button
                id="close-customization-modal"
                onClick={() => setDetailItem(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/40 text-white hover:bg-bakery-brown transition-colors focus:outline-none cursor-pointer"
                title="Close Modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12">
                {/* Media left */}
                <div className="md:col-span-5 h-52 md:h-auto relative bg-bakery-beige">
                  <img
                    src={detailItem.image}
                    alt={detailItem.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent md:hidden" />
                </div>

                {/* Configurations right */}
                <form onSubmit={handleAddToCartSubmit} className="md:col-span-7 p-6 md:p-8 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-bakery-accent">
                      {detailItem.category}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-bakery-dark mt-1">
                      {detailItem.name}
                    </h3>

                    <p className="text-xs text-bakery-dark/70 leading-relaxed mt-3">
                      {detailItem.description}
                    </p>

                    {/* Dietary warnings if any */}
                    {detailItem.dietary && detailItem.dietary.length > 0 && (
                      <div className="flex gap-1.5 mt-3 flex-wrap">
                        {detailItem.dietary.map((diet) => (
                          <span key={diet} className="bg-emerald-50 text-emerald-800 border border-emerald-100 text-[10px] font-semibold px-2 py-0.5 rounded">
                            {diet}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="border-t border-bakery-accent/10 my-5 pt-4">
                      {/* Configuration: Size Select for Cakes */}
                      {detailItem.category === "Cakes" ? (
                        <div className="mb-4">
                          <label className="block text-xs font-bold uppercase tracking-wider text-bakery-brown mb-2">
                            Select Cake Size & Servings:
                          </label>
                          <select
                            value={selectedSize}
                            onChange={(e) => setSelectedSize(e.target.value)}
                            className="w-full bg-white border border-bakery-accent/20 rounded-xl px-3 py-2.5 text-sm text-bakery-dark focus:outline-none focus:ring-2 focus:ring-bakery-accent/15 cursor-pointer"
                          >
                            <option value="6-inch (Feeds 8-10) [- $15.00]">6-inch (Feeds 8-10) [Subtract $15.00]</option>
                            <option value="8-inch (Feeds 15-20)">8-inch (Feeds 15-20) [Standard Price]</option>
                            <option value="10-inch (Feeds 25-30) [+ $35.00]">10-inch (Feeds 25-30) [Add $35.00]</option>
                            <option value='Double-Tier (6" + 8" - Feeds 35-40) [+ $110.00]'>Double-Tier (6" + 8" - Feeds 35-40) [Add $110.00]</option>
                            <option value='Triple-Tier (6" + 8" + 10" - Feeds 70-80) [+ $280.00]'>Triple-Tier (6" + 8" + 10" - Feeds 70-80) [Add $280.00]</option>
                          </select>
                        </div>
                      ) : (
                        <div className="mb-4">
                          <label className="block text-xs font-bold uppercase tracking-wider text-bakery-brown mb-1.5">
                            Serving Size:
                          </label>
                          <div className="text-sm font-semibold text-bakery-dark">
                            Standard Gourmet Bundle / Unit
                          </div>
                        </div>
                      )}

                      {/* Custom note e.g. lettering */}
                      <div className="mb-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-bakery-brown mb-2">
                          Special Instructions or Lettering (Optional):
                        </label>
                        <textarea
                          rows={2}
                          value={customNotes}
                          onChange={(e) => setCustomNotes(e.target.value)}
                          placeholder="e.g., Please write 'Happy 30th Birthday Leo!' in gold cursive on the top plaque."
                          className="w-full p-3 text-xs bg-white border border-bakery-accent/20 rounded-xl focus:border-bakery-accent focus:ring-1 focus:ring-bakery-accent/10 focus:outline-none placeholder-bakery-dark/30 text-bakery-dark"
                          maxLength={120}
                        />
                        <span className="text-[10px] text-bakery-dark/40 flex justify-end">
                          {customNotes.length}/120 characters
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Submission Row */}
                  <div className="flex items-center gap-4 border-t border-bakery-accent/10 pt-4 mt-4">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-bakery-dark/50 uppercase">Total Estimate:</span>
                      <span className="font-serif text-2xl font-bold text-bakery-brown">
                        ${(() => {
                          let base = detailItem.price;
                          if (detailItem.category === "Cakes") {
                            if (selectedSize.includes("6-inch")) base -= 15;
                            else if (selectedSize.includes("10-inch")) base += 35;
                            else if (selectedSize.includes("Double-Tier")) base += 110;
                            else if (selectedSize.includes("Triple-Tier")) base += 280;
                          }
                          return base.toFixed(2);
                        })()}
                      </span>
                    </div>

                    <button
                      id="submit-customization-btn"
                      type="submit"
                      disabled={isSuccessAdded}
                      className={`flex-grow py-3.5 rounded-full font-bold text-sm shadow-md transition-all duration-300 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-bakery-accent cursor-pointer ${
                        isSuccessAdded
                          ? "bg-emerald-500 text-white"
                          : "bg-bakery-brown hover:bg-bakery-accent text-white hover:text-bakery-dark"
                      }`}
                    >
                      {isSuccessAdded ? (
                        <>
                          <Check className="w-5 h-5" />
                          <span>Added to Cart!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4" />
                          <span>Add to Basket</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}

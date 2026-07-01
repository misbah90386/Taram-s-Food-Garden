import React, { useState, useMemo } from "react";
import { CakeSlice, Sparkles, Calendar, Check, Landmark, MessageSquareText, FileText, ArrowRight } from "lucide-react";
import { useApp } from "../context/AppContext";
import { CAKE_OPTIONS } from "../data";
import { CustomCakeInquiry } from "../types";
import { motion, AnimatePresence } from "motion/react";

export default function CustomCakes() {
  const { submitInquiry } = useApp();

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [occasion, setOccasion] = useState(CAKE_OPTIONS.occasions[0]);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0); // standard 6-inch feeds 8-10
  const [selectedLayerIndex, setSelectedLayerIndex] = useState(0); // standard double layer
  const [selectedFlavorIndex, setSelectedFlavorIndex] = useState(0); // vanilla
  const [selectedFillingIndex, setSelectedFillingIndex] = useState(0); // strawberry
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState<"Pickup" | "Delivery">("Pickup");
  const [description, setDescription] = useState("");

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedReceipt, setSubmittedReceipt] = useState<CustomCakeInquiry | null>(null);

  // Derive selected objects
  const sizeObj = CAKE_OPTIONS.sizes[selectedSizeIndex];
  const layerObj = CAKE_OPTIONS.layers[selectedLayerIndex];
  const flavorObj = CAKE_OPTIONS.flavors[selectedFlavorIndex];
  const fillingObj = CAKE_OPTIONS.fillings[selectedFillingIndex];

  // Real-time price calculation logic
  const calculatedPrice = useMemo(() => {
    const base = sizeObj.basePrice;
    const flavorFactor = flavorObj.priceFactor;
    const fillingFactor = fillingObj.priceFactor;
    const layerMultiplier = layerObj.multiplier;

    // formula: (Base * layerMultiplier) * flavorFactor * fillingFactor
    return Math.round((base * layerMultiplier) * flavorFactor * fillingFactor);
  }, [sizeObj, layerObj, flavorObj, fillingObj]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const inquiry: CustomCakeInquiry = {
      name,
      email,
      phone,
      occasion,
      size: sizeObj.name,
      layers: layerObj.name,
      flavor: flavorObj.name,
      filling: fillingObj.name,
      deliveryDate,
      servingCount: sizeObj.servings,
      description,
      deliveryMethod,
      status: "pending"
    };

    submitInquiry(inquiry);
    setSubmittedReceipt(inquiry);
    setIsSubmitted(true);

    // Reset Form
    setName("");
    setEmail("");
    setPhone("");
    setDescription("");
    setDeliveryDate("");
  };

  const occasionsList = [
    { name: "Birthdays", icon: "🎂", desc: "Playful designs, colorful buttercream & sparklers." },
    { name: "Weddings", icon: "👰", desc: "Luxury tiered cakes, real orchid cascades & gold leaf." },
    { name: "Baby Showers", icon: "🍼", desc: "Pastel themes, fluffy custom cloud toppers." },
    { name: "Anniversaries", icon: "💍", desc: "Sophisticated textured metallics & delicate macarons." },
    { name: "Graduations", icon: "🎓", desc: "Custom emblems, personalized diplomas & rich themes." },
    { name: "Milestones", icon: "✨", desc: "Bespoke conceptual styles for high-end celebrations." }
  ];

  return (
    <section id="custom-cakes" className="py-24 bg-bakery-warm-white/40 border-y border-bakery-accent/15 scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-bakery-accent block mb-3">Bespoke Design Studio</span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#4A3728] tracking-tight leading-[1.1] mb-6">
            Request Your Dream Custom Cake
          </h2>
          <div className="w-16 h-0.5 bg-bakery-accent mx-auto mb-6" />
          <p className="text-base sm:text-lg text-bakery-dark/80 font-light italic leading-relaxed">
            From luxury wedding pillars dressed with real orchids to playful buttercream birthday themes. Tell us your vision, configure your favorite flavor palettes, and get an instant quote.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Custom Cake Highlights & Occasions */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-bakery-accent/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-bakery-accent/5 rounded-full blur-xl pointer-events-none" />
              <h3 className="font-serif text-xl font-bold text-bakery-brown mb-6 flex items-center gap-2">
                <CakeSlice className="w-5 h-5 text-bakery-accent animate-pulse" />
                Celebrations We Tailor
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {occasionsList.map((oc) => (
                  <div key={oc.name} className="group p-4 bg-bakery-cream/30 hover:bg-bakery-cream rounded-2xl border border-bakery-accent/5 hover:border-bakery-accent/20 transition-all">
                    <span className="text-2xl mb-2 block group-hover:scale-110 transition-transform">{oc.icon}</span>
                    <h4 className="font-bold text-xs text-bakery-dark">{oc.name}</h4>
                    <p className="text-[10px] text-bakery-dark/60 mt-1 leading-normal">{oc.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quality commitment card */}
            <div className="bg-bakery-brown text-white p-8 rounded-3xl shadow-sm border border-white/10 relative overflow-hidden">
              <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-white/5 rounded-full pointer-events-none" />
              <h3 className="font-serif text-lg font-semibold mb-3 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-bakery-accent" />
                The Custom Guarantee
              </h3>
              <p className="text-xs text-white/80 leading-relaxed mb-4">
                All custom toppers, sugar floral petals, and textured details are carefully molded and piped by hand in our studio. We require a 10-day notice for custom cakes to secure sourcing of fresh floral arrangements and artisan elements.
              </p>
              <div className="flex gap-4 border-t border-white/10 pt-4 text-[10px] font-bold text-bakery-accent uppercase tracking-wider">
                <span>✓ 10-Day Notice</span>
                <span>✓ Vegan & GF options</span>
                <span>✓ Delivery Handled Safe</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Constructor Form / Receipt Screen */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="cake-form"
                  initial={{ opacity: 0, x: 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -25 }}
                  className="bg-white p-8 rounded-3xl shadow-sm border border-bakery-accent/10"
                >
                  <h3 className="font-serif text-xl font-bold text-bakery-dark mb-6 border-b border-bakery-accent/15 pb-4">
                    Visual Cake Constructor & Inquiry
                  </h3>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Customer Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-bakery-brown uppercase mb-2">Your Name *</label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Elizabeth Bennett"
                          className="w-full bg-bakery-cream/30 border border-bakery-accent/20 rounded-xl px-4 py-2.5 text-sm text-bakery-dark focus:outline-none focus:ring-2 focus:ring-bakery-accent/10 placeholder-bakery-dark/30"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-bakery-brown uppercase mb-2">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="elizabeth@domain.com"
                          className="w-full bg-bakery-cream/30 border border-bakery-accent/20 rounded-xl px-4 py-2.5 text-sm text-bakery-dark focus:outline-none focus:ring-2 focus:ring-bakery-accent/10 placeholder-bakery-dark/30"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-bakery-brown uppercase mb-2">Phone Number *</label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+1 (555) 019-2834"
                          className="w-full bg-bakery-cream/30 border border-bakery-accent/20 rounded-xl px-4 py-2.5 text-sm text-bakery-dark focus:outline-none focus:ring-2 focus:ring-bakery-accent/10 placeholder-bakery-dark/30"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-bakery-brown uppercase mb-2">Occasion *</label>
                        <select
                          value={occasion}
                          onChange={(e) => setOccasion(e.target.value)}
                          className="w-full bg-bakery-cream/30 border border-bakery-accent/20 rounded-xl px-4 py-3 text-sm text-bakery-dark focus:outline-none focus:ring-2 focus:ring-bakery-accent/10 cursor-pointer"
                        >
                          {CAKE_OPTIONS.occasions.map((o) => (
                            <option key={o} value={o}>{o}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Cake Options: Sizing, Layers, Flavor, Fillings */}
                    <div className="border-t border-dashed border-bakery-accent/20 pt-6 space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Size Selection */}
                        <div>
                          <label className="block text-xs font-bold text-bakery-brown uppercase mb-2">
                            Base Tier Size * <span className="text-[10px] text-bakery-dark/50">(Base Price)</span>
                          </label>
                          <select
                            value={selectedSizeIndex}
                            onChange={(e) => setSelectedSizeIndex(Number(e.target.value))}
                            className="w-full bg-bakery-cream/30 border border-bakery-accent/20 rounded-xl px-4 py-3 text-sm text-bakery-dark focus:outline-none focus:ring-2 focus:ring-bakery-accent/10 cursor-pointer"
                          >
                            {CAKE_OPTIONS.sizes.map((s, index) => (
                              <option key={s.name} value={index}>
                                {s.name} - ${s.basePrice.toFixed(0)}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Layers Selection */}
                        <div>
                          <label className="block text-xs font-bold text-bakery-brown uppercase mb-2">
                            Tier Layers * <span className="text-[10px] text-bakery-dark/50">(Multiplier)</span>
                          </label>
                          <select
                            value={selectedLayerIndex}
                            onChange={(e) => setSelectedLayerIndex(Number(e.target.value))}
                            className="w-full bg-bakery-cream/30 border border-bakery-accent/20 rounded-xl px-4 py-3 text-sm text-bakery-dark focus:outline-none focus:ring-2 focus:ring-bakery-accent/10 cursor-pointer"
                          >
                            {CAKE_OPTIONS.layers.map((l, index) => (
                              <option key={l.name} value={index}>
                                {l.name} (x{l.multiplier})
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Flavor Selection */}
                        <div>
                          <label className="block text-xs font-bold text-bakery-brown uppercase mb-2">
                            Sponge Flavor Profile *
                          </label>
                          <select
                            value={selectedFlavorIndex}
                            onChange={(e) => setSelectedFlavorIndex(Number(e.target.value))}
                            className="w-full bg-bakery-cream/30 border border-bakery-accent/20 rounded-xl px-4 py-3 text-sm text-bakery-dark focus:outline-none focus:ring-2 focus:ring-bakery-accent/10 cursor-pointer"
                          >
                            {CAKE_OPTIONS.flavors.map((f, index) => (
                              <option key={f.name} value={index}>
                                {f.name} ({f.priceFactor > 1 ? `+${Math.round((f.priceFactor - 1) * 100)}%` : "Standard"})
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Fillings Selection */}
                        <div>
                          <label className="block text-xs font-bold text-bakery-brown uppercase mb-2">
                            Gourmet Filling *
                          </label>
                          <select
                            value={selectedFillingIndex}
                            onChange={(e) => setSelectedFillingIndex(Number(e.target.value))}
                            className="w-full bg-bakery-cream/30 border border-bakery-accent/20 rounded-xl px-4 py-3 text-sm text-bakery-dark focus:outline-none focus:ring-2 focus:ring-bakery-accent/10 cursor-pointer"
                          >
                            {CAKE_OPTIONS.fillings.map((f, index) => (
                              <option key={f.name} value={index}>
                                {f.name} ({f.priceFactor > 1 ? `+${Math.round((f.priceFactor - 1) * 100)}%` : "Standard"})
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Logistics */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-dashed border-bakery-accent/20 pt-6">
                      <div>
                        <label className="block text-xs font-bold text-bakery-brown uppercase mb-2">
                          Requested Delivery Date *
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            required
                            value={deliveryDate}
                            onChange={(e) => setDeliveryDate(e.target.value)}
                            className="w-full bg-bakery-cream/30 border border-bakery-accent/20 rounded-xl px-4 py-2.5 text-sm text-bakery-dark focus:outline-none focus:ring-2 focus:ring-bakery-accent/10 placeholder-bakery-dark/30 cursor-pointer"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-bakery-brown uppercase mb-2">Logistics Method *</label>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => setDeliveryMethod("Pickup")}
                            className={`py-2.5 rounded-xl text-xs font-bold border transition-all ${
                              deliveryMethod === "Pickup"
                                ? "bg-bakery-brown text-white border-bakery-brown shadow-sm"
                                : "bg-white text-bakery-dark border-bakery-accent/20"
                            }`}
                          >
                            In-Store Pickup
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeliveryMethod("Delivery")}
                            className={`py-2.5 rounded-xl text-xs font-bold border transition-all ${
                              deliveryMethod === "Delivery"
                                ? "bg-bakery-brown text-white border-bakery-brown shadow-sm"
                                : "bg-white text-bakery-dark border-bakery-accent/20"
                            }`}
                          >
                            Home Delivery
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Custom Design Notes */}
                    <div>
                      <label className="block text-xs font-bold text-bakery-brown uppercase mb-2">
                        Bespoke Design details & Color Palette (Optional)
                      </label>
                      <textarea
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="e.g. Please design with peach and sage buttercream textures, adorned with real fresh eucalyptus leaves and a wooden cursive topper saying 'Sweet 16'."
                        className="w-full p-4 text-xs bg-bakery-cream/30 border border-bakery-accent/20 rounded-xl focus:border-bakery-accent focus:ring-2 focus:ring-bakery-accent/10 focus:outline-none placeholder-bakery-dark/30 text-bakery-dark"
                      />
                    </div>

                    {/* Live Calculator Quote and CTA */}
                    <div className="bg-bakery-cream/60 p-5 rounded-2xl border border-bakery-accent/15 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div>
                        <span className="text-[10px] font-bold text-bakery-dark/50 uppercase block">Estimated Inquiry Quote:</span>
                        <span className="text-3xl font-serif font-bold text-bakery-brown">
                          ${calculatedPrice.toFixed(2)}
                        </span>
                        <span className="text-[10px] block text-bakery-dark/40 mt-0.5">
                          Feeds ~{sizeObj.servings} guests (${Math.round(calculatedPrice / sizeObj.servings)}/slice)
                        </span>
                      </div>

                      <button
                        id="submit-cake-request-btn"
                        type="submit"
                        className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#4A3728] hover:bg-[#D4AF37] text-white hover:text-bakery-dark font-bold text-xs uppercase tracking-widest shadow-xl transition-all duration-300 flex items-center justify-center gap-1.5 hover:scale-105 cursor-pointer"
                      >
                        <span>Request Custom Cake</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="receipt"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-[#FBF9F4] p-8 rounded-3xl shadow-xl border-2 border-bakery-accent/30 relative text-bakery-dark"
                >
                  {/* Decorative vintage border on receipt */}
                  <div className="absolute top-0 inset-x-0 h-2 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-bakery-accent via-bakery-accent/40 to-transparent opacity-40" />

                  <div className="text-center pb-6 border-b border-dashed border-bakery-accent/30">
                    <span className="text-3xl">📝</span>
                    <h3 className="font-serif text-2xl font-bold text-bakery-brown mt-2">
                      Inquiry Received!
                    </h3>
                    <p className="text-xs text-bakery-dark/60 mt-1 uppercase tracking-wider font-semibold">
                      Taram's Custom Cake Studio
                    </p>
                  </div>

                  <div className="py-6 space-y-4 text-xs">
                    <p className="text-center font-medium italic mb-4">
                      Thank you, <span className="font-bold">{submittedReceipt?.name}</span>! Our head pastry decorator will review your custom inquiry within 24 hours. A receipt of your configuration details has been logged:
                    </p>

                    <div className="bg-white p-4 rounded-xl border border-bakery-accent/10 space-y-3">
                      <div className="flex justify-between border-b border-bakery-accent/5 pb-2">
                        <span className="font-semibold text-bakery-dark/60">OCCASION</span>
                        <span className="font-bold text-bakery-brown uppercase">{submittedReceipt?.occasion}</span>
                      </div>
                      <div className="flex justify-between border-b border-bakery-accent/5 pb-2">
                        <span className="font-semibold text-bakery-dark/60">TIER DIMENSION</span>
                        <span className="font-bold text-bakery-dark">{submittedReceipt?.size}</span>
                      </div>
                      <div className="flex justify-between border-b border-bakery-accent/5 pb-2">
                        <span className="font-semibold text-bakery-dark/60">TIER LAYERS</span>
                        <span className="font-bold text-bakery-dark">{submittedReceipt?.layers}</span>
                      </div>
                      <div className="flex justify-between border-b border-bakery-accent/5 pb-2">
                        <span className="font-semibold text-bakery-dark/60">SPONGE FLAVOR</span>
                        <span className="font-bold text-bakery-dark">{submittedReceipt?.flavor}</span>
                      </div>
                      <div className="flex justify-between border-b border-bakery-accent/5 pb-2">
                        <span className="font-semibold text-bakery-dark/60">FILLING FLAVOR</span>
                        <span className="font-bold text-bakery-dark">{submittedReceipt?.filling}</span>
                      </div>
                      <div className="flex justify-between border-b border-bakery-accent/5 pb-2">
                        <span className="font-semibold text-bakery-dark/60">DATE & METHOD</span>
                        <span className="font-bold text-bakery-dark">
                          {submittedReceipt?.deliveryDate} ({submittedReceipt?.deliveryMethod})
                        </span>
                      </div>
                      {submittedReceipt?.description && (
                        <div className="pt-2">
                          <span className="font-semibold text-bakery-dark/60 block mb-1">DESIGN BRIEF:</span>
                          <p className="italic text-bakery-dark/80 bg-bakery-cream/55 p-3 rounded-lg border border-bakery-accent/5">
                            "{submittedReceipt.description}"
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between border-t border-dashed border-bakery-accent/30 pt-6">
                      <div>
                        <span className="font-bold text-[10px] text-bakery-dark/50 block">ESTIMATED TOTAL:</span>
                        <span className="text-2xl font-serif font-bold text-bakery-brown">${calculatedPrice.toFixed(2)}</span>
                      </div>
                      <div className="text-[10px] text-right text-emerald-600 font-bold uppercase tracking-wider bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100 flex items-center gap-1">
                        <Check className="w-3 h-3" /> Queue Pending Review
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-dashed border-bakery-accent/30 pt-6 flex flex-col sm:flex-row gap-3">
                    <button
                      id="reset-cake-constructor-btn"
                      onClick={() => setIsSubmitted(false)}
                      className="w-full text-center py-3 rounded-xl border border-bakery-accent/40 hover:bg-bakery-beige text-xs font-bold text-bakery-brown transition-colors cursor-pointer"
                    >
                      Configure Another Cake
                    </button>
                    <a
                      id="receipt-whatsapp-inquire-btn"
                      href={`https://wa.me/+1234567890?text=${encodeURIComponent(
                        `Hi, I just submitted a custom cake inquiry on your website under the name ${submittedReceipt?.name} for a ${submittedReceipt?.size} ${submittedReceipt?.flavor} cake. Can we discuss design options?`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full text-center py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <MessageSquareText className="w-4 h-4" />
                      <span>Discuss on WhatsApp</span>
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}

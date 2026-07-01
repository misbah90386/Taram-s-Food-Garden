import React, { useState, useMemo } from "react";
import { Star, MessageSquarePlus, Quote, CheckCircle2, User, Sparkles } from "lucide-react";
import { useApp } from "../context/AppContext";
import { motion, AnimatePresence } from "motion/react";

export default function TestimonialsSection() {
  const { reviews, addReview } = useApp();
  const [activeSlide, setActiveSlide] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Form states
  const [formName, setFormName] = useState("");
  const [formRating, setFormRating] = useState(5);
  const [formText, setFormText] = useState("");
  const [formTag, setFormTag] = useState("Birthday Client");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Star breakdown calculations
  const stats = useMemo(() => {
    const total = reviews.length;
    const average = reviews.reduce((sum, r) => sum + r.rating, 0) / total;
    
    const starsCount = [0, 0, 0, 0, 0]; // 1, 2, 3, 4, 5 stars
    reviews.forEach((r) => {
      const idx = Math.floor(r.rating) - 1;
      if (idx >= 0 && idx < 5) {
        starsCount[idx]++;
      }
    });

    return { total, average, starsCount };
  }, [reviews]);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formText) return;

    addReview(formName, formRating, formText, formTag);
    setSubmitSuccess(true);
    setFormName("");
    setFormText("");
    setFormRating(5);
    
    // Reset success window and close form
    setTimeout(() => {
      setSubmitSuccess(false);
      setShowReviewForm(false);
    }, 1200);
  };

  const nextSlide = () => {
    setActiveSlide((prev) => (prev < reviews.length - 1 ? prev + 1 : 0));
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev > 0 ? prev - 1 : reviews.length - 1));
  };

  return (
    <section id="testimonials" className="py-24 bg-bakery-warm-white/40 border-t border-bakery-accent/10 scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-bakery-accent block mb-3">Our Community</span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#4A3728] tracking-tight leading-[1.1] mb-6">
            Loved By Cake & Pastry Lovers
          </h2>
          <div className="w-16 h-0.5 bg-bakery-accent mx-auto mb-6" />
          <p className="text-base sm:text-lg text-bakery-dark/80 font-light italic leading-relaxed">
            Read authentic reviews from wedding organizers, weekly sourdough bread buyers, and custom birthday party hosts. We strive for perfection in every bite.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Star Stats Dashboard */}
          <div className="lg:col-span-4 bg-white p-6 sm:p-8 rounded-3xl border border-bakery-accent/10 shadow-sm">
            <h3 className="font-serif text-lg font-bold text-bakery-brown mb-4 flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-bakery-accent" /> Rating Breakdown
            </h3>

            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-5xl font-serif font-extrabold text-bakery-brown">
                {stats.average.toFixed(1)}
              </span>
              <span className="text-sm text-bakery-dark/50">out of 5</span>
            </div>

            <div className="flex items-center gap-1 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${
                    star <= Math.round(stats.average)
                      ? "fill-amber-400 text-amber-400"
                      : "text-gray-200"
                  }`}
                />
              ))}
              <span className="text-xs font-semibold text-bakery-dark/60 ml-2">
                ({stats.total} total reviews)
              </span>
            </div>

            {/* Progress Bars */}
            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((starRating) => {
                const count = stats.starsCount[starRating - 1];
                const percentage = stats.total > 0 ? (count / stats.total) * 100 : 0;
                return (
                  <div key={starRating} className="flex items-center gap-3 text-xs text-bakery-dark/60">
                    <span className="w-10 font-bold text-right">{starRating} Stars</span>
                    <div className="flex-grow h-2 bg-bakery-cream rounded-full overflow-hidden border border-bakery-accent/5">
                      <div
                        className="h-full bg-bakery-accent"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="w-6 text-right font-medium">{count}</span>
                  </div>
                );
              })}
            </div>

            {/* Write a Review trigger */}
            <button
              id="write-review-trigger-btn"
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="w-full mt-8 py-3 rounded-full border border-bakery-accent hover:bg-bakery-accent hover:text-bakery-dark text-xs font-bold text-bakery-brown tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Share Your Review</span>
            </button>
          </div>

          {/* Right Column: Interactive Review Slider / Review Submission Form */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {!showReviewForm ? (
                /* Testimonial slider */
                <motion.div
                  key="slider"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="bg-white p-8 sm:p-12 rounded-3xl border border-bakery-accent/10 shadow-sm relative min-h-[300px] flex flex-col justify-between"
                >
                  <Quote className="absolute top-8 right-8 w-16 h-16 text-bakery-accent/10 pointer-events-none" />

                  {/* Active Slide Review content */}
                  <div>
                    <div className="flex items-center gap-1.5 mb-5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.round(reviews[activeSlide].rating)
                              ? "fill-amber-400 text-amber-400"
                              : "text-gray-200"
                          }`}
                        />
                      ))}
                      <span className="bg-bakery-cream px-2.5 py-0.5 rounded-full text-[10px] font-semibold text-bakery-accent uppercase tracking-wider ml-2">
                        {reviews[activeSlide].tag}
                      </span>
                    </div>

                    <p className="font-serif italic text-base sm:text-lg text-bakery-dark/85 leading-relaxed">
                      "{reviews[activeSlide].text}"
                    </p>
                  </div>

                  {/* Author Meta & Controls */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t border-bakery-accent/10 pt-6 mt-8">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-serif font-bold text-base shadow-sm shrink-0 ${reviews[activeSlide].avatarColor}`}>
                        {reviews[activeSlide].name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-bakery-brown">{reviews[activeSlide].name}</h4>
                        <p className="text-[10px] text-bakery-dark/50 font-medium">Reviewed on {reviews[activeSlide].date}</p>
                      </div>
                    </div>

                    {/* Simple Dot Navigator Controls */}
                    <div className="flex items-center gap-3">
                      <button
                        id="testimonial-prev-btn"
                        onClick={prevSlide}
                        className="p-1.5 rounded-full hover:bg-bakery-cream text-bakery-brown transition-colors cursor-pointer"
                        title="Previous Slide"
                      >
                        ← Prev
                      </button>
                      <div className="flex gap-1">
                        {reviews.slice(0, 5).map((_, i) => (
                          <div
                            key={i}
                            className={`h-1.5 rounded-full transition-all ${
                              i === activeSlide ? "w-4 bg-bakery-accent" : "w-1.5 bg-bakery-accent/30"
                            }`}
                          />
                        ))}
                      </div>
                      <button
                        id="testimonial-next-btn"
                        onClick={nextSlide}
                        className="p-1.5 rounded-full hover:bg-bakery-cream text-bakery-brown transition-colors cursor-pointer"
                        title="Next Slide"
                      >
                        Next →
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                /* Write Review Form */
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-white p-8 rounded-3xl border border-bakery-accent/15 shadow-md"
                >
                  <div className="flex justify-between items-center pb-4 border-b border-bakery-accent/15 mb-6">
                    <h3 className="font-serif text-lg font-bold text-bakery-dark">
                      Review Taram's Food Garden
                    </h3>
                    <button
                      id="close-review-form-btn"
                      onClick={() => setShowReviewForm(false)}
                      className="text-xs font-semibold text-bakery-accent hover:text-bakery-brown cursor-pointer"
                    >
                      Back to Slider
                    </button>
                  </div>

                  <form onSubmit={handleSubmitReview} className="space-y-5">
                    {/* Stars Select Row */}
                    <div>
                      <label className="block text-xs font-bold text-bakery-brown uppercase mb-2">
                        How would you rate your baking experience? *
                      </label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            id={`rating-star-${star}`}
                            type="button"
                            onClick={() => setFormRating(star)}
                            className="focus:outline-none"
                            title={`Rate ${star} Stars`}
                          >
                            <Star
                              className={`w-7 h-7 cursor-pointer transition-transform hover:scale-110 ${
                                star <= formRating ? "fill-amber-400 text-amber-400" : "text-gray-200"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-bakery-brown uppercase mb-2">Your Full Name *</label>
                        <input
                          type="text"
                          required
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          placeholder="e.g., Katherine Howard"
                          className="w-full bg-bakery-cream/30 border border-bakery-accent/20 rounded-xl px-4 py-2.5 text-sm text-bakery-dark focus:outline-none focus:ring-2 focus:ring-bakery-accent/10 placeholder-bakery-dark/30"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-bakery-brown uppercase mb-2">Occasion / Service Type</label>
                        <select
                          value={formTag}
                          onChange={(e) => setFormTag(e.target.value)}
                          className="w-full bg-bakery-cream/30 border border-bakery-accent/20 rounded-xl px-4 py-3 text-sm text-bakery-dark focus:outline-none focus:ring-2 focus:ring-bakery-accent/10 cursor-pointer"
                        >
                          <option value="Birthday Client">Birthday Cake Order</option>
                          <option value="Wedding Client">Wedding Tier Order</option>
                          <option value="Weekly Regular">Weekly regular sourdough</option>
                          <option value="Pastry Connoisseur">Pastries Collector</option>
                          <option value="Verified Buyer">Other special celebration</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-bakery-brown uppercase mb-2">Your Review *</label>
                      <textarea
                        rows={4}
                        required
                        value={formText}
                        onChange={(e) => setFormText(e.target.value)}
                        placeholder="Write details about the texture, sweetness, crumb, customization process, delivery, or visual presentation. We cherish your honest feedback!"
                        className="w-full p-4 text-xs bg-bakery-cream/30 border border-bakery-accent/20 rounded-xl focus:border-bakery-accent focus:ring-2 focus:ring-bakery-accent/10 focus:outline-none placeholder-bakery-dark/30 text-bakery-dark"
                      />
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      {submitSuccess ? (
                        <div className="text-emerald-600 text-xs font-bold flex items-center gap-1 animate-pulse">
                          <CheckCircle2 className="w-4 h-4" /> Thank you! Review published.
                        </div>
                      ) : (
                        <div className="text-[10px] text-bakery-dark/40 italic">
                          * Review will be published immediately on this showcase page.
                        </div>
                      )}

                      <button
                        id="submit-review-form-btn"
                        type="submit"
                        disabled={submitSuccess}
                        className="px-6 py-3 rounded-full bg-bakery-brown hover:bg-bakery-accent text-white hover:text-bakery-dark font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                      >
                        Publish Review
                      </button>
                    </div>

                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}

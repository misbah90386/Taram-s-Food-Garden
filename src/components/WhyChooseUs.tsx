import React from "react";
import { Sparkles, Leaf, Cake, Eye, BadgePercent, Zap, Users, Heart } from "lucide-react";
import { motion } from "motion/react";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <Sparkles className="w-5 h-5 text-amber-500" />,
      title: "Freshly Baked Daily",
      desc: "Our ovens are fired up before sunrise. We bake sourdough breads and pastries from scratch daily so you receive them at the peak of freshness."
    },
    {
      icon: <Leaf className="w-5 h-5 text-emerald-500" />,
      title: "Premium Ingredients",
      desc: "We refuse compromises. Only organic grains, pasture-raised cream, and rich single-source Belgian dark chocolate make their way into our batter."
    },
    {
      icon: <Cake className="w-5 h-5 text-pink-500" />,
      title: "Custom Cake Designs",
      desc: "Our custom decorators translate your dream milestones into edible artwork. Select exact tiers, layers, themes, and personalized sugar plates."
    },
    {
      icon: <Eye className="w-5 h-5 text-indigo-500" />,
      title: "Beautiful Presentation",
      desc: "Every pastry box is wrapped in silk-textured ribbons, and every cake is packed in solid-frame custom presentation crates to ensure a premium look."
    },
    {
      icon: <BadgePercent className="w-5 h-5 text-blue-500" />,
      title: "Honest & Fair Prices",
      desc: "While we use luxury ingredients, we strive to keep artisan baking accessible. We offer modular portions and pricing options for all celebration sizes."
    },
    {
      icon: <Zap className="w-5 h-5 text-orange-500" />,
      title: "Seamless Ordering",
      desc: "Choose items, schedule your exact pickup slot or request temperature-controlled delivery. Pay securely online and get real-time status updates."
    },
    {
      icon: <Users className="w-5 h-5 text-teal-500" />,
      title: "Friendly Service",
      desc: "Our customer service specialists, bakers, and drivers are devoted to making your celebrations completely stress-free with genuine warmth."
    },
    {
      icon: <Heart className="w-5 h-5 text-rose-500" />,
      title: "Made with Love",
      desc: "We are a family-owned brand. We pour our hearts into every recipe, folding attention, care, and absolute dedication into every crumb."
    }
  ];

  return (
    <section id="why-choose-us" className="py-24 bg-bakery-warm-white/30 border-t border-bakery-accent/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-bakery-accent block mb-3">Our Promise</span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#4A3728] tracking-tight leading-[1.1] mb-6">
            Why Choose Taram's Food Garden
          </h2>
          <div className="w-16 h-0.5 bg-bakery-accent mx-auto mb-6" />
          <p className="text-base sm:text-lg text-bakery-dark/80 font-light italic leading-relaxed">
            We are dedicated to crafting an extraordinary experience, pairing mouth-watering luxury baking with impeccable customer service.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feat, idx) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="bg-white p-6 rounded-2xl border border-bakery-accent/10 shadow-sm hover:shadow-md hover:translate-y-[-2px] transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-full bg-bakery-cream flex items-center justify-center mb-4 border border-bakery-accent/10">
                {feat.icon}
              </div>
              <h3 className="font-serif font-bold text-sm text-bakery-brown mb-2">{feat.title}</h3>
              <p className="text-xs text-bakery-dark/65 leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

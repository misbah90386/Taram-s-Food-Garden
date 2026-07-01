import React from "react";
import { Sparkles, Heart, ChefHat, Leaf, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";

export default function About() {
  const values = [
    {
      icon: <Leaf className="w-5 h-5 text-emerald-600" />,
      title: "100% Premium Ingredients",
      description: "We use organic French flour, AOP Normandy butter, fresh pasture eggs, and single-origin Belgian chocolate. No artificial additives or stabilizers."
    },
    {
      icon: <ChefHat className="w-5 h-5 text-bakery-accent" />,
      title: "Artisanal Craftsmanship",
      description: "Our baking is a labor of love. Sourdough undergoes a 36-hour fermentation; croissants are carefully laminated over three days for ultimate layers."
    },
    {
      icon: <Heart className="w-5 h-5 text-rose-500" />,
      title: "Baked with Love & Care",
      description: "Every pastry is shaped by hand, every decoration is piped with care, and every customer request is handled with genuine hospitality."
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-indigo-600" />,
      title: "Guaranteed Fresh Daily",
      description: "We bake from scratch before sunrise every single morning. Any goods unsold by closing time are donated to local communities."
    }
  ];

  return (
    <section id="about" className="py-24 bg-bakery-warm-white/20 relative overflow-hidden border-t border-bakery-accent/10">
      <div className="absolute top-12 right-0 w-64 h-64 bg-bakery-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-12 left-0 w-64 h-64 bg-bakery-rose/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Visual Side */}
          <div className="lg:col-span-5 relative order-last lg:order-first">
            <div className="relative mx-auto max-w-sm sm:max-w-md">
              
              {/* Main Overlap Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white aspect-[3/4]"
              >
                <img
                  src="https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&w=800&q=80"
                  alt="Baker dusting flour over fresh bread"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-bakery-dark/10" />
              </motion.div>

              {/* Smaller overlapping card */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="absolute -bottom-8 -right-4 sm:-right-8 bg-bakery-brown text-white p-6 rounded-2xl shadow-2xl max-w-[240px] border border-white/10 hidden sm:block"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-bakery-accent" />
                  <span className="font-serif font-semibold text-lg">Since 2018</span>
                </div>
                <p className="text-xs text-white/80 leading-relaxed">
                  Starting as a cozy local kitchen garden, Taram's has grown into a premium landmark for pastry connoisseurs, delivering deliciousness to over 15,000 tables.
                </p>
              </motion.div>

              {/* Back decoration line */}
              <div className="absolute -z-10 -top-6 -left-6 w-full h-full border-2 border-bakery-accent rounded-2xl opacity-20" />
            </div>
          </div>

          {/* Text Story Story */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="text-center lg:text-left mb-8">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-bakery-accent block mb-3">Our Story</span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#4A3728] tracking-tight leading-[1.1] mb-6">
                Where Handcrafted Tradition <br className="hidden lg:inline" /> Meets Modern Elegance
              </h2>
              <div className="w-16 h-0.5 bg-bakery-accent mx-auto lg:mx-0 mb-6" />
              <p className="text-base sm:text-lg text-bakery-dark/80 font-light italic leading-relaxed mb-4">
                At Taram's Food Garden, we believe that baking is a conversation between premium ingredients, patient fermentation, and visual perfection. What began as a passionate farm-to-table bakery experiment in our family flower garden has evolved into a high-end pâtisserie brand.
              </p>
              <p className="text-sm sm:text-base text-bakery-dark/70 leading-relaxed">
                Every celebration cake, buttery croissant, and crispy sourdough boule we create is baked entirely from scratch using century-old European techniques, elevated by modern aesthetic presentations. We source only the finest butter, fresh farm cream, and seasonal organic fruits to guarantee an extraordinary sensory experience.
              </p>
            </div>

            {/* Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
              {values.map((val, idx) => (
                <motion.div
                  key={val.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex gap-4 p-4 rounded-xl hover:bg-white transition-colors duration-300"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-bakery-cream shadow-sm border border-bakery-accent/10">
                    {val.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-bakery-dark">{val.title}</h3>
                    <p className="text-xs text-bakery-dark/60 mt-1 leading-relaxed">{val.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

import React, { useState } from "react";
import { Mail, Phone, MapPin, Clock, MessageSquare, Send, CheckCircle2 } from "lucide-react";
import { ContactMessage } from "../types";
import { motion, AnimatePresence } from "motion/react";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState<ContactMessage | null>(null);

  const contactDetails = [
    {
      icon: <Phone className="w-5 h-5 text-bakery-accent" />,
      title: "Phone & Inquiries",
      text: "+1 (555) 728-3489",
      href: "tel:+15557283489",
      actionLabel: "Call our bakery"
    },
    {
      icon: <Mail className="w-5 h-5 text-bakery-accent" />,
      title: "Email Address",
      text: "orders@taramsfoodgarden.com",
      href: "mailto:orders@taramsfoodgarden.com",
      actionLabel: "Send us an email"
    },
    {
      icon: <MessageSquare className="w-5 h-5 text-emerald-500" />,
      title: "Direct WhatsApp",
      text: "+1 (123) 456-7890",
      href: "https://wa.me/11234567890?text=Hi%2C%20I%20have%20an%20inquiry%20for%20Taram%27s%20Food%20Garden!",
      actionLabel: "Chat on WhatsApp"
    },
    {
      icon: <MapPin className="w-5 h-5 text-bakery-accent" />,
      title: "Bakery Location",
      text: "748 Sweet Orchard Lane, Blissville, NY 10001",
      href: "#",
      actionLabel: "View in Maps"
    }
  ];

  const businessHours = [
    { days: "Monday — Friday", hours: "7:00 AM — 6:00 PM" },
    { days: "Saturday", hours: "7:00 AM — 5:00 PM" },
    { days: "Sunday", hours: "8:00 AM — 3:00 PM" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    const loggedMsg: ContactMessage = {
      name,
      email,
      subject: subject || "General Inquiry",
      message,
      date: new Date().toISOString()
    };

    // Save message to localStorage as proof of function
    const saved = localStorage.getItem("tarams_messages");
    const currentList = saved ? JSON.parse(saved) : [];
    currentList.push(loggedMsg);
    localStorage.setItem("tarams_messages", JSON.stringify(currentList));

    setSubmittedMessage(loggedMsg);
    setIsSuccess(true);

    // Reset Form
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");

    setTimeout(() => {
      setIsSuccess(false);
    }, 4000);
  };

  return (
    <section id="contact" className="py-24 bg-bakery-warm-white/40 border-t border-bakery-accent/15 scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-bakery-accent block mb-3">Connect with Us</span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#4A3728] tracking-tight leading-[1.1] mb-6">
            Visit Us or Say Hello
          </h2>
          <div className="w-16 h-0.5 bg-bakery-accent mx-auto mb-6" />
          <p className="text-base sm:text-lg text-bakery-dark/80 font-light italic leading-relaxed">
            Have questions about ordering custom cupcakes, delivery options, or corporate gift boxes? Reach out to our bakers. We would love to chat!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Block: Info and Map */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8">
            <div className="bg-white p-8 rounded-3xl border border-bakery-accent/10 shadow-sm space-y-6">
              <h3 className="font-serif text-lg font-bold text-bakery-brown border-b border-bakery-accent/10 pb-3 mb-2">
                Bakery Information
              </h3>
              
              <div className="space-y-5">
                {contactDetails.map((det) => (
                  <div key={det.title} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-bakery-cream flex items-center justify-center border border-bakery-accent/10 shrink-0">
                      {det.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-bakery-dark">{det.title}</h4>
                      {det.href !== "#" ? (
                        <a href={det.href} target="_blank" rel="noopener noreferrer" className="text-xs text-bakery-brown hover:text-bakery-accent font-semibold block mt-0.5 underline">
                          {det.text}
                        </a>
                      ) : (
                        <span className="text-xs text-bakery-dark/75 block mt-0.5">{det.text}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Business Hours list */}
              <div className="border-t border-bakery-accent/10 pt-5 space-y-3">
                <h4 className="font-serif font-bold text-xs text-bakery-brown flex items-center gap-1.5 mb-1">
                  <Clock className="w-4 h-4 text-bakery-accent" />
                  Baking Hours
                </h4>
                {businessHours.map((bh) => (
                  <div key={bh.days} className="flex justify-between text-xs text-bakery-dark/70">
                    <span className="font-semibold">{bh.days}</span>
                    <span className="font-serif font-medium">{bh.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Map Frame */}
            <div className="relative rounded-3xl overflow-hidden shadow-sm border border-bakery-accent/10 h-64 lg:h-auto min-h-[260px] bg-bakery-beige">
              <iframe
                title="Google Maps Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12089.431604113948!2d-73.9782806!3d40.748817!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1625000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>

          {/* Right Block: Message Form */}
          <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-bakery-accent/10 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-serif text-xl font-bold text-bakery-dark border-b border-bakery-accent/10 pb-4 mb-6">
                Send Us a Note
              </h3>

              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-6 bg-emerald-50 border border-emerald-100 rounded-2xl text-emerald-800 text-center space-y-4"
                  >
                    <div className="flex justify-center">
                      <CheckCircle2 className="w-12 h-12 text-emerald-600 animate-bounce" />
                    </div>
                    <h4 className="font-serif text-lg font-bold">Message Sent Successfully!</h4>
                    <p className="text-xs leading-relaxed max-w-sm mx-auto">
                      Thank you, <span className="font-bold">{submittedMessage?.name}</span>! Your message regarding <span className="font-bold">"{submittedMessage?.subject}"</span> has been captured. Our bakery reception team will email you back shortly at <span className="underline">{submittedMessage?.email}</span>.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
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

                    <div>
                      <label className="block text-xs font-bold text-bakery-brown uppercase mb-2">Subject (Optional)</label>
                      <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="e.g. Wedding Catering Tasting"
                        className="w-full bg-bakery-cream/30 border border-bakery-accent/20 rounded-xl px-4 py-2.5 text-sm text-bakery-dark focus:outline-none focus:ring-2 focus:ring-bakery-accent/10 placeholder-bakery-dark/30"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-bakery-brown uppercase mb-2">Your Message *</label>
                      <textarea
                        rows={5}
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Detail your inquiry here (e.g. date of party, expected guest counts, allergens we should avoid, or specific pastry flavors you would like to order)."
                        className="w-full p-4 text-xs bg-bakery-cream/30 border border-bakery-accent/20 rounded-xl focus:border-bakery-accent focus:ring-2 focus:ring-bakery-accent/10 focus:outline-none placeholder-bakery-dark/30 text-bakery-dark"
                      />
                    </div>

                    <div className="pt-3">
                      <button
                        id="submit-contact-form"
                        type="submit"
                        className="w-full py-4 rounded-full bg-[#4A3728] hover:bg-[#D4AF37] text-white hover:text-bakery-dark font-bold text-xs uppercase tracking-widest shadow-xl transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </button>
                    </div>
                  </form>
                )}
              </AnimatePresence>
            </div>
            
            <div className="mt-8 border-t border-bakery-accent/10 pt-6 text-[10px] text-bakery-dark/40 leading-relaxed text-center lg:text-left">
              * By submitting this form, you authorize Taram's Food Garden to reply via email or phone regarding your catering, booking, or reservation inquiry.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

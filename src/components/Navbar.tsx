import React, { useState, useEffect } from "react";
import { ShoppingBag, Menu, X, ArrowRight, Flower2 } from "lucide-react";
import { useApp } from "../context/AppContext";
import { motion, AnimatePresence } from "motion/react";

export default function Navbar() {
  const { cart, setIsCartOpen } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Menu", href: "#menu" },
    { label: "Custom Cakes", href: "#custom-cakes" },
    { label: "Gallery", href: "#gallery" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offset = 80; // height of fixed navbar
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
    <>
      <header
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-bakery-cream/95 backdrop-blur-md shadow-md border-b border-bakery-accent/10 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              id="brand-logo"
              href="#home"
              onClick={(e) => handleLinkClick(e, "#home")}
              className="flex items-center gap-2 group focus:outline-none"
            >
              <div className="w-10 h-10 rounded-full bg-bakery-accent/15 flex items-center justify-center group-hover:bg-bakery-accent/25 transition-all">
                <Flower2 className="w-5 h-5 text-bakery-accent group-hover:scale-110 transition-transform duration-300" />
              </div>
              <span className="font-serif text-xl sm:text-2xl font-black tracking-tight text-[#4A3728] group-hover:text-bakery-accent transition-colors duration-300">
                Taram's <span className="text-bakery-accent font-light italic">Garden</span>
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav id="desktop-nav" className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="font-bold text-xs uppercase tracking-widest text-[#4A3728] hover:text-bakery-accent hover:translate-y-[-1px] transition-all duration-200"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              {/* Cart Trigger */}
              <button
                id="cart-trigger-btn"
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 rounded-full bg-bakery-warm-white text-[#4A3728] hover:bg-bakery-accent hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-bakery-accent"
                title="View Shopping Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                <AnimatePresence>
                  {totalItems > 0 && (
                    <motion.span
                      id="cart-badge"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-bakery-rose text-[10px] font-bold text-white shadow-md border border-white"
                    >
                      {totalItems}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* Order Now CTA - Desktop */}
              <a
                id="header-cta-btn"
                href="#menu"
                onClick={(e) => handleLinkClick(e, "#menu")}
                className="hidden md:flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-[#4A3728] hover:bg-[#D4AF37] text-white font-bold text-xs uppercase tracking-widest shadow-xl transition-all duration-300 hover:scale-105"
              >
                <span>Order Menu</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              {/* Mobile Menu Toggle */}
              <button
                id="mobile-menu-toggle"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 lg:hidden text-bakery-brown hover:bg-bakery-warm-white rounded-full transition-colors"
                title="Toggle Menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              id="mobile-drawer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-45 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Container */}
            <motion.div
              id="mobile-drawer-container"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-bakery-cream shadow-2xl z-50 p-6 flex flex-col justify-between lg:hidden"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-bakery-accent/15">
                  <span className="font-serif text-xl font-bold text-bakery-brown">
                    Taram's <span className="text-bakery-accent italic">Garden</span>
                  </span>
                  <button
                    id="mobile-drawer-close"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1.5 rounded-full bg-bakery-warm-white text-bakery-brown hover:bg-bakery-accent hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex flex-col gap-5 py-8">
                  {navLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="font-serif text-lg font-medium text-bakery-dark hover:text-bakery-accent flex items-center justify-between group transition-colors duration-200"
                    >
                      <span>{link.label}</span>
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-bakery-accent/15 flex flex-col gap-3">
                <a
                  id="mobile-drawer-cta"
                  href="#menu"
                  onClick={(e) => handleLinkClick(e, "#menu")}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-bakery-brown text-white font-semibold shadow-md active:scale-95 transition-all"
                >
                  <span>Browse Sweet Menu</span>
                  <ShoppingBag className="w-4 h-4" />
                </a>
                <a
                  id="mobile-drawer-secondary-cta"
                  href="#custom-cakes"
                  onClick={(e) => handleLinkClick(e, "#custom-cakes")}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl border border-bakery-accent/40 text-bakery-brown hover:bg-bakery-warm-white font-semibold transition-all"
                >
                  <span>Custom Cake Inquiry</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

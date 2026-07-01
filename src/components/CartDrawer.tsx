import React, { useState } from "react";
import { X, Trash2, ShoppingBag, CreditCard, Sparkles, CheckCircle2, ArrowRight, Truck, Store } from "lucide-react";
import { useApp } from "../context/AppContext";
import { motion, AnimatePresence } from "motion/react";
import { Order } from "../types";

export default function CartDrawer() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    isCartOpen,
    setIsCartOpen,
    placeOrder
  } = useApp();

  // Shipping details
  const [deliveryMethod, setDeliveryMethod] = useState<"Pickup" | "Delivery">("Pickup");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [checkoutNotes, setCheckoutNotes] = useState("");

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [placedReceipt, setPlacedReceipt] = useState<Order | null>(null);

  const subtotal = cart.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);
  const deliveryFee = deliveryMethod === "Delivery" ? 15.00 : 0.00;
  const taxRate = 0.085; // 8.5%
  const tax = subtotal * taxRate;
  const total = subtotal + deliveryFee + tax;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerEmail || !customerPhone) return;

    const receipt = placeOrder({
      name: customerName,
      email: customerEmail,
      phone: customerPhone,
      deliveryMethod,
      address: deliveryMethod === "Delivery" ? deliveryAddress : undefined,
      notes: checkoutNotes || undefined
    });

    setPlacedReceipt(receipt);
    
    // Reset checkout form fields
    setCustomerName("");
    setCustomerEmail("");
    setCustomerPhone("");
    setDeliveryAddress("");
    setCheckoutNotes("");
  };

  const handleCloseReceiptAndDrawer = () => {
    setIsCartOpen(false);
    setIsCheckingOut(false);
    setPlacedReceipt(null);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Blur Backdrop */}
          <motion.div
            id="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
            onClick={() => {
              if (!placedReceipt) setIsCartOpen(false);
            }}
          />

          {/* Drawer Panel */}
          <motion.div
            id="cart-drawer-panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[480px] bg-bakery-cream shadow-2xl z-50 p-6 flex flex-col justify-between overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-5 border-b border-bakery-accent/15">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-bakery-accent" />
                <span className="font-serif text-lg sm:text-xl font-bold text-bakery-brown">
                  {placedReceipt ? "Order Success!" : isCheckingOut ? "Checkout Details" : "Your Sweet Basket"}
                </span>
                {!isCheckingOut && !placedReceipt && (
                  <span className="bg-bakery-accent/20 text-bakery-brown text-xs font-bold px-2.5 py-0.5 rounded-full">
                    {cart.reduce((sum, i) => sum + i.quantity, 0)}
                  </span>
                )}
              </div>
              <button
                id="close-cart-drawer"
                onClick={placedReceipt ? handleCloseReceiptAndDrawer : () => setIsCartOpen(false)}
                className="p-1.5 rounded-full bg-bakery-warm-white text-bakery-brown hover:bg-bakery-accent hover:text-white transition-colors cursor-pointer"
                title="Close Shopping Cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* CASE 1: Placed Receipt Screen */}
            {placedReceipt ? (
              <div className="flex-grow py-8 flex flex-col justify-between">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 shadow-sm border border-emerald-200">
                    <CheckCircle2 className="w-10 h-10 animate-bounce" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-bakery-brown">
                    Order Placed Successfully!
                  </h3>
                  <p className="text-xs text-bakery-dark/70 max-w-sm mx-auto leading-relaxed">
                    Thank you, <span className="font-bold">{placedReceipt.customerInfo.name}</span>! Your artisan bakery order <span className="font-serif font-bold text-bakery-accent underline">#{placedReceipt.id}</span> has been scheduled.
                  </p>

                  {/* Summary receipt box */}
                  <div className="bg-white p-5 rounded-2xl border border-bakery-accent/10 text-left space-y-3.5 mt-6 text-xs max-h-[300px] overflow-y-auto">
                    <h4 className="font-bold text-bakery-brown border-b border-bakery-accent/5 pb-1 uppercase tracking-wider text-[10px]">
                      Items Ordered
                    </h4>
                    {placedReceipt.items.map((item) => (
                      <div key={item.id} className="flex justify-between items-start">
                        <div>
                          <p className="font-bold text-bakery-dark leading-tight">{item.menuItem.name} <span className="text-bakery-accent">x{item.quantity}</span></p>
                          <p className="text-[10px] text-bakery-dark/50 mt-0.5 italic">
                            Size: {item.size || "Standard"} {item.notes && `| "${item.notes}"`}
                          </p>
                        </div>
                        <span className="font-serif font-semibold text-bakery-brown shrink-0 ml-4">
                          ${(item.menuItem.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}

                    <div className="border-t border-dashed border-bakery-accent/20 pt-3 space-y-2">
                      <div className="flex justify-between text-bakery-dark/60">
                        <span>SUBTOTAL</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-bakery-dark/60">
                        <span>DELIVERY ({placedReceipt.customerInfo.deliveryMethod})</span>
                        <span>{deliveryFee > 0 ? `$${deliveryFee.toFixed(2)}` : "FREE PICKUP"}</span>
                      </div>
                      <div className="flex justify-between text-bakery-dark/60">
                        <span>TAXES (8.5%)</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-bold text-sm text-bakery-brown border-t border-bakery-accent/10 pt-2">
                        <span>FINAL TOTAL</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mt-8">
                  <a
                    id="whatsapp-confirm-order-btn"
                    href={`https://wa.me/11234567890?text=${encodeURIComponent(
                      `Hi! I just placed a bakery order #${placedReceipt.id} on your website for a final total of $${total.toFixed(2)}. Can you confirm my delivery/pickup timing?`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Discuss Order on WhatsApp</span>
                  </a>
                  <button
                    id="finish-order-btn"
                    onClick={handleCloseReceiptAndDrawer}
                    className="w-full py-3.5 rounded-xl border border-bakery-accent/40 text-bakery-brown hover:bg-bakery-beige font-bold text-xs uppercase transition-colors cursor-pointer"
                  >
                    Continue Browsing Menu
                  </button>
                </div>
              </div>
            ) : isCheckingOut ? (
              /* CASE 2: Checkout Form Screen */
              <form onSubmit={handleCheckoutSubmit} className="flex-grow flex flex-col justify-between mt-5">
                <div className="space-y-5">
                  {/* Toggle Delivery vs Pickup */}
                  <div>
                    <label className="block text-[10px] font-bold text-bakery-brown uppercase tracking-wider mb-2">
                      Logistics Method
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setDeliveryMethod("Pickup")}
                        className={`py-2.5 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                          deliveryMethod === "Pickup"
                            ? "bg-bakery-brown text-white border-bakery-brown shadow-sm"
                            : "bg-white text-bakery-dark border-bakery-accent/20"
                        }`}
                      >
                        <Store className="w-4 h-4" />
                        <span>Pickup (Free)</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeliveryMethod("Delivery")}
                        className={`py-2.5 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                          deliveryMethod === "Delivery"
                            ? "bg-bakery-brown text-white border-bakery-brown shadow-sm"
                            : "bg-white text-bakery-dark border-bakery-accent/20"
                        }`}
                      >
                        <Truck className="w-4 h-4" />
                        <span>Delivery ($15)</span>
                      </button>
                    </div>
                  </div>

                  {/* Customer Information inputs */}
                  <div>
                    <label className="block text-[10px] font-bold text-bakery-brown uppercase mb-1.5">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Jane Eyre"
                      className="w-full bg-white border border-bakery-accent/20 rounded-xl px-4 py-2.5 text-xs text-bakery-dark focus:outline-none focus:ring-2 focus:ring-bakery-accent/15 placeholder-bakery-dark/30"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-bakery-brown uppercase mb-1.5">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        placeholder="jane@domain.com"
                        className="w-full bg-white border border-bakery-accent/20 rounded-xl px-4 py-2.5 text-xs text-bakery-dark focus:outline-none focus:ring-2 focus:ring-bakery-accent/15 placeholder-bakery-dark/30"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-bakery-brown uppercase mb-1.5">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="+1 (555) 012-3456"
                        className="w-full bg-white border border-bakery-accent/20 rounded-xl px-4 py-2.5 text-xs text-bakery-dark focus:outline-none focus:ring-2 focus:ring-bakery-accent/15 placeholder-bakery-dark/30"
                      />
                    </div>
                  </div>

                  {/* Conditional Address Field */}
                  {deliveryMethod === "Delivery" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <label className="block text-[10px] font-bold text-bakery-brown uppercase mb-1.5">Full Delivery Address *</label>
                      <input
                        type="text"
                        required
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        placeholder="123 Sweetwood Drive, Blissville, NY 10001"
                        className="w-full bg-white border border-bakery-accent/20 rounded-xl px-4 py-2.5 text-xs text-bakery-dark focus:outline-none focus:ring-2 focus:ring-bakery-accent/15 placeholder-bakery-dark/30"
                      />
                    </motion.div>
                  )}

                  {/* Checkout Notes */}
                  <div>
                    <label className="block text-[10px] font-bold text-bakery-brown uppercase mb-1.5">Delivery or Pick-up Notes (Optional)</label>
                    <textarea
                      rows={2}
                      value={checkoutNotes}
                      onChange={(e) => setCheckoutNotes(e.target.value)}
                      placeholder="e.g. Please leave the box with the concierge, or ring the golden bell."
                      className="w-full p-3 text-xs bg-white border border-bakery-accent/20 rounded-xl focus:border-bakery-accent focus:ring-2 focus:ring-bakery-accent/15 focus:outline-none placeholder-bakery-dark/30 text-bakery-dark"
                    />
                  </div>
                </div>

                {/* Subtotal summary and Checkout CTA */}
                <div className="border-t border-bakery-accent/15 pt-5 mt-6">
                  <div className="space-y-2 text-xs mb-4">
                    <div className="flex justify-between text-bakery-dark/60">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-bakery-dark/60">
                      <span>Delivery Logistics Fee</span>
                      <span>{deliveryFee > 0 ? `$${deliveryFee.toFixed(2)}` : "FREE PICKUP"}</span>
                    </div>
                    <div className="flex justify-between text-bakery-dark/60">
                      <span>Estimated Taxes (8.5%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-serif font-bold text-base text-bakery-brown border-t border-bakery-accent/10 pt-2">
                      <span>Total Due:</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-3">
                    <button
                      id="back-to-cart-btn"
                      type="button"
                      onClick={() => setIsCheckingOut(false)}
                      className="col-span-4 py-4 rounded-xl border border-bakery-accent/30 text-bakery-brown hover:bg-bakery-beige font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      id="complete-order-btn"
                      type="submit"
                      className="col-span-8 py-4 rounded-xl bg-bakery-brown hover:bg-bakery-accent text-white hover:text-bakery-dark font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Place Simulated Order</span>
                    </button>
                  </div>
                </div>
              </form>
            ) : cart.length > 0 ? (
              /* CASE 3: Normal Cart list */
              <div className="flex-grow flex flex-col justify-between mt-5">
                {/* Cart Items list */}
                <div className="flex-grow overflow-y-auto pr-1 space-y-4 max-h-[50vh] sm:max-h-[58vh]">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 p-3 bg-white rounded-2xl border border-bakery-accent/5 shadow-sm relative group"
                    >
                      {/* Image */}
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-bakery-beige shrink-0">
                        <img
                          src={item.menuItem.image}
                          alt={item.menuItem.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Info and Quantities */}
                      <div className="flex-grow flex flex-col justify-between">
                        <div>
                          <h4 className="font-serif font-bold text-xs sm:text-sm text-bakery-dark leading-tight pr-5">
                            {item.menuItem.name}
                          </h4>
                          <p className="text-[10px] text-bakery-accent uppercase tracking-widest font-bold mt-1">
                            {item.menuItem.category} {item.size && `| Size: ${item.size}`}
                          </p>
                          {item.notes && (
                            <p className="text-[10px] italic text-bakery-dark/50 bg-bakery-cream p-1.5 rounded mt-1.5 leading-snug border border-bakery-accent/5">
                              "{item.notes}"
                            </p>
                          )}
                        </div>

                        {/* Adjust and subtotal */}
                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-bakery-accent/5">
                          {/* Incrementer */}
                          <div className="flex items-center border border-bakery-accent/20 rounded-full px-1 bg-bakery-cream">
                            <button
                              id={`qty-decrement-${item.id}`}
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-2 py-0.5 text-xs font-bold text-bakery-brown hover:text-bakery-accent focus:outline-none cursor-pointer"
                            >
                              -
                            </button>
                            <span className="px-2 text-xs font-semibold text-bakery-dark">
                              {item.quantity}
                            </span>
                            <button
                              id={`qty-increment-${item.id}`}
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-2 py-0.5 text-xs font-bold text-bakery-brown hover:text-bakery-accent focus:outline-none cursor-pointer"
                            >
                              +
                            </button>
                          </div>

                          {/* Item Subtotal price */}
                          <span className="font-serif text-sm font-bold text-bakery-brown">
                            ${(item.menuItem.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>

                      {/* Trash Button */}
                      <button
                        id={`delete-cart-item-${item.id}`}
                        onClick={() => removeFromCart(item.id)}
                        className="absolute top-3 right-3 p-1.5 rounded-full text-bakery-dark/40 hover:bg-bakery-rose/10 hover:text-bakery-rose transition-colors cursor-pointer"
                        title="Remove Item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Pricing Totals & Checkout Trigger */}
                <div className="border-t border-bakery-accent/15 pt-5 mt-6">
                  <div className="flex items-center justify-between font-serif font-bold text-base text-bakery-brown mb-5">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <p className="text-[10px] text-bakery-dark/40 mb-4 leading-normal">
                    * Taxes and delivery fees calculated dynamically in next step. Orders require 24-hour advance preparation notice.
                  </p>

                  <button
                    id="checkout-drawer-trigger-btn"
                    onClick={() => setIsCheckingOut(true)}
                    className="w-full py-4 rounded-xl bg-bakery-brown hover:bg-bakery-accent text-white hover:text-bakery-dark font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              /* CASE 4: Empty Cart */
              <div className="flex-grow flex flex-col items-center justify-center py-16 text-center">
                <span className="text-5xl mb-4">🥐</span>
                <h3 className="font-serif text-lg font-bold text-bakery-brown">Your basket is empty</h3>
                <p className="text-xs text-bakery-dark/60 mt-1 max-w-xs leading-normal">
                  You haven't added any hand-rolled croissants, luxury birthday cakes, or macro-cookie trays to your cart yet.
                </p>
                <button
                  id="cart-shop-now-btn"
                  onClick={() => setIsCartOpen(false)}
                  className="mt-6 px-6 py-2.5 rounded-full bg-bakery-brown text-white text-xs font-bold uppercase hover:bg-bakery-accent hover:text-bakery-dark shadow-md transition-colors cursor-pointer"
                >
                  Shop Fresh Treats Now
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

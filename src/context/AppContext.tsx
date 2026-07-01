import React, { createContext, useContext, useState, useEffect } from "react";
import { MenuItem, CartItem, Review, CustomCakeInquiry, Order } from "../types";
import { INITIAL_REVIEWS } from "../data";

interface AppContextProps {
  cart: CartItem[];
  addToCart: (item: MenuItem, quantity: number, size?: string, notes?: string) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  reviews: Review[];
  addReview: (name: string, rating: number, text: string, tag?: string) => void;
  inquiries: CustomCakeInquiry[];
  submitInquiry: (inquiry: CustomCakeInquiry) => void;
  orders: Order[];
  placeOrder: (customerInfo: Order["customerInfo"]) => Order;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("tarams_cart");
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Reviews state (initially loaded from default static reviews)
  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem("tarams_reviews");
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  // Inquiries state
  const [inquiries, setInquiries] = useState<CustomCakeInquiry[]>(() => {
    const saved = localStorage.getItem("tarams_inquiries");
    return saved ? JSON.parse(saved) : [];
  });

  // Orders state
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem("tarams_orders");
    return saved ? JSON.parse(saved) : [];
  });

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem("tarams_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("tarams_reviews", JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem("tarams_inquiries", JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem("tarams_orders", JSON.stringify(orders));
  }, [orders]);

  const addToCart = (item: MenuItem, quantity: number, size?: string, notes?: string) => {
    setCart((prevCart) => {
      // Create a unique key for items with custom options to distinguish them in the cart
      const cartItemId = `${item.id}-${size || "regular"}-${notes ? encodeURIComponent(notes.slice(0, 20)) : ""}`;
      const existingIndex = prevCart.findIndex((i) => i.id === cartItemId);

      if (existingIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingIndex].quantity += quantity;
        return newCart;
      }

      return [...prevCart, { id: cartItemId, menuItem: item, quantity, size, notes }];
    });
    setIsCartOpen(true); // Open the cart immediately when item is added
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const addReview = (name: string, rating: number, text: string, tag = "Verified Lover") => {
    const avatarColors = [
      "bg-amber-100 text-amber-800",
      "bg-rose-100 text-rose-800",
      "bg-emerald-100 text-emerald-800",
      "bg-indigo-100 text-indigo-800",
      "bg-teal-100 text-teal-800",
    ];
    const randomColor = avatarColors[Math.floor(Math.random() * avatarColors.length)];
    
    const newReview: Review = {
      id: `rev-${Date.now()}`,
      name,
      rating,
      text,
      date: new Date().toISOString().split("T")[0],
      avatarSeed: name,
      avatarColor: randomColor,
      tag
    };

    setReviews((prev) => [newReview, ...prev]);
  };

  const submitInquiry = (inquiry: CustomCakeInquiry) => {
    setInquiries((prev) => [inquiry, ...prev]);
  };

  const placeOrder = (customerInfo: Order["customerInfo"]): Order => {
    const total = cart.reduce((acc, item) => acc + item.menuItem.price * item.quantity, 0);
    const newOrder: Order = {
      id: `order-${Math.floor(1000 + Math.random() * 9000)}`,
      items: [...cart],
      customerInfo,
      total,
      date: new Date().toISOString(),
      status: "pending",
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        reviews,
        addReview,
        inquiries,
        submitInquiry,
        orders,
        placeOrder,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};

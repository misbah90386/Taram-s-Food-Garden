export type Category = 
  | "All"
  | "Cakes"
  | "Cupcakes"
  | "Pastries"
  | "Cookies & Brownies"
  | "Donuts"
  | "Cheesecakes"
  | "Macarons"
  | "Artisan Bread"
  | "Dessert Boxes";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: Category;
  price: number;
  image: string;
  rating: number;
  reviewsCount: number;
  isPopular?: boolean;
  tags?: string[];
  dietary?: ("Gluten-Free" | "Vegan" | "Nut-Free" | "Eggless")[];
}

export interface CartItem {
  id: string; // unique ID representing item + options
  menuItem: MenuItem;
  quantity: number;
  size?: string;
  notes?: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
  avatarSeed: string; // to generate consistent avatar or color
  avatarColor: string;
  tag?: string; // e.g., "Verified Buyer", "Wedding Client"
}

export interface CustomCakeInquiry {
  name: string;
  email: string;
  phone: string;
  occasion: string;
  size: string;
  layers: string;
  flavor: string;
  filling: string;
  deliveryDate: string;
  servingCount: number;
  description: string;
  deliveryMethod: "Pickup" | "Delivery";
  status: "pending" | "confirmed" | "completed";
}

export interface ContactMessage {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  date: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    deliveryMethod: "Pickup" | "Delivery";
    address?: string;
    notes?: string;
  };
  total: number;
  date: string;
  status: "pending" | "preparing" | "ready" | "delivered";
}

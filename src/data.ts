import { MenuItem, Review } from "./types";

export const MENU_ITEMS: MenuItem[] = [
  // Cakes
  {
    id: "cake-gold-leaf",
    name: "Luxury Gold Leaf Celebration Cake",
    description: "Elegant double-tier cake layered with Belgian dark chocolate ganache, decorated with textured vanilla buttercream and 24k edible gold leaf accents.",
    category: "Cakes",
    price: 145.00,
    image: "https://images.unsplash.com/photo-1535141192574-5d4897c13636?auto=format&fit=crop&w=800&q=80",
    rating: 5.0,
    reviewsCount: 42,
    isPopular: true,
    tags: ["Signature", "Luxury"],
    dietary: ["Nut-Free"]
  },
  {
    id: "cake-berries",
    name: "Wildberry & Vanilla Chantilly Cake",
    description: "Fluffy sponge cake layered with fresh raspberry coulis and light vanilla bean Chantilly cream, crowned with premium organic local berries.",
    category: "Cakes",
    price: 85.00,
    image: "https://images.unsplash.com/photo-1527488026388-ac36f3c95a88?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviewsCount: 31,
    tags: ["Fresh", "Elegant"],
    dietary: ["Eggless"]
  },
  {
    id: "cake-classic-birthday",
    name: "Signature Pastel Confetti Cake",
    description: "A fun-filled 3-layered buttermilk birthday cake loaded with colorful sprinkles, layered with white chocolate buttercream and topped with celebration macarons.",
    category: "Cakes",
    price: 75.00,
    image: "https://images.unsplash.com/photo-1464349110296-1d5097a9f6d4?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    reviewsCount: 56,
    isPopular: true,
    tags: ["Best Seller"],
    dietary: ["Nut-Free"]
  },
  {
    id: "cake-salted-caramel",
    name: "Salted Caramel Macadamia Crunch Cake",
    description: "Rich dark chocolate layers with buttery salted caramel ooze, toasted macadamia crunch fillings, and a silky smooth espresso-infused buttercream.",
    category: "Cakes",
    price: 92.00,
    image: "https://images.unsplash.com/photo-1508737027454-e6454ef45afd?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviewsCount: 29,
    tags: ["Decadent"]
  },

  // Cupcakes
  {
    id: "cupcake-red-velvet",
    name: "Velvet Cream Red Velvet Cupcakes",
    description: "Classic velvety red velvet sponge with a subtle hint of organic cocoa, topped with a luscious piped swirl of maple cream cheese frosting and sugar pearls.",
    category: "Cupcakes",
    price: 24.00, // per half-dozen
    image: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviewsCount: 74,
    isPopular: true,
    tags: ["Popular (Set of 6)"],
    dietary: ["Nut-Free"]
  },
  {
    id: "cupcake-salted-pistachio",
    name: "Sicilian Pistachio & Rose Cupcakes",
    description: "Indulgent roasted pistachio sponge filled with wild organic honey nectar and finished with a aromatic Persian rosewater buttercream frosting.",
    category: "Cupcakes",
    price: 28.00, // per half-dozen
    image: "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&w=800&q=80",
    rating: 5.0,
    reviewsCount: 18,
    tags: ["Gourmet (Set of 6)"]
  },

  // Cookies & Brownies
  {
    id: "cookies-double-belgian",
    name: "Giant Soft-Baked Triple Belgian Chocolate Cookies",
    description: "Thick, gooey-centered giant cookies made with premium caramelized butter and a blend of three luxury Belgian dark, milk, and white chocolate chunks.",
    category: "Cookies & Brownies",
    price: 18.00, // box of 4
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviewsCount: 112,
    isPopular: true,
    tags: ["Best Seller (Set of 4)"],
    dietary: ["Nut-Free"]
  },
  {
    id: "brownie-hazelnut-fudge",
    name: "Fudge Brownie Slabs with Salted Praline Hazelnut",
    description: "Super dense, fudgy, and intensely chocolaty brownie squares topped with a rich dark chocolate drizzle and crispy caramelized hazelnut praline.",
    category: "Cookies & Brownies",
    price: 22.00, // box of 6
    image: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    reviewsCount: 45,
    tags: ["Gluten-Free Option (Set of 6)"],
    dietary: ["Gluten-Free"]
  },

  // Donuts
  {
    id: "donut-premium-glaze",
    name: "Gourmet Vanilla Glazed & Pistachio Brioche Donuts",
    description: "A slow-fermented, hand-rolled brioche yeast donut with an airy crumb, dipped in organic Madagascar vanilla bean glaze and sprinkled with crushed nuts.",
    category: "Donuts",
    price: 16.00, // box of 4
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    reviewsCount: 38,
    tags: ["Fluffy (Set of 4)"]
  },

  // Cheesecakes
  {
    id: "cheesecake-burnt-basque",
    name: "San Sebastián Burnt Basque Cheesecake",
    description: "The ultimate crustless baked cheesecake. Intensely caramelized, deep dark brown top with an ultra-creamy, custard-like, oozing center.",
    category: "Cheesecakes",
    price: 48.00, // whole cake
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80",
    rating: 5.0,
    reviewsCount: 63,
    isPopular: true,
    tags: ["Authentic"],
    dietary: ["Gluten-Free", "Nut-Free"]
  },

  // Macarons
  {
    id: "macarons-luxury-box",
    name: "Garden Collection French Macaron Box",
    description: "Delicate and crisp almond meringue shells with chewy centers. Flavors include lavender honey, raspberry rose, matcha white chocolate, and salted caramel.",
    category: "Macarons",
    price: 32.00, // box of 12
    image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviewsCount: 89,
    tags: ["Assorted (Box of 12)"],
    dietary: ["Gluten-Free"]
  },

  // Artisan Bread
  {
    id: "bread-sourdough",
    name: "Signature 36-Hour Sourdough Boule",
    description: "Naturally leavened wild yeast sourdough baked in dark stone ovens. Blistered, deeply caramelized crust with a moist, open-crumb elastic interior.",
    category: "Artisan Bread",
    price: 9.50,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviewsCount: 95,
    isPopular: true,
    tags: ["Baked Fresh Daily"],
    dietary: ["Vegan", "Nut-Free"]
  },

  // Pastries
  {
    id: "pastry-butter-croissant",
    name: "Premium Flaky French Butter Croissants",
    description: "Laminated over three days with exceptional AOP Normandy butter, creating endless paper-thin shatteringly crisp golden layers.",
    category: "Pastries",
    price: 18.00, // Pack of 4
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80",
    rating: 5.0,
    reviewsCount: 142,
    isPopular: true,
    tags: ["Award-Winning (Set of 4)"],
    dietary: ["Nut-Free"]
  },

  // Dessert Boxes
  {
    id: "box-tasting-platter",
    name: "Taram's Signature Tea Time Tasting Platter",
    description: "Our ultimate luxury gift set. Features 2 mini croissants, 2 macarons, 2 red velvet cupcakes, 2 triple chocolate cookies, and 2 mini tarts.",
    category: "Dessert Boxes",
    price: 55.00,
    image: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviewsCount: 34,
    tags: ["Perfect Gift"],
    dietary: ["Nut-Free"]
  }
];

export const GALLERY_ITEMS = [
  {
    id: "g1",
    title: "Triple Tier Orchid Wedding Cake",
    category: "Cakes",
    image: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "g2",
    title: "Hand-piped Pastel Celebration Cupcakes",
    category: "Cupcakes",
    image: "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "g3",
    title: "Crispy Sourdough Crust Close-up",
    category: "Bread",
    image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "g4",
    title: "Fresh Baked Croissants Cooling",
    category: "Pastries",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "g5",
    title: "Macaron Tower in Pastel Palette",
    category: "Cupcakes",
    image: "https://images.unsplash.com/photo-1558961312-50346c09937d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "g6",
    title: "Behind-the-scenes: Hand-piping Orchid Detailing",
    category: "Baking Process",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "g7",
    title: "Belgian Dark Chocolate Ganache Glaze Run",
    category: "Cakes",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "g8",
    title: "Artisanal Gift Box Packaging and Silk Ribbon",
    category: "Gift Boxes",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80",
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: "rev1",
    name: "Emilia Thompson",
    rating: 5,
    text: "We ordered our three-tiered custom floral wedding cake from Taram's Food Garden, and it was a masterpiece. Our guests raved about the Salted Caramel Macadamia crunch flavor. Absolute perfection, down to the golden details!",
    date: "2026-06-20",
    avatarSeed: "Emilia",
    avatarColor: "bg-rose-100 text-rose-800",
    tag: "Wedding Client"
  },
  {
    id: "rev2",
    name: "Liam Henderson",
    rating: 5,
    text: "I buy their sourdough bread and butter croissants twice a week. It transports me straight back to Parisian bakeries. There is real care, fermentation expertise, and premium butter behind these baked goods.",
    date: "2026-06-25",
    avatarSeed: "Liam",
    avatarColor: "bg-amber-100 text-amber-800",
    tag: "Weekly regular"
  },
  {
    id: "rev3",
    name: "Sophia Vergara",
    rating: 5,
    text: "Taram's Food Garden custom designed an pastel space-themed cupcake platter for my son's 5th birthday. Not only were they jaw-dropping to look at, but they were also incredibly soft and not overly sweet. Highly recommended!",
    date: "2026-06-28",
    avatarSeed: "Sophia",
    avatarColor: "bg-emerald-100 text-emerald-800",
    tag: "Birthday Client"
  },
  {
    id: "rev4",
    name: "Marcus Aurelius",
    rating: 4.8,
    text: "The burnt basque cheesecake here is phenomenal! Custardy and creamy in the center with a perfect deeply caramelized top crust. Highly recommend getting the tasting platter for your office parties.",
    date: "2026-06-29",
    avatarSeed: "Marcus",
    avatarColor: "bg-indigo-100 text-indigo-800",
    tag: "Verified Purchaser"
  }
];

export const FAQS = [
  {
    question: "How do I place an order?",
    answer: "You can place an order directly through our interactive online store! Simply browse the menu, add items to your cart, click check out, and fill in your delivery or pick-up preferences. For custom cakes, use the 'Request Custom Cake' constructor on our custom cakes section to send a specialized brief."
  },
  {
    question: "Do you make custom cakes?",
    answer: "Yes, we specialize in high-end, custom-designed celebration cakes for weddings, birthdays, baby showers, anniversaries, graduations, corporate events, and other milestones. Our custom cake constructor lets you select sizes, flavors, and layers, providing an instant estimate!"
  },
  {
    question: "How far in advance should I order?",
    answer: "For regular items on our standard menu, we require a 24-hour advance notice. For custom-designed cakes and large event spreads, we highly recommend booking at least 1 to 2 weeks in advance to secure your spot in our baking calendar."
  },
  {
    question: "Do you offer delivery?",
    answer: "Yes, we offer premium temperature-controlled delivery for all our cakes and pastries within a 20-mile radius of our bakery. Handcrafted cakes are very delicate, so our delivery drivers are fully trained to transport them safely. Flat-rate delivery fee applies based on distance."
  },
  {
    question: "Can you accommodate dietary requests?",
    answer: "Absolutely! We offer dedicated Gluten-Free, Vegan, Eggless, and Nut-Free variations for many of our popular products. Look for the dietary tags on the menu. While we take extreme caution to avoid cross-contamination, please note our kitchen handles flour, nuts, dairy, and eggs."
  }
];

export const CAKE_OPTIONS = {
  flavors: [
    { name: "Classic Madagascar Vanilla Bean", priceFactor: 1.0 },
    { name: "Belgian Chocolate Truffle Fudge", priceFactor: 1.1 },
    { name: "Salted Caramel Macadamia Praline", priceFactor: 1.2 },
    { name: "Zesty Lemon & Organic Lavender Creame", priceFactor: 1.15 },
    { name: "Red Velvet with Maple Cream Cheese", priceFactor: 1.1 },
    { name: "Roasted Sicilian Pistachio & Honey Rose", priceFactor: 1.25 }
  ],
  fillings: [
    { name: "Fresh Strawberry Coulis & Chantilly", priceFactor: 1.0 },
    { name: "Silky Chocolate Ganache & Fudge Chips", priceFactor: 1.05 },
    { name: "Caramelized Pecan Butter & Caramel Sauce", priceFactor: 1.1 },
    { name: "Zesty Meyer Lemon Curd", priceFactor: 1.0 },
    { name: "White Chocolate Raspberry Coulis Swirl", priceFactor: 1.05 }
  ],
  sizes: [
    { name: "6-inch (Feeds 8-10)", basePrice: 65.00, servings: 10 },
    { name: "8-inch (Feeds 15-20)", basePrice: 95.00, servings: 20 },
    { name: "10-inch (Feeds 25-30)", basePrice: 135.00, servings: 30 },
    { name: "Double-Tier (6\" + 8\" - Feeds 35-40)", basePrice: 220.00, servings: 40 },
    { name: "Triple-Tier (6\" + 8\" + 10\" - Feeds 70-80)", basePrice: 420.00, servings: 80 }
  ],
  layers: [
    { name: "Double Layer (Classic Elegant)", multiplier: 1.0 },
    { name: "Triple Layer (Tall Premium)", multiplier: 1.15 },
    { name: "Four Layer (Royal Grandeur)", multiplier: 1.3 }
  ],
  occasions: [
    "Birthday Celebration",
    "Wedding Ceremony",
    "Baby Shower",
    "Anniversary Milestone",
    "Graduation Ceremony",
    "Corporate Gala Event",
    "Bridal Shower",
    "Other Special Celebration"
  ]
};

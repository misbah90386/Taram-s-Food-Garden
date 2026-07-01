import React from "react";
import { MessageSquareText } from "lucide-react";
import { motion } from "motion/react";

export default function FloatingWhatsApp() {
  const whatsappNumber = "+1234567890"; // Mock number
  const whatsappMessage = "Hello Taram's Food Garden, I would like to inquire about placing a bakery order!";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <motion.a
      id="whatsapp-float-btn"
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center justify-center bg-emerald-500 text-white p-4 rounded-full shadow-2xl hover:bg-emerald-600 transition-colors focus:outline-none focus:ring-4 focus:ring-emerald-300"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: 1, 
        opacity: 1,
        y: [0, -6, 0]
      }}
      transition={{
        scale: { delay: 1, duration: 0.3 },
        opacity: { delay: 1, duration: 0.3 },
        y: {
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut"
        }
      }}
      title="Chat with us on WhatsApp"
    >
      <MessageSquareText className="w-6 h-6" />
      <span className="sr-only">Chat with us on WhatsApp</span>
    </motion.a>
  );
}

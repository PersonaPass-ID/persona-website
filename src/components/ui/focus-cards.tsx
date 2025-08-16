"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
  }: {
    card: any;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  }) => (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "rounded-2xl relative bg-gradient-to-br from-white to-orange-50/30 border border-orange-200/30 overflow-hidden h-72 md:h-96 w-full transition-all duration-500 ease-out shadow-lg hover:shadow-2xl hover:shadow-orange-500/20 cursor-pointer group",
        hovered !== null && hovered !== index && "blur-sm scale-[0.96] opacity-60"
      )}
      whileHover={{ 
        y: -8,
        rotateX: 5,
        rotateY: 5,
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-yellow-400/20 to-blue-500/20 opacity-0"
        animate={{
          opacity: hovered === index ? 1 : 0,
          scale: hovered === index ? 1.1 : 1,
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
      
      {/* Glowing border effect */}
      <div className={cn(
        "absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-orange-400 via-yellow-400 to-blue-500 opacity-0 transition-opacity duration-500",
        hovered === index && "opacity-20"
      )} />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={cn(
          "absolute top-4 right-4 w-2 h-2 bg-orange-400 rounded-full opacity-0 transition-all duration-700",
          hovered === index && "opacity-60 animate-ping"
        )} />
        <div className={cn(
          "absolute bottom-6 left-6 w-1 h-1 bg-blue-500 rounded-full opacity-0 transition-all duration-1000",
          hovered === index && "opacity-80 animate-pulse"
        )} />
        <div className={cn(
          "absolute top-1/3 left-1/3 w-1.5 h-1.5 bg-yellow-400 rounded-full opacity-0 transition-all duration-500",
          hovered === index && "opacity-70 animate-bounce"
        )} />
      </div>

      {/* Icon container with enhanced animation */}
      <div className="absolute inset-0 p-6 flex flex-col justify-center items-center">
        <motion.div 
          className={cn(
            "w-20 h-20 mb-6 bg-gradient-to-br from-orange-400/20 to-blue-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center transition-all duration-500 border border-white/20",
            hovered === index && "bg-gradient-to-br from-orange-500/30 to-blue-600/30 border-orange-300/40"
          )}
          whileHover={{ 
            scale: 1.1,
            rotate: 5,
            transition: { duration: 0.2 }
          }}
        >
          <motion.div
            animate={{ 
              scale: hovered === index ? 1.2 : 1,
              rotate: hovered === index ? 10 : 0
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {card.icon}
          </motion.div>
        </motion.div>
        
        {/* Title with better animation */}
        <motion.h3
          className="text-xl md:text-2xl font-bold text-center mb-4 font-display bg-gradient-to-r from-gray-900 via-orange-600 to-blue-600 bg-clip-text text-transparent"
          animate={{
            y: hovered === index ? -5 : 0,
            scale: hovered === index ? 1.05 : 1
          }}
          transition={{ duration: 0.3 }}
        >
          {card.title}
        </motion.h3>
        
        {/* Description with stagger animation */}
        <motion.p 
          className={cn(
            "text-sm text-gray-600 text-center leading-relaxed font-mono max-w-xs opacity-0 transition-all duration-500 transform translate-y-6",
            hovered === index && "opacity-100 translate-y-0"
          )}
          animate={{
            opacity: hovered === index ? 1 : 0,
            y: hovered === index ? 0 : 20,
          }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {card.description}
        </motion.p>
      </div>
      
      {/* Shine effect */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full transition-transform duration-1000",
        hovered === index && "translate-x-full"
      )} />
    </motion.div>
  )
);

Card.displayName = "Card";

export function FocusCards({ cards }: { cards: any[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto md:px-8 w-full">
      {cards.map((card, index) => (
        <Card
          key={card.title}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </div>
  );
}
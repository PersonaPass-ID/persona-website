"use client";
import React, { useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { cn } from "@/lib/utils";

export const WobbleCard = ({
  children,
  containerClassName,
  className,
}: {
  children: React.ReactNode;
  containerClassName?: string;
  className?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimationControls();

  const handleHover = () => {
    setIsHovered(true);
    controls.start({
      rotate: [0, -1, 1, -0.5, 0.5, 0],
      scale: [1, 1.02, 1],
      transition: {
        duration: 0.8,
        ease: "easeInOut",
        times: [0, 0.2, 0.4, 0.6, 0.8, 1]
      }
    });
  };

  const handleHoverEnd = () => {
    setIsHovered(false);
    controls.start({
      rotate: 0,
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    });
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      animate={controls}
      onMouseEnter={handleHover}
      onMouseLeave={handleHoverEnd}
      className={cn(
        "mx-auto w-full bg-white relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-orange-500/20 border border-orange-200/30 transition-all duration-500 cursor-pointer group",
        containerClassName
      )}
      whileHover={{
        y: -5,
        transition: { duration: 0.2 }
      }}
    >
      <div
        className={cn(
          "relative h-full [background-image:radial-gradient(88%_100%_at_top,rgba(255,153,0,0.15),rgba(59,130,246,0.15))] p-8 min-h-[200px]",
          className
        )}
      >
        <div className="relative z-10">{children}</div>
        
        {/* Enhanced floating orbs with animations */}
        <motion.div 
          className="absolute top-4 right-4 w-8 h-8 bg-orange-400/30 rounded-full blur-sm"
          animate={{
            y: isHovered ? [-5, 5] : [0, -10, 0],
            opacity: isHovered ? [0.3, 0.6, 0.3] : [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: isHovered ? 1 : 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute bottom-4 left-4 w-12 h-12 bg-blue-500/30 rounded-full blur-md"
          animate={{
            x: isHovered ? [-3, 3] : [0, 5, 0],
            scale: isHovered ? [1, 1.2, 1] : [1, 1.1, 1],
            opacity: isHovered ? [0.3, 0.5, 0.3] : [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: isHovered ? 1.5 : 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute top-1/2 left-1/2 w-6 h-6 bg-yellow-400/30 rounded-full blur-sm"
          animate={{
            rotate: isHovered ? 360 : 0,
            scale: isHovered ? [1, 0.8, 1.2, 1] : [1, 1.1, 1],
            opacity: isHovered ? [0.3, 0.7, 0.3] : [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: isHovered ? 2 : 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Animated border glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-orange-400/20 via-yellow-400/20 to-blue-500/20 opacity-0"
          animate={{
            opacity: isHovered ? 0.6 : 0,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Subtle shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0"
          animate={{
            opacity: isHovered ? 0.3 : 0,
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </motion.div>
  );
};

export const WobbleCardContent = ({
  icon,
  title,
  description,
  className,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}) => {
  return (
    <motion.div 
      className={cn("space-y-6", className)}
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex items-start space-x-4">
        <motion.div 
          className="w-14 h-14 bg-gradient-to-br from-orange-400 via-yellow-400 to-blue-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-500/20 border border-white/20"
          whileHover={{ 
            scale: 1.1, 
            rotate: 5,
            boxShadow: "0 20px 40px rgba(251, 146, 60, 0.3)"
          }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            whileHover={{ scale: 1.2 }}
            transition={{ duration: 0.2 }}
          >
            {icon}
          </motion.div>
        </motion.div>
        <div className="flex-1">
          <motion.h3 
            className="text-xl font-bold text-gray-900 font-display bg-gradient-to-r from-gray-900 via-orange-600 to-blue-600 bg-clip-text text-transparent"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            {title}
          </motion.h3>
        </div>
      </div>
      <motion.p 
        className="text-gray-600 leading-relaxed font-mono text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {description}
      </motion.p>
    </motion.div>
  );
};
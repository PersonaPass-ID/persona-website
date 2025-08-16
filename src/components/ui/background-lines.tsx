"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BackgroundLinesProps {
  children: React.ReactNode;
  className?: string;
  svgOptions?: {
    duration?: number;
  };
}

export const BackgroundLines = ({ 
  children, 
  className, 
  svgOptions 
}: BackgroundLinesProps) => {
  return (
    <div className={cn(
      "h-screen w-full bg-white dark:bg-black relative flex flex-col items-center justify-center",
      className
    )}>
      <BackgroundSVG svgOptions={svgOptions} />
      {children}
    </div>
  );
};

const BackgroundSVG = ({ 
  svgOptions 
}: { 
  svgOptions?: { duration?: number } 
}) => {
  const duration = svgOptions?.duration || 10;

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 1728 894"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 h-full w-full"
    >
      <motion.path
        d="M-205 854.5L-205 0.5"
        stroke="url(#paint0_linear_1_22)"
        strokeOpacity="0.1"
        strokeWidth="1"
        initial={{ opacity: 0, pathLength: 0 }}
        animate={{ opacity: 1, pathLength: 1 }}
        transition={{ duration, delay: 0 }}
      />
      <motion.path
        d="M-128 854.5L-128 0.5"
        stroke="url(#paint1_linear_1_22)"
        strokeOpacity="0.15"
        strokeWidth="1"
        initial={{ opacity: 0, pathLength: 0 }}
        animate={{ opacity: 1, pathLength: 1 }}
        transition={{ duration, delay: 0.1 }}
      />
      <motion.path
        d="M-51 854.5L-51 0.5"
        stroke="url(#paint2_linear_1_22)"
        strokeOpacity="0.2"
        strokeWidth="1"
        initial={{ opacity: 0, pathLength: 0 }}
        animate={{ opacity: 1, pathLength: 1 }}
        transition={{ duration, delay: 0.2 }}
      />
      <motion.path
        d="M26 854.5L26 0.5"
        stroke="url(#paint3_linear_1_22)"
        strokeOpacity="0.25"
        strokeWidth="1"
        initial={{ opacity: 0, pathLength: 0 }}
        animate={{ opacity: 1, pathLength: 1 }}
        transition={{ duration, delay: 0.3 }}
      />
      <motion.path
        d="M103 854.5L103 0.5"
        stroke="url(#paint4_linear_1_22)"
        strokeOpacity="0.3"
        strokeWidth="1"
        initial={{ opacity: 0, pathLength: 0 }}
        animate={{ opacity: 1, pathLength: 1 }}
        transition={{ duration, delay: 0.4 }}
      />
      <motion.path
        d="M180 854.5L180 0.5"
        stroke="url(#paint5_linear_1_22)"
        strokeOpacity="0.35"
        strokeWidth="1"
        initial={{ opacity: 0, pathLength: 0 }}
        animate={{ opacity: 1, pathLength: 1 }}
        transition={{ duration, delay: 0.5 }}
      />
      <motion.path
        d="M257 854.5L257 0.5"
        stroke="url(#paint6_linear_1_22)"
        strokeOpacity="0.4"
        strokeWidth="1"
        initial={{ opacity: 0, pathLength: 0 }}
        animate={{ opacity: 1, pathLength: 1 }}
        transition={{ duration, delay: 0.6 }}
      />
      <motion.path
        d="M334 854.5L334 0.5"
        stroke="url(#paint7_linear_1_22)"
        strokeOpacity="0.45"
        strokeWidth="1"
        initial={{ opacity: 0, pathLength: 0 }}
        animate={{ opacity: 1, pathLength: 1 }}
        transition={{ duration, delay: 0.7 }}
      />
      <motion.path
        d="M411 854.5L411 0.5"
        stroke="url(#paint8_linear_1_22)"
        strokeOpacity="0.5"
        strokeWidth="1"
        initial={{ opacity: 0, pathLength: 0 }}
        animate={{ opacity: 1, pathLength: 1 }}
        transition={{ duration, delay: 0.8 }}
      />
      <motion.path
        d="M488 854.5L488 0.5"
        stroke="url(#paint9_linear_1_22)"
        strokeOpacity="0.55"
        strokeWidth="1"
        initial={{ opacity: 0, pathLength: 0 }}
        animate={{ opacity: 1, pathLength: 1 }}
        transition={{ duration, delay: 0.9 }}
      />
      <motion.path
        d="M565 854.5L565 0.5"
        stroke="url(#paint10_linear_1_22)"
        strokeOpacity="0.6"
        strokeWidth="1"
        initial={{ opacity: 0, pathLength: 0 }}
        animate={{ opacity: 1, pathLength: 1 }}
        transition={{ duration, delay: 1.0 }}
      />
      <motion.path
        d="M642 854.5L642 0.5"
        stroke="url(#paint11_linear_1_22)"
        strokeOpacity="0.65"
        strokeWidth="1"
        initial={{ opacity: 0, pathLength: 0 }}
        animate={{ opacity: 1, pathLength: 1 }}
        transition={{ duration, delay: 1.1 }}
      />
      <motion.path
        d="M719 854.5L719 0.5"
        stroke="url(#paint12_linear_1_22)"
        strokeOpacity="0.7"
        strokeWidth="1"
        initial={{ opacity: 0, pathLength: 0 }}
        animate={{ opacity: 1, pathLength: 1 }}
        transition={{ duration, delay: 1.2 }}
      />
      <motion.path
        d="M796 854.5L796 0.5"
        stroke="url(#paint13_linear_1_22)"
        strokeOpacity="0.75"
        strokeWidth="1"
        initial={{ opacity: 0, pathLength: 0 }}
        animate={{ opacity: 1, pathLength: 1 }}
        transition={{ duration, delay: 1.3 }}
      />
      <motion.path
        d="M873 854.5L873 0.5"
        stroke="url(#paint14_linear_1_22)"
        strokeOpacity="0.8"
        strokeWidth="1"
        initial={{ opacity: 0, pathLength: 0 }}
        animate={{ opacity: 1, pathLength: 1 }}
        transition={{ duration, delay: 1.4 }}
      />
      <motion.path
        d="M950 854.5L950 0.5"
        stroke="url(#paint15_linear_1_22)"
        strokeOpacity="0.85"
        strokeWidth="1"
        initial={{ opacity: 0, pathLength: 0 }}
        animate={{ opacity: 1, pathLength: 1 }}
        transition={{ duration, delay: 1.5 }}
      />
      <motion.path
        d="M1027 854.5L1027 0.5"
        stroke="url(#paint16_linear_1_22)"
        strokeOpacity="0.9"
        strokeWidth="1"
        initial={{ opacity: 0, pathLength: 0 }}
        animate={{ opacity: 1, pathLength: 1 }}
        transition={{ duration, delay: 1.6 }}
      />
      <motion.path
        d="M1104 854.5L1104 0.5"
        stroke="url(#paint17_linear_1_22)"
        strokeOpacity="0.95"
        strokeWidth="1"
        initial={{ opacity: 0, pathLength: 0 }}
        animate={{ opacity: 1, pathLength: 1 }}
        transition={{ duration, delay: 1.7 }}
      />
      <motion.path
        d="M1181 854.5L1181 0.5"
        stroke="url(#paint18_linear_1_22)"
        strokeOpacity="1"
        strokeWidth="1"
        initial={{ opacity: 0, pathLength: 0 }}
        animate={{ opacity: 1, pathLength: 1 }}
        transition={{ duration, delay: 1.8 }}
      />
      <motion.path
        d="M1258 854.5L1258 0.5"
        stroke="url(#paint19_linear_1_22)"
        strokeOpacity="0.95"
        strokeWidth="1"
        initial={{ opacity: 0, pathLength: 0 }}
        animate={{ opacity: 1, pathLength: 1 }}
        transition={{ duration, delay: 1.9 }}
      />
      <motion.path
        d="M1335 854.5L1335 0.5"
        stroke="url(#paint20_linear_1_22)"
        strokeOpacity="0.9"
        strokeWidth="1"
        initial={{ opacity: 0, pathLength: 0 }}
        animate={{ opacity: 1, pathLength: 1 }}
        transition={{ duration, delay: 2.0 }}
      />
      <motion.path
        d="M1412 854.5L1412 0.5"
        stroke="url(#paint21_linear_1_22)"
        strokeOpacity="0.85"
        strokeWidth="1"
        initial={{ opacity: 0, pathLength: 0 }}
        animate={{ opacity: 1, pathLength: 1 }}
        transition={{ duration, delay: 2.1 }}
      />
      <motion.path
        d="M1489 854.5L1489 0.5"
        stroke="url(#paint22_linear_1_22)"
        strokeOpacity="0.8"
        strokeWidth="1"
        initial={{ opacity: 0, pathLength: 0 }}
        animate={{ opacity: 1, pathLength: 1 }}
        transition={{ duration, delay: 2.2 }}
      />
      <motion.path
        d="M1566 854.5L1566 0.5"
        stroke="url(#paint23_linear_1_22)"
        strokeOpacity="0.75"
        strokeWidth="1"
        initial={{ opacity: 0, pathLength: 0 }}
        animate={{ opacity: 1, pathLength: 1 }}
        transition={{ duration, delay: 2.3 }}
      />
      <motion.path
        d="M1643 854.5L1643 0.5"
        stroke="url(#paint24_linear_1_22)"
        strokeOpacity="0.7"
        strokeWidth="1"
        initial={{ opacity: 0, pathLength: 0 }}
        animate={{ opacity: 1, pathLength: 1 }}
        transition={{ duration, delay: 2.4 }}
      />
      <motion.path
        d="M1720 854.5L1720 0.5"
        stroke="url(#paint25_linear_1_22)"
        strokeOpacity="0.65"
        strokeWidth="1"
        initial={{ opacity: 0, pathLength: 0 }}
        animate={{ opacity: 1, pathLength: 1 }}
        transition={{ duration, delay: 2.5 }}
      />
      <motion.path
        d="M1797 854.5L1797 0.5"
        stroke="url(#paint26_linear_1_22)"
        strokeOpacity="0.6"
        strokeWidth="1"
        initial={{ opacity: 0, pathLength: 0 }}
        animate={{ opacity: 1, pathLength: 1 }}
        transition={{ duration, delay: 2.6 }}
      />
      <motion.path
        d="M1874 854.5L1874 0.5"
        stroke="url(#paint27_linear_1_22)"
        strokeOpacity="0.55"
        strokeWidth="1"
        initial={{ opacity: 0, pathLength: 0 }}
        animate={{ opacity: 1, pathLength: 1 }}
        transition={{ duration, delay: 2.7 }}
      />
      <motion.path
        d="M1951 854.5L1951 0.5"
        stroke="url(#paint28_linear_1_22)"
        strokeOpacity="0.5"
        strokeWidth="1"
        initial={{ opacity: 0, pathLength: 0 }}
        animate={{ opacity: 1, pathLength: 1 }}
        transition={{ duration, delay: 2.8 }}
      />

      <defs>
        <linearGradient
          id="paint0_linear_1_22"
          x1="-204.5"
          y1="0"
          x2="-204.5"
          y2="854"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="hsl(var(--electric-blue))" />
          <stop offset="1" stopColor="hsl(var(--cyber-cyan))" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_1_22"
          x1="-127.5"
          y1="0"
          x2="-127.5"
          y2="854"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="hsl(var(--neon-purple))" />
          <stop offset="1" stopColor="hsl(var(--electric-blue))" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_1_22"
          x1="-50.5"
          y1="0"
          x2="-50.5"
          y2="854"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="hsl(var(--cyber-cyan))" />
          <stop offset="1" stopColor="hsl(var(--neon-purple))" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_1_22"
          x1="26.5"
          y1="0"
          x2="26.5"
          y2="854"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="hsl(var(--electric-blue))" />
          <stop offset="1" stopColor="hsl(var(--cyber-cyan))" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_1_22"
          x1="103.5"
          y1="0"
          x2="103.5"
          y2="854"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="hsl(var(--neon-purple))" />
          <stop offset="1" stopColor="hsl(var(--electric-blue))" />
        </linearGradient>
        <linearGradient
          id="paint5_linear_1_22"
          x1="180.5"
          y1="0"
          x2="180.5"
          y2="854"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="hsl(var(--cyber-cyan))" />
          <stop offset="1" stopColor="hsl(var(--neon-purple))" />
        </linearGradient>
        <linearGradient
          id="paint6_linear_1_22"
          x1="257.5"
          y1="0"
          x2="257.5"
          y2="854"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="hsl(var(--electric-blue))" />
          <stop offset="1" stopColor="hsl(var(--cyber-cyan))" />
        </linearGradient>
        <linearGradient
          id="paint7_linear_1_22"
          x1="334.5"
          y1="0"
          x2="334.5"
          y2="854"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="hsl(var(--neon-purple))" />
          <stop offset="1" stopColor="hsl(var(--electric-blue))" />
        </linearGradient>
        <linearGradient
          id="paint8_linear_1_22"
          x1="411.5"
          y1="0"
          x2="411.5"
          y2="854"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="hsl(var(--cyber-cyan))" />
          <stop offset="1" stopColor="hsl(var(--neon-purple))" />
        </linearGradient>
        <linearGradient
          id="paint9_linear_1_22"
          x1="488.5"
          y1="0"
          x2="488.5"
          y2="854"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="hsl(var(--electric-blue))" />
          <stop offset="1" stopColor="hsl(var(--cyber-cyan))" />
        </linearGradient>
        <linearGradient
          id="paint10_linear_1_22"
          x1="565.5"
          y1="0"
          x2="565.5"
          y2="854"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="hsl(var(--neon-purple))" />
          <stop offset="1" stopColor="hsl(var(--electric-blue))" />
        </linearGradient>
        <linearGradient
          id="paint11_linear_1_22"
          x1="642.5"
          y1="0"
          x2="642.5"
          y2="854"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="hsl(var(--cyber-cyan))" />
          <stop offset="1" stopColor="hsl(var(--neon-purple))" />
        </linearGradient>
        <linearGradient
          id="paint12_linear_1_22"
          x1="719.5"
          y1="0"
          x2="719.5"
          y2="854"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="hsl(var(--electric-blue))" />
          <stop offset="1" stopColor="hsl(var(--cyber-cyan))" />
        </linearGradient>
        <linearGradient
          id="paint13_linear_1_22"
          x1="796.5"
          y1="0"
          x2="796.5"
          y2="854"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="hsl(var(--neon-purple))" />
          <stop offset="1" stopColor="hsl(var(--electric-blue))" />
        </linearGradient>
        <linearGradient
          id="paint14_linear_1_22"
          x1="873.5"
          y1="0"
          x2="873.5"
          y2="854"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="hsl(var(--cyber-cyan))" />
          <stop offset="1" stopColor="hsl(var(--neon-purple))" />
        </linearGradient>
        <linearGradient
          id="paint15_linear_1_22"
          x1="950.5"
          y1="0"
          x2="950.5"
          y2="854"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="hsl(var(--electric-blue))" />
          <stop offset="1" stopColor="hsl(var(--cyber-cyan))" />
        </linearGradient>
        <linearGradient
          id="paint16_linear_1_22"
          x1="1027.5"
          y1="0"
          x2="1027.5"
          y2="854"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="hsl(var(--neon-purple))" />
          <stop offset="1" stopColor="hsl(var(--electric-blue))" />
        </linearGradient>
        <linearGradient
          id="paint17_linear_1_22"
          x1="1104.5"
          y1="0"
          x2="1104.5"
          y2="854"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="hsl(var(--cyber-cyan))" />
          <stop offset="1" stopColor="hsl(var(--neon-purple))" />
        </linearGradient>
        <linearGradient
          id="paint18_linear_1_22"
          x1="1181.5"
          y1="0"
          x2="1181.5"
          y2="854"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="hsl(var(--electric-blue))" />
          <stop offset="1" stopColor="hsl(var(--cyber-cyan))" />
        </linearGradient>
        <linearGradient
          id="paint19_linear_1_22"
          x1="1258.5"
          y1="0"
          x2="1258.5"
          y2="854"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="hsl(var(--neon-purple))" />
          <stop offset="1" stopColor="hsl(var(--electric-blue))" />
        </linearGradient>
        <linearGradient
          id="paint20_linear_1_22"
          x1="1335.5"
          y1="0"
          x2="1335.5"
          y2="854"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="hsl(var(--cyber-cyan))" />
          <stop offset="1" stopColor="hsl(var(--neon-purple))" />
        </linearGradient>
        <linearGradient
          id="paint21_linear_1_22"
          x1="1412.5"
          y1="0"
          x2="1412.5"
          y2="854"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="hsl(var(--electric-blue))" />
          <stop offset="1" stopColor="hsl(var(--cyber-cyan))" />
        </linearGradient>
        <linearGradient
          id="paint22_linear_1_22"
          x1="1489.5"
          y1="0"
          x2="1489.5"
          y2="854"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="hsl(var(--neon-purple))" />
          <stop offset="1" stopColor="hsl(var(--electric-blue))" />
        </linearGradient>
        <linearGradient
          id="paint23_linear_1_22"
          x1="1566.5"
          y1="0"
          x2="1566.5"
          y2="854"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="hsl(var(--cyber-cyan))" />
          <stop offset="1" stopColor="hsl(var(--neon-purple))" />
        </linearGradient>
        <linearGradient
          id="paint24_linear_1_22"
          x1="1643.5"
          y1="0"
          x2="1643.5"
          y2="854"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="hsl(var(--electric-blue))" />
          <stop offset="1" stopColor="hsl(var(--cyber-cyan))" />
        </linearGradient>
        <linearGradient
          id="paint25_linear_1_22"
          x1="1720.5"
          y1="0"
          x2="1720.5"
          y2="854"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="hsl(var(--neon-purple))" />
          <stop offset="1" stopColor="hsl(var(--electric-blue))" />
        </linearGradient>
        <linearGradient
          id="paint26_linear_1_22"
          x1="1797.5"
          y1="0"
          x2="1797.5"
          y2="854"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="hsl(var(--cyber-cyan))" />
          <stop offset="1" stopColor="hsl(var(--neon-purple))" />
        </linearGradient>
        <linearGradient
          id="paint27_linear_1_22"
          x1="1874.5"
          y1="0"
          x2="1874.5"
          y2="854"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="hsl(var(--electric-blue))" />
          <stop offset="1" stopColor="hsl(var(--cyber-cyan))" />
        </linearGradient>
        <linearGradient
          id="paint28_linear_1_22"
          x1="1951.5"
          y1="0"
          x2="1951.5"
          y2="854"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="hsl(var(--neon-purple))" />
          <stop offset="1" stopColor="hsl(var(--electric-blue))" />
        </linearGradient>
      </defs>
    </svg>
  );
};
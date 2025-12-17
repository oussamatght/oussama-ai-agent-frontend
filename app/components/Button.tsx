'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedButtonProps extends HTMLMotionProps<"button"> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
}

export function AnimatedButton({ 
  children, 
  variant = 'primary',
  className = '',
  ...props 
}: AnimatedButtonProps) {
  const baseStyles = "px-6 py-3 rounded-xl font-medium transition-all";
  
  const variantStyles = {
    primary: "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50 hover:from-purple-600 hover:to-pink-600",
    secondary: "bg-white/10 text-purple-300 hover:bg-white/20 border border-purple-500/20",
    ghost: "text-purple-300 hover:bg-white/10"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}

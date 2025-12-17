'use client';

import { motion } from 'framer-motion';

interface GlowingAvatarProps {
  letter: string;
  size?: 'sm' | 'md' | 'lg';
}

export function GlowingAvatar({ letter, size = 'md' }: GlowingAvatarProps) {
  const sizes = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-lg',
    lg: 'w-16 h-16 text-2xl',
  };

  return (
    <motion.div
      className={`relative ${sizes[size]} rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg shadow-purple-500/50`}
      animate={{
        boxShadow: [
          "0 0 20px rgba(168, 85, 247, 0.5)",
          "0 0 40px rgba(236, 72, 153, 0.5)",
          "0 0 20px rgba(168, 85, 247, 0.5)",
        ],
      }}
      transition={{ duration: 3, repeat: Infinity }}
    >
      {letter}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400 to-pink-400"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  );
}
'use client';

import { motion } from 'framer-motion';
import { User, Bot } from 'lucide-react';

interface MessageBubbleProps {
  role: 'user' | 'assistant';
  content: string;
  audioUrl?: string;
  voiceEnabled?: boolean;
  index?: number;
}

export function MessageBubble({ 
  role, 
  content, 
  audioUrl, 
  voiceEnabled,
  index = 0 
}: MessageBubbleProps) {
  const isUser = role === 'user';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`flex gap-3 max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
            isUser
              ? 'bg-gradient-to-br from-blue-500 to-cyan-500'
              : 'bg-gradient-to-br from-purple-500 to-pink-500'
          }`}
        >
          {isUser ? (
            <User size={16} className="text-white" />
          ) : (
            <Bot size={16} className="text-white" />
          )}
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`rounded-2xl px-4 py-3 ${
            isUser
              ? 'bg-gradient-to-br from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/30'
              : 'bg-white/10 backdrop-blur-md text-white border border-purple-500/20 shadow-lg'
          }`}
        >
          <p className="whitespace-pre-wrap leading-relaxed">{content}</p>
          {audioUrl && voiceEnabled && (
            <motion.audio
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              controls
              className="mt-2 w-full"
            >
              <source src={audioUrl} type="audio/mpeg" />
            </motion.audio>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
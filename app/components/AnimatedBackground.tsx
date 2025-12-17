
'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Settings, RotateCcw, Sparkles, User, Bot, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  audioUrl?: string;
}

function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, -50, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {typeof window !== 'undefined' && [...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-purple-400/30 rounded-full"
          initial={{
            x:10* (window?.innerWidth || 1000),
            y: 10 * (window?.innerHeight || 1000),
          }}
          animate={{
            x: 10 * (window?.innerWidth || 1000),
            y: 10 * (window?.innerHeight || 1000),
          }}
          transition={{
            duration: 10 * 10 + 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex gap-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 bg-purple-400 rounded-full"
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );
}

function GlowingAvatar({ letter }: { letter: string }) {
  return (
    <motion.div
      className="relative w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg shadow-purple-500/50"
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

function MessageBubble({ 
  msg, 
  index,
  voiceEnabled 
}: { 
  msg: Message; 
  index: number;
  voiceEnabled: boolean;
}) {
  const isUser = msg.role === 'user';
  
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
          <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
          {msg.audioUrl && voiceEnabled && (
            <motion.audio
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              controls
              className="mt-2 w-full"
            >
              <source src={msg.audioUrl} type="audio/mpeg" />
            </motion.audio>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

function SettingsPanel({ 
  show,
  voiceEnabled,
  onVoiceToggle,
  onClose 
}: { 
  show: boolean;
  voiceEnabled: boolean;
  onVoiceToggle: (enabled: boolean) => void;
  onClose: () => void;
}) {
  const [personality, setPersonality] = useState(80);

  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -20 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className="absolute top-20 right-4 bg-black/90 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6 w-80 shadow-2xl z-50"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-bold flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Settings
        </h3>
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="text-purple-300 hover:text-white"
        >
          <X size={20} />
        </motion.button>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="text-purple-300 text-sm block mb-2">
            Personality Intensity: {personality}%
          </label>
          <input 
          placeholder=' k'
            type="range"
            min="0"
            max="100"
            value={personality}
            onChange={(e) => setPersonality(Number(e.target.value))}
            className="w-full accent-purple-500"
          />
          <div className="flex justify-between text-xs text-purple-400 mt-1">
            <span>Professional</span>
            <span>Casual</span>
          </div>
        </div>

        <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
          <label className="text-purple-300 text-sm">Voice Responses</label>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onVoiceToggle(!voiceEnabled)}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              voiceEnabled ? 'bg-purple-500' : 'bg-gray-600'
            }`}
          >
            <motion.div
              className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full"
              animate={{ x: voiceEnabled ? 24 : 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </motion.button>
        </div>

        <div className="pt-4 border-t border-purple-500/20">
          <p className="text-purple-300 text-xs mb-2">Quick Actions</p>
          <div className="space-y-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full text-left px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-purple-300 text-sm"
            >
              Export Chat History
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full text-left px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-purple-300 text-sm"
            >
              Clear All Data
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Main Chat Interface Component
export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hey! I'm Oussama's AI agent. Cool to meet you! What's up?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setIsTyping(true);

    


     

       

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const resetConversation = () => {
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: "Fresh start! What's on your mind?",
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 relative overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-black/30 backdrop-blur-xl border-b border-purple-500/20 p-4 relative z-10"
      >
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            <GlowingAvatar letter="O" />
            <div>
              <h1 className="text-white font-bold text-lg flex items-center gap-2">
                Oussama s AI Agent
                <Sparkles className="w-4 h-4 text-purple-400" />
              </h1>
              <p className="text-purple-300 text-xs">Always online, always chill</p>
            </div>
          </motion.div>
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setVoiceEnabled(!voiceEnabled)}
              className={`p-3 rounded-xl transition-all ${
                voiceEnabled
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50'
                  : 'bg-white/10 text-purple-300 hover:bg-white/20'
              }`}
            >
              {voiceEnabled ? <Mic size={20} /> : <MicOff size={20} />}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetConversation}
              className="p-3 rounded-xl bg-white/10 text-purple-300 hover:bg-white/20 transition-all"
            >
              <RotateCcw size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowSettings(!showSettings)}
              className="p-3 rounded-xl bg-white/10 text-purple-300 hover:bg-white/20 transition-all"
            >
              <Settings size={20} />
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 relative z-10">
        <div className="max-w-4xl mx-auto space-y-6">
          <AnimatePresence mode="popLayout">
            {messages.map((msg, index) => (
              <MessageBubble 
                key={msg.id} 
                msg={msg} 
                index={index}
                voiceEnabled={voiceEnabled}
              />
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex justify-start"
              >
                <div className="flex gap-3 max-w-[80%]">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center"
                  >
                    <Bot size={16} className="text-white" />
                  </motion.div>
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl px-4 py-3 border border-purple-500/20">
                    <TypingIndicator />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-black/30 backdrop-blur-xl border-t border-purple-500/20 p-4 relative z-10"
      >
        <div className="max-w-4xl mx-auto flex gap-2">
          <motion.div
            className="flex-1 relative"
            whileFocus={{ scale: 1.01 }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="w-full bg-white/10 border border-purple-500/20 rounded-xl px-4 py-3 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              disabled={isLoading}
            />
            {input && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <Sparkles className="w-5 h-5 text-purple-400" />
              </motion.div>
            )}
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-500/50 flex items-center gap-2"
          >
            <Send size={20} />
            <span className="hidden sm:inline">Send</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Settings Panel */}
      <AnimatePresence>
        <SettingsPanel 
          show={showSettings}
          voiceEnabled={voiceEnabled}
          onVoiceToggle={setVoiceEnabled}
          onClose={() => setShowSettings(false)}
        />
      </AnimatePresence>
    </div>
  );
}}
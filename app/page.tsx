'use client';

import React, { useState, useRef, useEffect, KeyboardEvent, ChangeEvent } from 'react';
import { Send, Mic, Settings, Zap, Brain, MessageSquare, Sparkles } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function OussamaAIAgent() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hey! I'm Oussama's AI agent. Cool that you're here! What's on your mind?" }
  ]);
  const [input, setInput] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const responses = [
        "Let's see... that's a cool question! Here's what I think:",
        "All good! So basically what you're asking is...",
        "Yo, interesting point! From my perspective:",
        "Nice one! Here's the deal:"
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `${randomResponse} [This is a demo - connect to your backend API to get real responses from the GPT-4 powered agent with Oussama's personality]`
      }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <header className="relative border-b border-white/10 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Oussamas AI Agent</h1>
              <p className="text-xs text-gray-400">Powered by GPT-4</p>
            </div>
          </div>
        <button 
  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
  title='k'
>
  <Settings className="w-5 h-5" />
</button>

        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-7xl relative">
        <div className="grid lg:grid-cols-3 gap-8">

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Digital Clone
              </h2>
              <p className="text-gray-300 mb-6">
                An AI that speaks, thinks, and responds just like Oussama. Friendly, casual, and always helpful.
              </p>

              <div className="space-y-4">
                <FeatureCard
                  icon={<Brain className="w-5 h-5" />}
                  title="Memory"
                  description="Remembers past conversations and preferences"
                />
                <FeatureCard
                  icon={<MessageSquare className="w-5 h-5" />}
                  title="Personality"
                  description="Mimics Oussama's communication style"
                />
                <FeatureCard
                  icon={<Mic className="w-5 h-5" />}
                  title="Voice Clone"
                  description="Optional text-to-speech with Oussama's voice"
                />
                <FeatureCard
                  icon={<Zap className="w-5 h-5" />}
                  title="Task Execution"
                  description="Can search, schedule, and assist with tasks"
                />
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Mic className="w-5 h-5 text-purple-400" />
                  <span className="font-medium">Voice Responses</span>
                </div>
                <button
                title='s'
                  onClick={() => setVoiceEnabled(!voiceEnabled)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${voiceEnabled ? 'bg-purple-500' : 'bg-gray-600'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${voiceEnabled ? 'translate-x-7' : 'translate-x-1'}`}></div>
                </button>
              </div>
              <p className="text-sm text-gray-400">
                {voiceEnabled ? 'Voice synthesis enabled' : 'Text-only mode'}
              </p>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 flex flex-col h-[600px]">

              <div className="p-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center font-bold text-lg">
                    O
                  </div>
                  <div>
                    <h3 className="font-semibold">Oussamas Agent</h3>
                    <p className="text-sm text-gray-400">Online • Ready to chat</p>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                        : 'bg-white/10 text-gray-100'
                    }`}>
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white/10 rounded-2xl px-4 py-3">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              <div className="p-6 border-t border-white/10">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  />
             <button
             title='just send it'
  onClick={handleSend}
  disabled={!input.trim()}
  className="bg-gradient-to-r from-purple-500 to-blue-500 p-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
>
  <Send className="w-5 h-5" />
</button>

                </div>
               
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="relative border-t border-white/10 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-6 py-8 text-center text-gray-400">
          <p className="text-sm mt-2">Version 1.0 • 2025</p>
        </div>
      </footer>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="flex gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg flex items-center justify-center text-purple-400">
        {icon}
      </div>
      <div>
        <h4 className="font-medium mb-1">{title}</h4>
        <p className="text-xs text-gray-400">{description}</p>
      </div>
    </div>
  );
}

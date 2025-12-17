'use client';

import React, { useState, useRef, useEffect, KeyboardEvent, ChangeEvent } from 'react';
import { Send, Mic, Settings, Zap, Brain, MessageSquare, Sparkles } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function OussamaAIAgent() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hey! I'm Oussama's AI agent. What's on your mind?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    if (!voiceEnabled || messages.length === 0) return;

    const lastMsg = messages[messages.length - 1];
    if (lastMsg.role !== 'assistant') return;

    const utterance = new SpeechSynthesisUtterance(lastMsg.content);

    const arab = /[\u0600-\u06FF]/.test(lastMsg.content);
    const lang = arab ? 'ar-SA' : 'en-US';
    utterance.lang = lang;
    utterance.rate = 1;
    utterance.pitch = 0.9;

    const setVoice = () => {
      const voices = speechSynthesis.getVoices();
      const chosenVoice =
        voices.find(v => v.lang === lang && /male|ahmed|hassan|david|mark|george/i.test(v.name)) ||
        voices.find(v => v.lang === lang);

      if (chosenVoice) utterance.voice = chosenVoice;

      speechSynthesis.cancel();
      speechSynthesis.speak(utterance);
    };

    if (speechSynthesis.getVoices().length === 0) {
      speechSynthesis.onvoiceschanged = setVoice;
    } else setVoice();
  }, [messages, voiceEnabled]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await fetch(`https://oussama-ai-agent-backend.vercel.app/api/chat` ,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: input, sessionId })
        }
      );

      const data = await res.json();

      if (data.success) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
        setSessionId(data.sessionId);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${data.error}` }]);
      }
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: "Server error, try again later." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      
      <header className="border-b border-white/10 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold">Oussamas AI Agent</h1>
              <p className="text-xs text-gray-400">Powered by GPT-4</p>
            </div>
          </div>

          <button className="p-2 hover:bg-white/10 rounded-lg transition" title="Settings">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-10 space-y-8">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <div className="space-y-6">
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
              <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Digital Clone
              </h2>
              <p className="text-gray-300 mb-6 text-sm">
                An AI that speaks, thinks, and responds like Oussama. Friendly and helpful.
              </p>

              <div className="space-y-4">
                <FeatureCard icon={<Brain />} title="Memory" description="Remembers conversations" />
                <FeatureCard icon={<MessageSquare />} title="Personality" description="Talks like Oussama" />
                <FeatureCard icon={<Mic />} title="Voice Clone" description="Male AI voice" />
                <FeatureCard icon={<Zap />} title="Task Execution" description="Search & automation" />
              </div>
            </div>

            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Mic className="w-5 text-purple-400" />
                  <span className="font-medium text-sm">Voice Responses</span>
                </div>

                <button
                title='w'
                  onClick={() => setVoiceEnabled(!voiceEnabled)}
                  className={`relative w-12 h-6 rounded-full transition ${voiceEnabled ? 'bg-purple-500' : 'bg-gray-600'}`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      voiceEnabled ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              <p className="text-xs text-gray-400">{voiceEnabled ? 'Voice enabled' : 'Text only mode'}</p>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white/5 border border-white/10 rounded-2xl flex flex-col h-[70vh] sm:h-[600px]">
              
              <div className="p-4 sm:p-6 border-b border-white/10 flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center font-bold text-lg">
                  O
                </div>
                <div>
                  <h3 className="font-semibold text-sm sm:text-base">Oussama’s Agent</h3>
                  <p className="text-xs text-gray-400">Online • Ready</p>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[90%] sm:max-w-[80%] px-4 py-3 rounded-2xl text-sm ${
                        msg.role === 'user'
                          ? 'bg-gradient-to-r from-purple-500 to-blue-500'
                          : 'bg-white/10'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white/10 px-4 py-3 rounded-2xl flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              <div className="p-4 sm:p-6 border-t border-white/10 flex gap-3">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type..."
                  className="flex-1 bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-sm placeholder-gray-400 focus:ring-2 focus:ring-purple-500 outline-none"
                />
                <button
                title="Send"
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 p-3 rounded-xl disabled:opacity-40"
                >
                  <Send className="w-5" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      <footer className="border-t border-white/10 text-center text-gray-400 py-6">
        <p className="text-xs">Version 1.0 • 2025</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
      <div className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg flex items-center justify-center text-purple-300">
        {icon}
      </div>
      <div>
        <h4 className="font-medium text-sm mb-1">{title}</h4>
        <p className="text-xs text-gray-400">{description}</p>
      </div>
    </div>
  );
}

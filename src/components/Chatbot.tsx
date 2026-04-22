import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, Trash2 } from 'lucide-react';

const QA_RULES = [
  {
    keywords: ['route', 'safer', 'best route'],
    response: "Route B is safer due to lower heat exposure and better shaded paths."
  },
  {
    keywords: ['time', 'travel', 'when'],
    response: "5:00 PM is recommended as it reduces heat exposure by 30–40%."
  },
  {
    keywords: ['heat', 'risk'],
    response: "Heat risk indicates exposure to high temperatures. Lower values mean safer travel."
  },
  {
    keywords: ['why', 'better'],
    response: "It avoids high heat zones and passes through shaded areas."
  },
  {
    keywords: ['do', 'hydration', 'should i'],
    response: "Stay hydrated and avoid travel during peak heat hours."
  }
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm your HeatSafe Assistant. How can I help you today?", isBot: true, time: new Date() }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isOpen]);

  const handleSend = (text?: string) => {
    const userText = text || input;
    if (!userText.trim()) return;

    // Add user message
    const newUserMsg = { id: Date.now(), text: userText, isBot: false, time: new Date() };
    setMessages(prev => [...prev, newUserMsg]);
    setInput("");
    setIsTyping(true);

    // Find bot response
    const lowerInput = userText.toLowerCase();
    let botResponse = "I can help with routes, heat risk, and safe travel suggestions.";
    
    for (const rule of QA_RULES) {
      if (rule.keywords.some(kw => lowerInput.includes(kw))) {
        botResponse = rule.response;
        break;
      }
    }

    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now() + 1, text: botResponse, isBot: true, time: new Date() }]);
      setIsTyping(false);
    }, 1200); // Simulate typing delay
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const clearChat = () => {
    setMessages([{ id: Date.now(), text: "Chat cleared. How can I help?", isBot: true, time: new Date() }]);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 p-4 rounded-full shadow-2xl transition-all duration-300 z-50 bg-gradient-to-br from-orange-500 to-pink-500 text-white hover:scale-110 shadow-[0_0_20px_rgba(249,115,22,0.4)] ${isOpen ? "scale-0 opacity-0 pointer-events-none" : "scale-100 opacity-100"}`}
      >
        <MessageCircle className="w-7 h-7" />
      </button>

      {/* Chat Panel */}
      <div
        className={`fixed bottom-6 right-6 w-[320px] h-[500px] flex flex-col transition-all duration-500 z-50 origin-bottom-right bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden ${isOpen ? "scale-100 opacity-100 translate-y-0" : "scale-50 opacity-0 pointer-events-none translate-y-10"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-500/10 to-pink-500/10 dark:from-orange-500/20 dark:to-pink-500/20 border-b border-slate-200/50 dark:border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center text-white shadow-md">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white leading-tight">HeatSafe Assistant</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Ask about routes, heat, safety</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={clearChat} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors" aria-label="Clear chat">
              <Trash2 className="w-4 h-4" />
            </button>
            <button onClick={() => setIsOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors" aria-label="Close chat">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ scrollbarWidth: 'thin' }}>
          {messages.map((msg) => (
            <div key={msg.id} className={`flex flex-col animate-in fade-in slide-in-from-bottom-2 duration-300 ${msg.isBot ? "items-start" : "items-end"}`}>
              <div
                className={`max-w-[85%] p-3 rounded-2xl shadow-sm text-sm ${msg.isBot ? "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-sm" : "bg-gradient-to-br from-orange-500 to-pink-500 text-white rounded-tr-sm"}`}
              >
                {msg.text}
              </div>
              <span className="text-[10px] text-slate-400 mt-1 px-1">{formatTime(msg.time)}</span>
            </div>
          ))}
          {isTyping && (
            <div className="flex items-start">
              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-1 w-16 h-10">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        <div className="px-4 py-2 flex gap-2 overflow-x-auto border-t border-slate-100 dark:border-slate-800" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {['Best route?', 'Heat risk?', 'Travel time?'].map((btn) => (
            <button
              key={btn}
              onClick={() => handleSend(btn)}
              className="whitespace-nowrap px-3 py-1.5 text-xs font-medium rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700"
            >
              {btn}
            </button>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-3 bg-slate-50 dark:bg-slate-900 border-t border-slate-200/50 dark:border-slate-700/50">
          <div className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
              className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full py-2.5 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 text-slate-900 dark:text-white"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim()}
              className="absolute right-2 p-1.5 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

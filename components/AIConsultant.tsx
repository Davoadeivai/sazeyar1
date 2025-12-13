import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Loader2 } from 'lucide-react';
import { GeminiService } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIConsultant = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'سلام! من دستیار هوشمند سازه‌یار هستم. چطور می‌تونم در مورد ساخت‌وساز، بازسازی، یا برآورد هزینه‌ها به شما کمک کنم؟',
      timestamp: Date.now()
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const responseText = await GeminiService.getConstructionAdvice(userMsg.text);
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 h-[600px] flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-brand-900 to-blue-800 p-4 flex items-center gap-3 text-white">
        <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
          <Sparkles size={24} className="text-yellow-300" />
        </div>
        <div>
          <h3 className="font-bold text-lg">مشاور هوشمند سازه‌یار</h3>
          <p className="text-xs text-blue-100 opacity-90">پاسخگویی آنی با هوش مصنوعی</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
              msg.role === 'user' ? 'bg-gray-200' : 'bg-brand-100'
            }`}>
              {msg.role === 'user' ? <User size={20} className="text-gray-600" /> : <Bot size={20} className="text-brand-600" />}
            </div>
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm ${
                msg.role === 'user'
                  ? 'bg-brand-500 text-white rounded-tr-none'
                  : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
              }`}
            >
              {msg.role === 'model' ? (
                <div className="prose prose-sm prose-p:my-1 prose-headings:my-2 max-w-none text-right" dangerouslySetInnerHTML={{ 
                  __html: msg.text
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Simple bold parser
                    .replace(/\n/g, '<br/>') 
                }} />
              ) : (
                <p className="text-sm leading-relaxed">{msg.text}</p>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center">
              <Bot size={20} className="text-brand-600" />
            </div>
            <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm flex items-center gap-2">
              <Loader2 size={16} className="animate-spin text-brand-500" />
              <span className="text-sm text-gray-500">در حال تایپ...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-gray-100">
        <div className="flex gap-2 relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="مثلا: هزینه بازسازی آشپزخانه ۱۰ متری چقدر است؟"
            className="flex-grow bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all placeholder:text-gray-400"
            disabled={loading}
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="bg-brand-500 hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl p-3 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-brand-500/20"
          >
            <Send size={20} className={loading ? 'opacity-0' : 'opacity-100'} />
            {loading && <Loader2 size={20} className="absolute top-3 right-3 animate-spin" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIConsultant;
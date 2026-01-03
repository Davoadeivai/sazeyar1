import React, { useState, useRef, useEffect } from 'react';
import { Send, Upload, Mic, MicOff, Camera, Loader2, Sparkles, User, Bot, Volume2, VolumeX, Image as ImageIcon, Video, X } from 'lucide-react';
import { GeminiService } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIConsultant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedFile, setSelectedFile] = useState<{ file: File; preview: string; type: 'image' | 'video' } | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);
  const [currentlySpeaking, setCurrentlySpeaking] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const toggleRecording = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return alert('مرورگر شما پشتیبانی نمی‌کند.');

    if (isRecording) {
      recognitionRef.current?.stop();
    } else {
      const recognition = new SpeechRecognition();
      recognition.lang = 'fa-IR';
      recognition.onstart = () => setIsRecording(true);
      recognition.onresult = (e: any) => setInput(e.results[0][0].transcript);
      recognition.onend = () => setIsRecording(false);
      recognitionRef.current = recognition;
      recognition.start();
    }
  };

  const speakText = (text: string) => {
    if (currentlySpeaking) return window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fa-IR';
    utterance.onstart = () => setCurrentlySpeaking(true);
    utterance.onend = () => setCurrentlySpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const type = file.type.startsWith('image/') ? 'image' : 'video';
      const reader = new FileReader();
      reader.onloadend = () => setSelectedFile({ file, preview: reader.result as string, type });
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async () => {
    if (!input.trim() && !selectedFile) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input || (selectedFile?.type === 'image' ? '🖼️ تحلیل تصویر ارسالی' : '📹 تحلیل ویدیو ارسالی'),
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      let mediaData;
      if (selectedFile) {
        mediaData = { mimeType: selectedFile.file.type, data: selectedFile.preview.split(',')[1] };
      }

      const responseText = await GeminiService.getConstructionAdvice(userMessage.text, mediaData);
      const botMessage: ChatMessage = { id: (Date.now() + 1).toString(), role: 'model', text: responseText, timestamp: Date.now() };

      setMessages(prev => [...prev, botMessage]);
      setSelectedFile(null);
      if (isSpeaking) speakText(responseText);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[650px] bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100 ring-1 ring-black/5">
      {/* Header */}
      <div className="bg-gray-900 p-5 text-white flex justify-between items-center shrink-0">
        <div className="flex items-center gap-3">
          <div className="bg-brand-500 p-2.5 rounded-2xl shadow-lg shadow-brand-500/20">
            <Sparkles size={20} className="text-yellow-300 animate-pulse" />
          </div>
          <div>
            <h3 className="font-bold text-sm">هوش مصنوعی هرمس</h3>
            <span className="text-[10px] text-green-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-ping"></span>
              آنالیزور آنلاین متریال
            </span>
          </div>
        </div>
        <button onClick={() => setIsSpeaking(!isSpeaking)} className={`p-2 rounded-xl transition-all ${isSpeaking ? 'bg-brand-500' : 'bg-white/10'}`}>
          {isSpeaking ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </button>
      </div>

      {/* Messages */}
      <div className="flex-grow overflow-y-auto p-5 space-y-6 bg-gray-50/30">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`shrink-0 w-9 h-9 rounded-2xl flex items-center justify-center shadow-md ${msg.role === 'user' ? 'bg-gray-900 text-white' : 'bg-white text-brand-500 border border-brand-50'
              }`}>
              {msg.role === 'user' ? <User size={18} /> : <Bot size={18} />}
            </div>
            <div className={`max-w-[85%] group ${msg.role === 'user' ? 'text-left' : 'text-right'}`}>
              <div className={`p-4 rounded-[1.5rem] shadow-sm text-sm leading-relaxed ${msg.role === 'user' ? 'bg-gray-900 text-white rounded-tr-none' : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
                }`}>
                {msg.text}
              </div>
              <span className="text-[10px] text-gray-400 mt-2 block px-1">
                {new Date(msg.timestamp).toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-3">
            <div className="shrink-0 w-9 h-9 rounded-2xl bg-white text-brand-500 border border-brand-50 flex items-center justify-center shadow-md">
              <Bot size={18} />
            </div>
            <div className="bg-white p-4 rounded-[1.5rem] rounded-tl-none border border-gray-100 shadow-sm flex items-center gap-2">
              <Loader2 size={16} className="animate-spin text-brand-500" />
              <span className="text-xs text-gray-400 font-bold">در حال پردازش داده‌های مهندسی...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-5 bg-white border-t border-gray-100">
        {selectedFile && (
          <div className="mb-4 p-3 bg-gray-50 rounded-2xl flex items-center justify-between border border-gray-100 animate-in slide-in-from-bottom-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden border border-gray-200">
                {selectedFile.type === 'image' ? <img src={selectedFile.preview} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-gray-200 flex items-center justify-center"><Video size={20} /></div>}
              </div>
              <p className="text-xs font-bold text-gray-600">آماده تحلیل دیداری</p>
            </div>
            <button onClick={() => setSelectedFile(null)} className="p-1.5 hover:bg-red-50 text-red-500 rounded-lg transition-colors"><X size={18} /></button>
          </div>
        )}

        <div className="flex items-center gap-2">
          <div className="relative flex-grow">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="سوال یا عکسی از محیط بفرستید..."
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 pr-14 pl-14 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
            />
            <button onClick={() => fileInputRef.current?.click()} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-brand-500 transition-colors">
              <Camera size={20} />
            </button>
            <button onClick={toggleRecording} className={`absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-all ${isRecording ? 'bg-red-500 text-white animate-pulse' : 'text-gray-400 hover:text-indigo-600'}`}>
              {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
            </button>
            <input type="file" ref={fileInputRef} hidden accept="image/*,video/*" onChange={handleFileChange} />
          </div>

          <button onClick={handleSend} disabled={loading || (!input.trim() && !selectedFile)} className="bg-gray-900 text-white p-4 rounded-2xl shadow-xl hover:bg-brand-600 disabled:opacity-50 transition-all">
            <Send size={20} className="rtl:rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIConsultant;

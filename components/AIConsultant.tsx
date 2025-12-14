import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Loader2, Mic, MicOff, Volume2, VolumeX, Paperclip, X, Image as ImageIcon, Video } from 'lucide-react';
import { GeminiService } from '../services/geminiService';
import { StorageService } from '../services/storageService';
import { ChatMessage } from '../types';

// Declare global types for Web Speech API
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

const AIConsultant = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentUser = StorageService.getCurrentUser();

  // New Features State
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false); // Toggle for auto-read
  const [currentlySpeaking, setCurrentlySpeaking] = useState(false); // Status of synthesis
  const [selectedFile, setSelectedFile] = useState<{ file: File; preview: string; type: 'image' | 'video' } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  // Load chat history
  useEffect(() => {
    if (currentUser) {
      const history = StorageService.getChatHistory(currentUser.id);
      if (history.length > 0) {
        setMessages(history);
      } else {
        setMessages([{
          id: 'welcome',
          role: 'model',
          text: `سلام ${currentUser.fullName} عزیز! 👋 \nمن دستیار هوشمند سازه‌یار هستم. می‌تونی با من صحبت کنی، عکس یا ویدیو از پروژه بفرستی تا راهنماییت کنم.`,
          timestamp: Date.now()
        }]);
      }
    } else {
       setMessages([{
          id: 'welcome_guest',
          role: 'model',
          text: 'سلام! 👋 من دستیار هوشمند سازه‌یار هستم. می‌تونید با من صحبت کنید یا تصویر پروژه‌تون رو بفرستید.',
          timestamp: Date.now()
        }]);
    }
  }, [currentUser?.id]);

  useEffect(() => { scrollToBottom(); }, [messages, selectedFile]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // --- Speech to Text Logic ---
  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const startRecording = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('مرورگر شما از قابلیت تبدیل گفتار به نوشتار پشتیبانی نمی‌کند.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.lang = 'fa-IR';
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;

    recognitionRef.current.onstart = () => setIsRecording(true);
    recognitionRef.current.onend = () => setIsRecording(false);
    
    recognitionRef.current.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(prev => prev + ' ' + transcript);
    };

    recognitionRef.current.start();
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  // --- Text to Speech Logic ---
  const speakText = (text: string) => {
    if (!isSpeaking) return;
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    // Clean markdown for speech (remove *, #, -, links)
    const cleanText = text.replace(/[*#\-]/g, '').replace(/\[(.*?)\]\(.*?\)/g, '$1');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'fa-IR';
    utterance.rate = 0.9; // Slightly slower for better clarity
    
    // Try to find a female/better voice if available
    const voices = window.speechSynthesis.getVoices();
    // Heuristic: Look for Google voices or specific Persian voices, defaulting to system default
    const persianVoice = voices.find(v => v.lang === 'fa-IR' || v.lang === 'fa');
    if (persianVoice) utterance.voice = persianVoice;

    utterance.onstart = () => setCurrentlySpeaking(true);
    utterance.onend = () => setCurrentlySpeaking(false);
    
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setCurrentlySpeaking(false);
  };

  // --- File Handling ---
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size (limit to 10MB approx)
    if (file.size > 10 * 1024 * 1024) {
      alert('حجم فایل نباید بیشتر از ۱۰ مگابایت باشد.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedFile({
        file,
        preview: reader.result as string,
        type: file.type.startsWith('video') ? 'video' : 'image'
      });
    };
    reader.readAsDataURL(file);
    
    // Reset input
    e.target.value = '';
  };

  const removeFile = () => {
    setSelectedFile(null);
  };

  // --- Sending Message ---
  const handleSend = async () => {
    if ((!input.trim() && !selectedFile) || loading) return;

    // Prepare media object if file selected
    let mediaData = undefined;
    if (selectedFile) {
        // Remove Data URL prefix to get raw base64
        const base64Data = selectedFile.preview.split(',')[1];
        mediaData = {
            mimeType: selectedFile.file.type,
            data: base64Data
        };
    }

    const userMsgText = input.trim(); 
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: userMsgText || (selectedFile ? `[فایل پیوست: ${selectedFile.type === 'image' ? 'عکس' : 'ویدیو'}]` : ''),
      timestamp: Date.now()
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    const currentFile = selectedFile; // Capture for display in message bubble logic if we wanted to show it in history UI later
    setSelectedFile(null); // Clear selection
    setLoading(true);

    if (currentUser) {
        StorageService.saveChatHistory(currentUser.id, newMessages);
    }

    try {
      // Call Gemini Service with text + optional media
      const responseText = await GeminiService.getConstructionAdvice(userMsgText || 'لطفا این فایل را تحلیل کن.', mediaData);
      
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: Date.now()
      };
      
      const finalMessages = [...newMessages, aiMsg];
      setMessages(finalMessages);
      
      if (currentUser) {
          StorageService.saveChatHistory(currentUser.id, finalMessages);
      }

      // Auto-speak response
      if (isSpeaking) {
          speakText(responseText);
      }

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-brand-500/10 overflow-hidden border border-gray-100 h-[650px] flex flex-col transform transition-all hover:scale-[1.005]">
      {/* Colorful Header */}
      <div className="bg-gradient-to-r from-brand-500 via-brand-600 to-happy-orange p-4 flex items-center justify-between text-white relative overflow-hidden">
        <div className="flex items-center gap-4 relative z-10">
            <div className="bg-white/20 p-2 rounded-2xl backdrop-blur-md border border-white/20 shadow-inner">
                <Sparkles size={22} className="text-yellow-300 animate-pulse" />
            </div>
            <div>
                <h3 className="font-bold text-lg">مشاور هوشمند</h3>
                <p className="text-xs text-brand-50 opacity-90">آنلاین | قابلیت تحلیل عکس و ویدیو</p>
            </div>
        </div>
        
        {/* Header Controls */}
        <div className="relative z-10 flex gap-2">
            <button 
                onClick={() => {
                    if(currentlySpeaking) stopSpeaking();
                    setIsSpeaking(!isSpeaking);
                }}
                className={`p-2 rounded-full transition-all ${isSpeaking ? 'bg-white text-brand-600' : 'bg-white/20 text-white hover:bg-white/30'}`}
                title={isSpeaking ? 'غیرفعال کردن صدای مشاور' : 'فعال کردن صدای مشاور'}
            >
                {isSpeaking ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-grow overflow-y-auto p-4 space-y-6 bg-slate-50 relative">
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-end gap-3 relative z-10 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md ${
              msg.role === 'user' 
                ? 'bg-gradient-to-br from-gray-700 to-gray-900 text-white' 
                : 'bg-gradient-to-br from-white to-brand-50 text-brand-600 border border-brand-100'
            }`}>
              {msg.role === 'user' ? <User size={20} /> : <Bot size={22} />}
            </div>
            
            <div
              className={`max-w-[80%] rounded-2xl px-5 py-3.5 shadow-sm text-sm leading-7 ${
                msg.role === 'user'
                  ? 'bg-gray-800 text-white rounded-br-none'
                  : 'bg-white text-gray-700 border border-gray-100 rounded-bl-none'
              }`}
            >
              {msg.role === 'model' ? (
                <div className="markdown-body" dangerouslySetInnerHTML={{ 
                  __html: msg.text
                    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-brand-600 font-bold">$1</strong>')
                    .replace(/^- (.*)/gm, '<li class="list-disc ml-4">$1</li>')
                    .replace(/\n/g, '<br/>') 
                }} />
              ) : (
                <p>{msg.text}</p>
              )}
              <span className={`text-[10px] block mt-2 opacity-50 ${msg.role === 'user' ? 'text-left' : 'text-right'}`}>
                  {new Date(msg.timestamp).toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-2xl bg-white border border-brand-100 flex items-center justify-center">
                 <Bot size={20} className="text-brand-500" />
             </div>
             <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-none border border-gray-100 shadow-sm flex items-center gap-2">
                 <span className="text-xs text-gray-500 font-bold">در حال تفکر و تحلیل...</span>
                 <div className="flex space-x-1 space-x-reverse">
                    <div className="w-2 h-2 bg-brand-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-brand-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-brand-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                 </div>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 bg-white border-t border-gray-100">
        
        {/* File Preview */}
        {selectedFile && (
            <div className="mx-2 mb-2 p-2 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between animate-in slide-in-from-bottom-2">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-200 relative">
                        {selectedFile.type === 'image' ? (
                            <img src={selectedFile.preview} className="w-full h-full object-cover" alt="Preview" />
                        ) : (
                            <video src={selectedFile.preview} className="w-full h-full object-cover" />
                        )}
                    </div>
                    <div>
                        <span className="text-xs font-bold text-gray-700 block">فایل ضمیمه شد</span>
                        <span className="text-[10px] text-gray-400">{selectedFile.type === 'image' ? 'تصویر' : 'ویدیو'} آماده ارسال</span>
                    </div>
                </div>
                <button onClick={removeFile} className="bg-red-50 text-red-500 p-1.5 rounded-lg hover:bg-red-100 transition-colors">
                    <X size={16} />
                </button>
            </div>
        )}

        <div className="flex gap-2 items-end">
           {/* Attachment Button */}
           <button 
             onClick={() => fileInputRef.current?.click()}
             className="bg-gray-50 text-gray-500 hover:text-brand-600 hover:bg-brand-50 p-3 rounded-xl transition-all border border-gray-200"
             title="ارسال عکس یا ویدیو"
           >
             <Paperclip size={20} />
             <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*,video/*" 
                onChange={handleFileSelect}
             />
           </button>

           {/* Text Input */}
           <div className="flex-grow bg-gray-50 border border-gray-200 rounded-2xl p-2 focus-within:ring-2 focus-within:ring-brand-500/50 focus-within:bg-white transition-all shadow-inner flex items-center">
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSend();
                        }
                    }}
                    placeholder={isRecording ? 'در حال گوش دادن...' : 'پیام بنویسید یا صحبت کنید...'}
                    className="flex-grow bg-transparent border-none text-gray-800 text-sm px-3 py-2 focus:outline-none resize-none max-h-24 overflow-y-auto"
                    rows={1}
                    disabled={loading || isRecording}
                />
                
                {/* Mic Button */}
                <button 
                    onClick={toggleRecording}
                    className={`p-2 rounded-xl transition-all ${isRecording ? 'bg-red-500 text-white animate-pulse shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
                    title={isRecording ? 'توقف ضبط' : 'صحبت کنید'}
                >
                    {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
                </button>
           </div>

           {/* Send Button */}
           <button
            onClick={handleSend}
            disabled={loading || (!input.trim() && !selectedFile)}
            className="bg-brand-500 hover:bg-brand-600 disabled:opacity-50 disabled:scale-100 text-white rounded-xl p-3 transition-all hover:scale-110 active:scale-95 shadow-lg shadow-brand-500/30 h-[46px] w-[46px] flex items-center justify-center"
          >
            {loading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} className={loading ? 'hidden' : 'block rtl:rotate-180'} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIConsultant;
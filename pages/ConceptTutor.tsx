
import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { geminiService } from '../services/geminiService';
import { Difficulty } from '../types';
import { useUser } from '../context/UserContext';

interface Message {
  role: 'user' | 'ai';
  content: string;
}

const ConceptTutor: React.FC = () => {
  const { preferences, updateStats } = useUser();
  const location = useLocation();
  const [input, setInput] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>(preferences.difficulty);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', content: `Namaste ${preferences.userName.split(' ')[0]} friend! I am CodeSakhi. Which logical maze can I help you navigate today? I'm right here with you!` }
  ]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q');
    if (query) {
      handleSend(query);
    }
  }, [location.search]);

  const handleSend = async (customInput?: string) => {
    const userMsg = customInput || input;
    if (!userMsg.trim() || loading) return;

    if (!customInput) setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      const response = await geminiService.tutorConcept(userMsg, difficulty, preferences.userName);
      setMessages(prev => [...prev, { role: 'ai', content: response }]);
      updateStats('conceptsLearned');
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', content: "Oh no friend! My sync skipped a beat. Let's try that again, don't worry!" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] animate-in max-w-4xl mx-auto pb-4">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-2">
        <div className="space-y-1">
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">Sakhi Chat ☕</h1>
          <p className="text-xs text-slate-500 font-medium italic">"Conversations that make coding feel like a breeze."</p>
        </div>
        <div className="flex bg-white rounded-xl p-1 border border-slate-100 shadow-sm self-start">
          {[Difficulty.BEGINNER, Difficulty.INTERMEDIATE].map(d => (
            <button 
              key={d} 
              onClick={() => setDifficulty(d)} 
              className={`px-5 py-2 rounded-lg text-[10px] font-black transition-all uppercase tracking-widest ${
                difficulty === d ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-indigo-600'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 sakhi-card p-6 lg:p-10 mb-6 overflow-y-auto space-y-8 scroll-smooth bg-white shadow-xl border-none hide-scrollbar relative">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in`}>
            <div className={`max-w-[85%] sm:max-w-[75%] rounded-[1.5rem] px-6 py-4 shadow-sm text-sm lg:text-base leading-relaxed relative ${
              msg.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-tr-none' 
                : 'bg-slate-50 text-slate-700 rounded-tl-none border border-slate-100'
            }`}>
              {msg.role === 'ai' && (
                <div className="absolute -top-6 left-0 text-[9px] font-black text-slate-300 uppercase tracking-widest">CodeSakhi</div>
              )}
              {msg.role === 'user' && (
                <div className="absolute -top-6 right-0 text-[9px] font-black text-indigo-300 uppercase tracking-widest">{preferences.userName.split(' ')[0]}</div>
              )}
              <div className="whitespace-pre-wrap font-medium">
                {msg.content}
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start animate-in">
            <div className="bg-slate-50 text-slate-400 rounded-2xl px-6 py-4 rounded-tl-none border border-slate-100 shadow-sm flex items-center gap-3">
              <div className="flex gap-1">
                 <span className="w-1.5 h-1.5 bg-indigo-300 rounded-full animate-bounce"></span>
                 <span className="w-1.5 h-1.5 bg-indigo-300 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                 <span className="w-1.5 h-1.5 bg-indigo-300 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 ml-2">Sakhi is thinking...</span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="flex gap-3 items-center bg-white p-2.5 rounded-2xl border border-slate-200 shadow-2xl focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-50 transition-all mx-1">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder={`Talk to me, ${preferences.userName.split(' ')[0]}...`}
          className="flex-1 bg-transparent px-5 py-3.5 outline-none text-slate-700 font-medium text-sm lg:text-base placeholder:text-slate-300"
        />
        <button 
          onClick={() => handleSend()}
          disabled={!input.trim() || loading}
          className="bg-indigo-600 text-white w-14 h-14 rounded-xl flex items-center justify-center hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 disabled:opacity-20 active:scale-90 shrink-0"
        >
          <i className="fa-solid fa-paper-plane text-lg"></i>
        </button>
      </div>
    </div>
  );
};

export default ConceptTutor;

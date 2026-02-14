
import React, { useState } from 'react';
import { geminiService } from '../services/geminiService';
import { useUser } from '../context/UserContext';

const NotesSummary: React.FC = () => {
  const { preferences, updateStats } = useUser();
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ bulletPoints: string[], summary: string, flashCards: any[] } | null>(null);

  const handleSummarize = async () => {
    if (!notes.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const data = await geminiService.summarizeNotes(notes, preferences.userName);
      setResult(data);
      updateStats('conceptsLearned', 1);
    } catch (err) {
      alert("Sakhi's summary machine is a bit jammed. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-in space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-1">
        <div className="space-y-2">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center text-white shadow-xl"><i className="fa-solid fa-wand-magic-sparkles text-xl"></i></div>
             <h1 className="text-3xl font-black text-slate-800 tracking-tight leading-none">Notes Alchemist ✨</h1>
          </div>
          <p className="text-base text-slate-500 font-medium italic border-l-2 border-amber-100 pl-4">"Transmute lecture chaos into structured study gold."</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Input Controls */}
        <div className="lg:col-span-5 space-y-6">
           <div className="sakhi-card p-6 lg:p-8 space-y-6 bg-white border-none shadow-xl h-[600px] flex flex-col">
              <div className="flex items-center justify-between px-1">
                 <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Input Stream</h3>
                 <i className="fa-solid fa-file-invoice text-amber-100"></i>
              </div>
              <textarea
                className="flex-1 w-full p-6 bg-slate-50 rounded-2xl outline-none border border-slate-100 text-slate-700 text-sm font-medium resize-none shadow-inner focus:border-amber-400 transition-colors"
                placeholder="Paste your raw, messy notes, lecture transcripts, or textbook snippets here..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
              <button
                onClick={handleSummarize}
                disabled={loading || !notes.trim()}
                className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-amber-100 transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50"
              >
                {loading ? <i className="fa-solid fa-spinner animate-spin"></i> : <i className="fa-solid fa-flask"></i>}
                Alchemy Protocol
              </button>
           </div>
        </div>

        {/* Results Stream */}
        <div className="lg:col-span-7 overflow-y-auto max-h-[800px] pr-2 hide-scrollbar">
           {!result && !loading && (
             <div className="sakhi-card p-16 h-[600px] flex flex-col items-center justify-center text-center space-y-6 border-dashed border-2 bg-transparent opacity-40">
                <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center text-slate-400"><i className="fa-solid fa-layer-group text-4xl"></i></div>
                <div className="space-y-1">
                   <h3 className="text-xl font-black text-slate-800 tracking-tight">Synthesizer Standby</h3>
                   <p className="text-sm font-medium italic">"Waiting for your lecture streams."</p>
                </div>
             </div>
           )}

           {loading && (
             <div className="space-y-8 h-full">
               <div className="sakhi-card p-8 shimmer h-32"></div>
               <div className="sakhi-card p-8 shimmer h-64"></div>
               <div className="sakhi-card p-8 shimmer h-48"></div>
             </div>
           )}

           {result && !loading && (
             <div className="space-y-10 animate-in pb-10">
                <section className="sakhi-card p-8 bg-white">
                   <div className="flex items-center gap-3 mb-8">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm shadow-sm"><i className="fa-solid fa-bolt"></i></div>
                      <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Atomic Nuggets</h3>
                   </div>
                   <ul className="space-y-5">
                      {result.bulletPoints.map((point, i) => (
                        <li key={i} className="flex gap-4 group">
                          <i className="fa-solid fa-diamond text-[8px] text-indigo-400 mt-1.5 transition-transform group-hover:rotate-45"></i>
                          <span className="text-slate-700 font-bold leading-relaxed">{point}</span>
                        </li>
                      ))}
                   </ul>
                </section>

                <section className="sakhi-card p-8 bg-slate-900 text-white relative overflow-hidden group">
                   <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:rotate-12 transition-transform duration-700">
                      <i className="fa-solid fa-quote-right text-9xl"></i>
                   </div>
                   <div className="flex items-center gap-3 mb-6 relative z-10">
                      <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-300 flex items-center justify-center text-sm"><i className="fa-solid fa-feather"></i></div>
                      <h3 className="text-[11px] font-black text-indigo-400 uppercase tracking-widest">The Core Essence</h3>
                   </div>
                   <p className="text-lg lg:text-xl text-slate-200 font-black italic leading-relaxed relative z-10 underline decoration-indigo-500/50 underline-offset-8">
                      "{result.summary}"
                   </p>
                </section>

                <section className="space-y-6">
                   <div className="flex items-center justify-between px-1">
                      <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-3">
                        <i className="fa-solid fa-layer-group text-amber-500"></i> Active Recall Deck
                      </h3>
                      <span className="text-[10px] font-bold text-slate-300 italic">Hover to Flip</span>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {result.flashCards.map((card, i) => (
                        <div key={i} className="group h-48 perspective">
                           <div className="relative w-full h-full transition-all duration-500 preserve-3d group-hover:rotate-y-180 cursor-pointer">
                              <div className="absolute inset-0 sakhi-card p-6 flex flex-col items-center justify-center text-center backface-hidden">
                                 <span className="text-[9px] font-black uppercase text-amber-500 mb-3">Concept Q</span>
                                 <p className="text-slate-800 font-black text-sm leading-snug">{card.question}</p>
                              </div>
                              <div className="absolute inset-0 sakhi-card p-6 flex flex-col items-center justify-center text-center bg-indigo-600 text-white rotate-y-180 backface-hidden">
                                 <span className="text-[9px] font-black uppercase text-indigo-200 mb-3">Answer</span>
                                 <p className="text-xs font-bold leading-relaxed">{card.answer}</p>
                              </div>
                           </div>
                        </div>
                      ))}
                   </div>
                </section>
             </div>
           )}
        </div>
      </div>
      <style>{`
        .perspective { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .backface-hidden { backface-visibility: hidden; }
      `}</style>
    </div>
  );
};

export default NotesSummary;

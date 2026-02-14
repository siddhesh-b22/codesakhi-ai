
import React, { useState } from 'react';
import { geminiService } from '../services/geminiService';
import { useUser } from '../context/UserContext';

const NotesAlchemist: React.FC = () => {
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
      alert("Furnace cooled down too fast, yaar! Let's try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-in space-y-12 pb-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-1">
        <div className="space-y-3">
          <div className="flex items-center gap-5">
             <div className="w-14 h-14 bg-amber-500 rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-amber-100"><i className="fa-solid fa-flask text-2xl"></i></div>
             <h1 className="text-4xl font-black text-slate-800 tracking-tight leading-none">Notes Alchemist</h1>
          </div>
          <p className="text-lg text-slate-500 font-medium italic border-l-4 border-amber-100 pl-6">"Transmuting chaotic lecture streams into gold for us, friend."</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 space-y-6">
           <div className="sakhi-card p-10 space-y-8 bg-white border-none shadow-2xl h-[650px] flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 w-full h-1.5 bg-amber-500"></div>
              <textarea
                className="flex-1 w-full p-8 bg-slate-50/50 rounded-[2.5rem] outline-none border-2 border-slate-50 text-slate-700 text-lg font-medium resize-none shadow-inner focus:border-amber-400 focus:bg-white transition-all hide-scrollbar"
                placeholder="Paste messy notes or transcripts here, yaar..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
              <button
                onClick={handleSummarize}
                disabled={loading || !notes.trim()}
                className="w-full py-6 bg-slate-900 hover:bg-amber-600 text-white rounded-3xl font-black text-xs uppercase tracking-[0.5em] shadow-2xl transition-all flex items-center justify-center gap-4 active:scale-95 disabled:opacity-30"
              >
                {loading ? <i className="fa-solid fa-spinner animate-spin"></i> : <i className="fa-solid fa-wand-magic"></i>}
                Start Transmutation
              </button>
           </div>
        </div>

        <div className="lg:col-span-7 overflow-y-auto max-h-[850px] pr-4 hide-scrollbar space-y-12">
           {!result && !loading && (
             <div className="sakhi-card p-24 h-[650px] flex flex-col items-center justify-center text-center space-y-10 border-dashed border-4 border-slate-100 bg-white/40 opacity-50">
                <div className="w-32 h-32 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 shadow-inner"><i className="fa-solid fa-microscope text-5xl"></i></div>
                <h3 className="text-3xl font-black text-slate-800 tracking-tight">Furnace Ready</h3>
             </div>
           )}

           {loading && (
             <div className="space-y-10 h-full">
               <div className="sakhi-card p-12 shimmer h-40"></div>
               <div className="sakhi-card p-12 shimmer h-80"></div>
             </div>
           )}

           {result && !loading && (
             <div className="space-y-12 animate-in pb-12">
                <section className="sakhi-card p-12 bg-white shadow-2xl relative overflow-hidden group">
                   <div className="flex items-center gap-4 mb-10">
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-inner"><i className="fa-solid fa-atom"></i></div>
                      <h3 className="text-[12px] font-black text-slate-400 uppercase tracking-[0.5em]">Atomic Points</h3>
                   </div>
                   <ul className="space-y-6">
                      {result.bulletPoints.map((point, i) => (
                        <li key={i} className="flex gap-6 group/item">
                          <i className="fa-solid fa-hexagon-nodes text-indigo-400 mt-2"></i>
                          <span className="text-xl text-slate-800 font-bold leading-relaxed">{point}</span>
                        </li>
                      ))}
                   </ul>
                </section>

                <section className="sakhi-card p-14 bg-slate-900 text-white relative overflow-hidden group shadow-2xl">
                   <div className="flex items-center gap-4 mb-8 relative z-10">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center"><i className="fa-solid fa-feather-pointed"></i></div>
                      <h3 className="text-[12px] font-black text-indigo-400 uppercase tracking-[0.5em]">The Essence, Yaar</h3>
                   </div>
                   <p className="text-3xl font-black italic leading-tight relative z-10">
                      "{result.summary}"
                   </p>
                </section>

                <section className="space-y-8">
                   <h3 className="text-[12px] font-black text-slate-400 uppercase tracking-[0.5em] flex items-center gap-4">
                     <i className="fa-solid fa-brain text-amber-600"></i> Memorization Deck
                   </h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {result.flashCards.map((card, i) => (
                        <div key={i} className="group h-64 perspective">
                           <div className="relative w-full h-full transition-all duration-700 preserve-3d group-hover:rotate-y-180 cursor-pointer">
                              <div className="absolute inset-0 sakhi-card p-10 flex flex-col items-center justify-center text-center backface-hidden shadow-xl border-none">
                                 <p className="text-slate-900 font-black text-xl leading-tight">{card.question}</p>
                              </div>
                              <div className="absolute inset-0 sakhi-card p-10 flex flex-col items-center justify-center text-center bg-indigo-600 text-white rotate-y-180 backface-hidden shadow-2xl border-none">
                                 <p className="text-lg font-bold leading-relaxed">{card.answer}</p>
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
    </div>
  );
};

export default NotesAlchemist;

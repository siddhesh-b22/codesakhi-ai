
import React from 'react';
import { Link } from 'react-router-dom';

const SuccessStories: React.FC = () => {
  const stories = [
    { 
      name: 'Arjun P.', 
      college: 'VIT Vellore', 
      offer: 'Google STEP Intern', 
      quote: "The way Sakhi explained Recursion using the 'Matryoshka Doll' story cleared my confusion in 5 minutes! I walked into my interview feeling like I was just telling a story, yaar.",
      tags: ['Recursion Mastery', 'Google Focus'],
      xp: '4.2k'
    },
    { 
      name: 'Priya S.', 
      college: 'SRM Chennai', 
      offer: 'Amazon SDE-1', 
      quote: "The Placement Arena simulations felt exactly like my final interview round. Bug Shield saved my confidence when I hit a segfault in the mock!",
      tags: ['Mock Excellence', 'Bug Shield User'],
      xp: '3.9k'
    },
    { 
      name: 'Rohan M.', 
      college: 'IIT Bombay', 
      offer: 'Zomato Dev', 
      quote: "Notes Alchemist saved my life during Semester 5. My messy scribbles became pure gold summaries. I spent 50% less time studying and got better grades, friend.",
      tags: ['Study Gold', 'Alchemist Fan'],
      xp: '5.1k'
    },
    { 
      name: 'Neha K.', 
      college: 'Delhi Technical Univ', 
      offer: 'Meta Frontend', 
      quote: "CodeSakhi's Logic Decoder is magic. It translated complex system design concepts into simple city planning analogies.",
      tags: ['System Design', 'Visual Learner'],
      xp: '3.5k'
    },
    { 
      name: 'Vikram R.', 
      college: 'BITS Pilani', 
      offer: 'Microsoft SWE', 
      quote: "I never thought I'd understand Dynamic Programming. Sakhi explained it as 'Smart Memoization' using the grocery list analogy. Game changer, buddy.",
      tags: ['DP Master', 'Smart Memo'],
      xp: '4.8k'
    },
    { 
      name: 'Ananya G.', 
      college: 'Anna Univ', 
      offer: 'TCS Digital', 
      quote: "Placement Arena helped me target exactly what TCS asks. The difficulty spread was spot on. Highly recommended for service-based prep too!",
      tags: ['TCS Track', 'Logic Prep'],
      xp: '2.9k'
    }
  ];

  return (
    <div className="animate-in space-y-16 pb-32">
      <header className="space-y-6 text-center max-w-3xl mx-auto pt-10 px-4">
        <div className="inline-flex items-center gap-3 px-5 py-2 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-[0.5em] border border-indigo-100 shadow-sm">
           <i className="fa-solid fa-medal"></i> The Hall of Nodes
        </div>
        <h1 className="text-6xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-none">Your Future Story.</h1>
        <p className="text-xl text-slate-500 font-medium italic border-t border-slate-50 pt-8">
           "Join the thousands of engineers who synchronized their logic and secured their dream offers, buddy."
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {stories.map((s, i) => (
          <div key={i} className="sakhi-card p-12 bg-white border-none shadow-3xl shadow-slate-100 hover:shadow-indigo-200/50 hover:-translate-y-4 transition-all duration-700 group cursor-pointer relative overflow-hidden">
             <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:rotate-12 transition-transform duration-700">
                <i className="fa-solid fa-award text-[10rem]"></i>
             </div>
             
             <div className="flex items-center justify-between mb-10">
                <div className="w-20 h-20 rounded-[2rem] overflow-hidden border-4 border-slate-50 shadow-xl group-hover:border-indigo-400 transition-all duration-500">
                   <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${s.name}`} alt={s.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col items-end gap-2">
                   <span className="text-3xl font-black text-slate-900 tracking-tighter">{s.xp}</span>
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Logic XP</span>
                </div>
             </div>

             <div className="space-y-4 mb-10 relative z-10">
                <h3 className="text-3xl font-black text-slate-900 tracking-tight">{s.name}</h3>
                <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em]">{s.college} • <span className="text-rose-500 underline decoration-rose-500/30 underline-offset-4">{s.offer}</span></p>
             </div>

             <p className="text-xl text-slate-500 font-medium italic leading-relaxed mb-10 relative z-10">
                "{s.quote}"
             </p>

             <div className="flex flex-wrap gap-2 pt-8 border-t border-slate-50 relative z-10">
                {s.tags.map(t => (
                  <span key={t} className="px-3 py-1 bg-slate-50 text-slate-400 text-[9px] font-black uppercase rounded-lg border border-slate-100">{t}</span>
                ))}
             </div>
          </div>
        ))}
      </div>

      <section className="bg-slate-900 rounded-[4.5rem] p-16 lg:p-24 text-white text-center relative overflow-hidden group shadow-2xl">
         <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] bg-indigo-600 rounded-full blur-[180px] animate-pulse"></div>
         </div>
         <div className="relative z-10 space-y-12">
            <h2 className="text-5xl lg:text-7xl font-black tracking-tighter">Ready to be the next one?</h2>
            <p className="text-2xl text-slate-400 font-medium italic max-w-2xl mx-auto leading-relaxed">
               "Mastering logic is the first step. Securing the offer is the next. Let's start your journey today, yaar."
            </p>
            <div className="flex justify-center pt-6">
               <Link to="/auth" className="px-20 py-10 bg-white text-slate-900 rounded-full font-black text-sm uppercase tracking-[0.5em] shadow-[0_40px_120px_-30px_rgba(255,255,255,0.2)] hover:scale-110 active:scale-95 transition-all">
                  Join the Arena
               </Link>
            </div>
         </div>
      </section>
    </div>
  );
};

export default SuccessStories;

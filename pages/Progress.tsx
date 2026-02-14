
import React from 'react';
import { useUser } from '../context/UserContext';

const SkillCard = ({ label, percentage, color }: { label: string, percentage: number, color: string }) => (
  <div className="space-y-3 group cursor-pointer">
    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
      <span className="text-slate-500 group-hover:text-indigo-600 transition-colors">{label}</span>
      <span className="text-slate-400 group-hover:text-slate-900 transition-colors">{percentage}% Mastery</span>
    </div>
    <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden shadow-inner">
      <div 
        className={`h-full ${color} rounded-full transition-all duration-1000 shadow-sm`} 
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  </div>
);

const Progress: React.FC = () => {
  const { stats } = useUser();
  
  const metrics = [
    { label: 'Rhythm Streak', value: '5 Days', icon: 'fa-fire-alt', color: 'text-orange-500', bg: 'bg-orange-50' },
    { label: 'Integrity Points', value: stats.errorsFixed, icon: 'fa-shield-heart', color: 'text-rose-500', bg: 'bg-rose-50' },
    { label: 'Logic Nodes', value: stats.conceptsLearned, icon: 'fa-brain', color: 'text-indigo-500', bg: 'bg-indigo-50' },
    { label: 'Verification Velocity', value: stats.quizzesTaken, icon: 'fa-vial', color: 'text-amber-500', bg: 'bg-amber-50' },
  ];

  return (
    <div className="animate-in space-y-10 pb-16 max-w-6xl mx-auto">
      <div className="px-1 space-y-2">
        <h1 className="text-4xl font-black text-slate-800 tracking-tight leading-none">Your Engineering Map 🗺️</h1>
        <p className="text-base text-slate-500 font-medium italic">"Tracing the logic paths you've mastered, yaar."</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((m, i) => (
          <div key={i} className="sakhi-card p-6 flex flex-col gap-4 group">
            <div className={`w-12 h-12 rounded-2xl ${m.bg} ${m.color} flex items-center justify-center text-xl shadow-sm group-hover:scale-110 transition-transform`}>
              <i className={`fa-solid ${m.icon}`}></i>
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5">{m.label}</p>
              <h3 className="text-2xl font-black text-slate-800 leading-none">{m.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 sakhi-card p-8 lg:p-12 space-y-10">
          <div className="flex items-center justify-between">
             <h3 className="text-xl font-black text-slate-900 tracking-tight">Logical Growth Pipeline</h3>
             <div className="flex gap-2">
                <span className="w-8 h-1.5 rounded-full bg-indigo-600"></span>
                <span className="w-4 h-1.5 rounded-full bg-slate-100"></span>
             </div>
          </div>
          <div className="h-64 flex items-end justify-between gap-3 px-4 pt-10 border-b border-slate-50">
            {[45, 80, 55, 95, 70, 85, 60].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
                <div 
                  className="w-full bg-indigo-500/10 group-hover:bg-indigo-600 rounded-t-xl transition-all duration-700 ease-out relative" 
                  style={{ height: `${h}%` }}
                >
                   <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-black py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">+{h}%</div>
                </div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}</span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 pt-4">
             <div className="space-y-6">
                <SkillCard label="C / Pointers Core" percentage={82} color="bg-rose-500" />
                <SkillCard label="JS Async Control" percentage={65} color="bg-amber-500" />
             </div>
             <div className="space-y-6">
                <SkillCard label="Data Structure Trees" percentage={45} color="bg-indigo-600" />
                <SkillCard label="Memory Management" percentage={30} color="bg-slate-800" />
             </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="bg-[#0F172A] p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:rotate-12 transition-transform duration-1000">
              <i className="fa-solid fa-trophy text-9xl"></i>
            </div>
            <h3 className="text-xl font-black mb-6 relative z-10 flex items-center gap-3">
               <i className="fa-solid fa-medal text-amber-400"></i> Vaulted Achievements
            </h3>
            <div className="grid grid-cols-3 gap-3 relative z-10">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="aspect-square bg-white/10 rounded-xl flex items-center justify-center text-2xl hover:bg-white/20 transition-all border border-white/5" title="Level Mastered!">
                  <i className={`fa-solid ${i === 1 ? 'fa-bolt text-amber-300' : 'fa-certificate text-indigo-400'}`}></i>
                </div>
              ))}
              <div className="aspect-square bg-white/5 rounded-xl border-2 border-dashed border-white/10 flex items-center justify-center text-white/20">
                <i className="fa-solid fa-lock text-sm"></i>
              </div>
            </div>
            <div className="pt-8 relative z-10">
               <button className="w-full bg-indigo-600 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg active:scale-95">Verify Achievements</button>
            </div>
          </div>

          <div className="sakhi-card p-8 bg-white space-y-6">
            <div className="flex items-center justify-between">
               <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Protocol Benchmarks</h3>
               <i className="fa-solid fa-compass text-indigo-100"></i>
            </div>
            <ul className="space-y-4">
              {[
                { l: "Complete Linked Lists", d: false },
                { l: "Debug 5 Logic Errors", d: true },
                { l: "Score 100% in Pointer MCQ", d: false }
              ].map((g, i) => (
                <li key={i} className={`flex items-center gap-3 text-xs font-bold transition-opacity ${g.d ? 'opacity-40 line-through' : 'text-slate-700'}`}>
                  <div className={`w-2 h-2 rounded-full ${g.d ? 'bg-emerald-400' : 'bg-indigo-400'}`}></div>
                  {g.l}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;

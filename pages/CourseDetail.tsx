
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const CourseDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { stats, preferences } = useUser();
  const firstName = preferences.userName.split(' ')[0];

  const courseData = {
    title: 'DSA Logic Mastery',
    modules: [
      { id: 'dsa_mod_1', title: 'The World of Nodes', summary: 'Memory building blocks.', icon: 'fa-cube' },
      { id: 'dsa_mod_2', title: 'Mental Piles (Stacks)', summary: 'LIFO principles.', icon: 'fa-layer-group' },
      { id: 'dsa_mod_3', title: 'Logical Forests (Trees)', summary: 'Hierarchical storage.', icon: 'fa-tree' },
      { id: 'dsa_mod_4', title: 'Graph Networks', summary: 'Network paths.', icon: 'fa-diagram-project' }
    ]
  };

  const isModuleUnlocked = (index: number) => {
    if (index === 0) return true;
    const prevModuleId = courseData.modules[index - 1].id;
    return (stats.masteryScores[prevModuleId] || 0) >= 60;
  };

  const getMasteryColor = (score: number) => {
    if (score >= 85) return 'text-amber-500';
    if (score >= 75) return 'text-emerald-500';
    if (score >= 60) return 'text-indigo-500';
    return 'text-slate-300';
  };

  return (
    <div className="animate-in pb-24 space-y-12">
      <header className="space-y-4">
        <h1 className="text-5xl font-black text-slate-900 tracking-tighter">{courseData.title}</h1>
        <div className="flex gap-4">
          <div className="px-4 py-2 bg-indigo-50 rounded-full border border-indigo-100 flex items-center gap-2">
            <i className="fa-solid fa-bolt text-indigo-600"></i>
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-700">Level: Intermediate</span>
          </div>
          <div className="px-4 py-2 bg-amber-50 rounded-full border border-amber-100 flex items-center gap-2">
            <i className="fa-solid fa-award text-amber-600"></i>
            {/* Added explicit type cast to number[] to solve unknown arithmetic operation error */}
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-700">Mastery Avg: {Math.round((Object.values(stats.masteryScores) as number[]).reduce((a: number, b: number) => a + b, 0) / courseData.modules.length) || 0}%</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {courseData.modules.map((mod, idx) => {
          const unlocked = isModuleUnlocked(idx);
          const score = stats.masteryScores[mod.id] || 0;
          const status = score >= 85 ? 'Master' : score >= 75 ? 'Specialist' : score >= 60 ? 'Apprentice' : unlocked ? 'Active' : 'Locked';

          return (
            <div 
              key={mod.id} 
              onClick={() => unlocked && navigate(`/lesson/${mod.id}`)}
              className={`sakhi-card p-10 space-y-8 relative group transition-all duration-500 ${!unlocked ? 'opacity-60 grayscale cursor-not-allowed' : 'cursor-pointer hover:border-indigo-400'}`}
            >
              {!unlocked && (
                <div className="absolute inset-0 bg-white/40 backdrop-blur-sm z-20 flex flex-col items-center justify-center p-8 text-center space-y-4">
                   <div className="w-16 h-16 rounded-full bg-slate-900 text-white flex items-center justify-center text-xl shadow-2xl">
                      <i className="fa-solid fa-lock"></i>
                   </div>
                   <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">Unlock at 60% in Module {idx}</p>
                </div>
              )}

              <div className="flex justify-between items-start">
                <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-2xl shadow-inner ${unlocked ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-100 text-slate-400'}`}>
                  <i className={`fa-solid ${mod.icon}`}></i>
                </div>
                {unlocked && (
                  <div className="flex flex-col items-end">
                    <span className={`text-[9px] font-black uppercase tracking-widest ${getMasteryColor(score)}`}>{status}</span>
                    <span className="text-2xl font-black text-slate-900 tracking-tighter">{score}%</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-black text-slate-800 tracking-tight">{mod.title}</h3>
                <p className="text-xs text-slate-400 font-medium italic">"{mod.summary}"</p>
              </div>

              <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Node 0{idx+1}</span>
                <button className={`text-[10px] font-black uppercase tracking-[0.2em] ${unlocked ? 'text-indigo-600 group-hover:gap-4' : 'text-slate-300'} transition-all flex items-center gap-2`}>
                   {score > 0 ? 'Review' : 'Initialize'} <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Gamified Sidebar Stats */}
      <section className="bg-slate-900 rounded-[3.5rem] p-12 lg:p-16 text-white relative overflow-hidden group shadow-2xl">
         <div className="absolute -top-20 -right-20 w-[30rem] h-[30rem] bg-indigo-600/10 rounded-full blur-[100px]"></div>
         <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="space-y-6 text-center lg:text-left">
               <h3 className="text-4xl font-black tracking-tighter">Logical Power Level</h3>
               <p className="text-slate-400 font-medium italic">"Every mastery node unlocked makes you an elite engineer, {firstName}!"</p>
               <div className="flex gap-6 justify-center lg:justify-start">
                  <div className="flex flex-col">
                     <span className="text-3xl font-black text-lime-300">{stats.xp}</span>
                     <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">XP Points</span>
                  </div>
                  <div className="w-[1px] h-12 bg-white/10"></div>
                  <div className="flex flex-col">
                     <span className="text-3xl font-black text-indigo-400">{stats.streak}</span>
                     <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Day Streak</span>
                  </div>
               </div>
            </div>
            
            <div className="w-full lg:w-96 space-y-6 bg-white/5 p-10 rounded-[2.5rem] border border-white/5 backdrop-blur-xl">
               <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                  <span className="text-slate-400">Apprentice</span>
                  <span className="text-indigo-400">Master</span>
               </div>
               <div className="h-4 bg-white/5 rounded-full overflow-hidden border border-white/10 shadow-inner">
                  <div className="h-full bg-gradient-to-r from-indigo-500 to-lime-300 shadow-[0_0_20px_rgba(163,230,53,0.3)] transition-all duration-1000" style={{ width: `${(stats.completedModules.length / courseData.modules.length) * 100}%` }}></div>
               </div>
               <p className="text-center text-[10px] font-black uppercase tracking-widest text-slate-500">
                  {courseData.modules.length - stats.completedModules.length} Nodes Remaining to Certification
               </p>
            </div>
         </div>
      </section>
    </div>
  );
};

export default CourseDetail;

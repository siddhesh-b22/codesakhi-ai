
import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { problemService } from '../services/problemService';

const StatCard: React.FC<{ icon: string, label: string, value: number | string, trend: string, iconColor: string, bg: string }> = ({ icon, label, value, trend, iconColor, bg }) => (
  <div className="sakhi-card p-8 flex flex-col gap-5 group hover:scale-[1.02] transition-all duration-500 shadow-sm border-none bg-white">
    <div className="flex items-center justify-between">
      <div className={`w-14 h-14 rounded-2xl ${bg} ${iconColor} flex items-center justify-center text-2xl group-hover:rotate-6 transition-all duration-500 shadow-inner`}>
        <i className={`fa-solid ${icon}`}></i>
      </div>
      <div className="flex flex-col items-end">
        <span className="text-[8px] font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100 uppercase tracking-widest">
          {trend}
        </span>
      </div>
    </div>
    <div>
      <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1">{label}</p>
      <h3 className="text-3xl font-black text-slate-900 tracking-tighter leading-none">{value}</h3>
    </div>
  </div>
);

const DailyQuest: React.FC<{ label: string, done: boolean, xp: number }> = ({ label, done, xp }) => (
  <div className={`flex items-center justify-between p-5 rounded-2xl border transition-all cursor-pointer group ${done ? 'bg-emerald-50/30 border-emerald-100 opacity-60' : 'bg-white border-slate-100 hover:border-indigo-400 hover:shadow-xl hover:-translate-y-0.5'}`}>
    <div className="flex items-center gap-4">
      <div className={`w-8 h-8 rounded-xl flex items-center justify-center border-2 transition-all ${done ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg' : 'border-slate-100 bg-slate-50'}`}>
        {done ? <i className="fa-solid fa-check text-[10px]"></i> : <i className="fa-solid fa-circle-notch text-[10px] text-slate-200"></i>}
      </div>
      <span className={`text-xs font-black tracking-tight ${done ? 'line-through text-slate-400' : 'text-slate-800'}`}>{label}</span>
    </div>
    {!done && <span className="text-[9px] font-black text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg">+{xp}XP</span>}
  </div>
);

const Dashboard: React.FC = () => {
  const { stats, preferences } = useUser();
  const navigate = useNavigate();
  const [onlineCount, setOnlineCount] = useState(1452);

  const trendingProblem = useMemo(() => {
    const problems = problemService.getAllProblems();
    return problems[Math.floor(Math.random() * 5)];
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineCount(prev => prev + Math.floor(Math.random() * 7) - 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const firstName = preferences.userName.split(' ')[0];

  return (
    <div className="page-enter-active space-y-12 pb-32">
      {/* Hero Section */}
      <section className="relative min-h-[28rem] hero-gradient rounded-[3.5rem] p-8 lg:p-20 text-white overflow-hidden shadow-[0_50px_100px_-20px_rgba(79,70,229,0.3)] flex items-center group">
         <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
               <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.1"/>
               </pattern>
               <rect width="100" height="100" fill="url(#grid)" />
            </svg>
         </div>
         <div className="absolute top-[-20%] right-[-5%] w-[40rem] h-[40rem] bg-indigo-400/20 rounded-full blur-[120px]"></div>
         <div className="absolute bottom-[-10%] left-[10%] w-[30rem] h-[30rem] bg-lime-300/10 rounded-full blur-[100px]"></div>
         
         <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-20 w-full">
            <div className="relative shrink-0">
               <div className="w-40 h-40 lg:w-48 lg:h-48 rounded-[3rem] border-[10px] border-white/10 overflow-hidden shadow-2xl bg-white/5 backdrop-blur-2xl group-hover:rotate-3 transition-all duration-700">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${preferences.userName}`} alt="Avatar" className="w-full h-full object-cover scale-110" />
               </div>
               <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-lime-300 rounded-2xl flex items-center justify-center text-slate-900 shadow-xl border-4 border-[#5c54e8]">
                  <i className="fa-solid fa-bolt-lightning text-lg"></i>
               </div>
            </div>

            <div className="flex-1 text-center lg:text-left space-y-8">
               <div className="space-y-4">
                  <div className="flex flex-col lg:flex-row items-center gap-4 justify-center lg:justify-start">
                    <h1 className="text-5xl lg:text-7xl font-black tracking-tighter leading-none">Namaste, {firstName}!</h1>
                  </div>
                  <p className="text-xl lg:text-2xl text-indigo-50 font-medium italic opacity-90 max-w-2xl mx-auto lg:mx-0">
                    "Ready to master some <span className="text-white font-black border-b-4 border-lime-300">Logic Nodes</span> today? I'm here to help you out, yaar."
                  </p>
               </div>
               
               <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  <Link to="/courses" className="btn-vibrant px-12 py-5 text-[10px] uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all">
                    Resume Track <i className="fa-solid fa-arrow-right-long ml-3"></i>
                  </Link>
                  <Link to="/compiler" className="px-10 py-5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full font-black text-[10px] uppercase tracking-widest backdrop-blur-md transition-all active:scale-95">
                    Logic Lab
                  </Link>
                  <div className="flex items-center gap-2 px-6 py-4 bg-black/20 rounded-full border border-white/5 text-[9px] font-black uppercase tracking-widest">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                    {onlineCount} Sakhis Online
                  </div>
               </div>
            </div>

            {/* Illustrative Logic Mastery Gauge */}
            <div className="hidden xl:flex flex-col items-center gap-6 bg-white/5 backdrop-blur-3xl p-10 rounded-[3.5rem] border-2 border-white/10 shadow-3xl w-72 group-hover:bg-white/10 transition-all duration-500">
               <div className="relative w-36 h-36">
                  {/* Outer Glow Circle */}
                  <div className="absolute inset-0 rounded-full border-[14px] border-white/5 blur-sm scale-105"></div>
                  
                  <svg className="w-full h-full -rotate-90">
                    {/* Background Track */}
                    <circle cx="72" cy="72" r="62" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="16" />
                    {/* Progress Stroke */}
                    <circle 
                      cx="72" 
                      cy="72" 
                      r="62" 
                      fill="transparent" 
                      stroke="#d9f99d" 
                      strokeWidth="16" 
                      strokeDasharray="389.5" 
                      strokeDashoffset={389.5 * (1 - 0.78)} 
                      strokeLinecap="round" 
                      className="transition-all duration-[2s] ease-out shadow-[0_0_20px_rgba(217,249,157,0.5)]" 
                    />
                  </svg>
                  
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-4xl font-black text-white drop-shadow-lg tracking-tighter">78<span className="text-xl text-indigo-300">%</span></div>
                    <div className="w-8 h-1 bg-white/20 rounded-full mt-1"></div>
                  </div>
               </div>
               
               <div className="text-center space-y-3">
                  <div className="px-5 py-2 bg-lime-300 text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl rotate-[-2deg]">
                     System Mastery
                  </div>
                  <div className="flex gap-1.5 justify-center">
                    {[1,2,3,4,5].map(i => (
                      <div key={i} className={`w-3 h-1.5 rounded-full transition-all duration-700 ${i <= 4 ? 'bg-lime-300 shadow-[0_0_8px_#d9f99d]' : 'bg-white/10'}`}></div>
                    ))}
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Metrics Row */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-6 px-2">
        <StatCard icon="fa-brain" label="Logic Nodes" value={stats.conceptsLearned} trend="+12% Boost" iconColor="text-indigo-600" bg="bg-indigo-50" />
        <StatCard icon="fa-code-commit" label="Code Runs" value={stats.codesExplained} trend="+5 Today" iconColor="text-emerald-600" bg="bg-emerald-50" />
        <StatCard icon="fa-heart-pulse" label="Logic Heals" value={stats.errorsFixed} trend="+24 Month" iconColor="text-rose-600" bg="bg-rose-50" />
        <StatCard icon="fa-trophy" label="Global Rank" value="#124" trend="Elite Node" iconColor="text-amber-600" bg="bg-amber-50" />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-10">
          <div className="space-y-6">
            <div className="flex items-center justify-between px-4">
               <h2 className="text-2xl font-black text-slate-900 tracking-tighter flex items-center gap-4">
                 <span className="w-2 h-10 bg-indigo-600 rounded-full"></span>
                 The Engineering Hub
               </h2>
               <Link to="/courses" className="text-[9px] font-black text-indigo-600 uppercase tracking-widest hover:underline underline-offset-4">Explore All Modules</Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { to: "/logic-decoder", icon: "fa-brain", title: "Logic Decoder", desc: "Break down scary code into simple stories we both understand.", color: "text-indigo-600", bg: "bg-indigo-50", accent: "indigo" },
                { to: "/bug-shield", icon: "fa-shield-virus", title: "Bug Shield", desc: "Scan and heal logic traps that are holding you back, friend.", color: "text-rose-600", bg: "bg-rose-50", accent: "rose" },
                { to: "/notes-alchemist", icon: "fa-flask", title: "Notes Alchemist", desc: "Transmute messy college notes into pure study gold instantly.", color: "text-amber-600", bg: "bg-amber-50", accent: "amber" },
                { to: "/success-stories", icon: "fa-medal", title: "Success Stories", desc: "See how your peers used logic mastery to crack top offers.", color: "text-emerald-600", bg: "bg-emerald-50", accent: "emerald" },
              ].map((mod, i) => (
                <Link key={i} to={mod.to} className={`sakhi-card p-10 group flex flex-col h-full bg-white border-none shadow-3xl shadow-${mod.accent}-100 transition-all duration-500 hover:scale-[1.03]`}>
                  <div className={`w-20 h-20 rounded-3xl ${mod.bg} ${mod.color} flex items-center justify-center text-3xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-sm mb-8`}>
                    <i className={`fa-solid ${mod.icon}`}></i>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors mb-4 tracking-tight leading-none">{mod.title}</h3>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed mb-8">{mod.desc}</p>
                  <div className="mt-auto flex items-center gap-3 text-[9px] font-black text-indigo-600 uppercase tracking-widest group-hover:gap-6 transition-all">
                    Initialize Protocol <i className="fa-solid fa-arrow-right"></i>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {trendingProblem && (
            <div className="sakhi-card p-10 bg-white border-none shadow-2xl shadow-indigo-100 flex flex-col md:flex-row items-center gap-10 group">
              <div className="w-full md:w-48 h-48 bg-slate-900 rounded-[2.5rem] shrink-0 flex flex-col items-center justify-center text-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500"></div>
                <i className="fa-solid fa-fire-flame-curved text-4xl text-rose-500 mb-3 animate-pulse"></i>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Trending</span>
                <span className="text-3xl font-black mt-2">q{trendingProblem.id.split('_').pop()}</span>
              </div>
              <div className="flex-1 space-y-4 text-center md:text-left">
                <div className="flex flex-col md:flex-row items-center gap-3 justify-center md:justify-start">
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">{trendingProblem.title}</h3>
                  <span className={`px-2.5 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest ${trendingProblem.difficulty === 'Hard' ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'}`}>{trendingProblem.difficulty}</span>
                </div>
                <p className="text-sm text-slate-500 font-medium italic leading-relaxed">"{trendingProblem.description}"</p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {trendingProblem.companies.map(c => (
                    <span key={c} className="px-3 py-1 bg-slate-50 text-slate-400 text-[8px] font-black uppercase rounded-md border border-slate-100 capitalize">{c}</span>
                  ))}
                </div>
                <button 
                  onClick={() => navigate(`/compiler/${trendingProblem.id}`)}
                  className="mt-4 px-10 py-4 bg-slate-900 text-white rounded-2xl text-[9px] font-black uppercase tracking-widest shadow-xl group-hover:bg-indigo-600 transition-all active:scale-95"
                >
                  Solve Logic Node
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-4 space-y-10">
          <div className="sakhi-card p-10 bg-white space-y-10 shadow-3xl shadow-indigo-100 border-none">
            <div className="flex items-center justify-between border-b border-slate-50 pb-8">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Active Quests</h3>
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center"><i className="fa-solid fa-list-check"></i></div>
            </div>
            <div className="space-y-4">
              {[
                { label: "Decode Recursion Nodes", done: false, xp: 20 },
                { label: "Pass Pointers Qualifier", done: true, xp: 50 },
                { label: "Sync 3 Logic Files", done: false, xp: 100 }
              ].map((goal, i) => (
                <DailyQuest key={i} label={goal.label} done={goal.done} xp={goal.xp} />
              ))}
            </div>
          </div>

          <div className="hero-gradient p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-[100px] group-hover:scale-110 transition-transform duration-1000"></div>
            <div className="relative z-10 space-y-10">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-[1.5rem] bg-white/20 backdrop-blur-2xl flex items-center justify-center text-4xl text-lime-300 border border-white/20 shadow-2xl">
                  <i className="fa-solid fa-hand-sparkles animate-pulse"></i>
                </div>
                <div>
                  <h3 className="text-2xl font-black tracking-tighter leading-none">Sakhi's Desk</h3>
                  <span className="text-[9px] font-black text-indigo-200 uppercase tracking-[0.3em] block mt-2">Status: Friend Mode</span>
                </div>
              </div>
              <p className="text-xl text-indigo-50 font-medium italic leading-relaxed">
                "{firstName} friend, I noticed you excelled in <span className="text-white font-black underline decoration-lime-300 decoration-8 underline-offset-4">Arrays</span>. Ready to tackle a Linked List together?"
              </p>
              <button 
                onClick={() => navigate('/tutor')} 
                className="w-full bg-white text-indigo-600 font-black py-6 rounded-2xl transition-all shadow-xl hover:scale-105 active:scale-95 text-[10px] uppercase tracking-widest hover:bg-indigo-50"
              >
                Chat with me, yaar <i className="fa-solid fa-message-dots ml-3"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

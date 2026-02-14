
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Company, CompanyCategory } from '../types';
import { problemService } from '../services/problemService';

const CompanyPrep: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'companies' | 'all-problems'>('companies');
  const [activeCat, setActiveCat] = useState<CompanyCategory | 'ALL'>('ALL');
  const [problemFilter, setProblemFilter] = useState<string>('All');

  const companies: Company[] = [
    { id: 'google', name: 'Google', logo: 'G', category: CompanyCategory.FAANG, questionCount: 450, difficultyDist: { easy: 10, medium: 60, hard: 30 }, hiringRate: 'Low', tags: ['DSA', 'System Design'] },
    { id: 'amazon', name: 'Amazon', logo: 'A', category: CompanyCategory.FAANG, questionCount: 520, difficultyDist: { easy: 20, medium: 50, hard: 30 }, hiringRate: 'High', tags: ['Leadership Principles', 'DSA'] },
    { id: 'tcs', name: 'TCS', logo: 'T', category: CompanyCategory.SERVICE, questionCount: 120, difficultyDist: { easy: 70, medium: 25, hard: 5 }, hiringRate: 'Very High', tags: ['Aptitude', 'Java Core'] },
    { id: 'zomato', name: 'Zomato', logo: 'Z', category: CompanyCategory.STARTUP, questionCount: 85, difficultyDist: { easy: 15, medium: 55, hard: 30 }, hiringRate: 'Medium', tags: ['Frontend', 'Backend Logic'] },
    { id: 'meta', name: 'Meta', logo: 'M', category: CompanyCategory.FAANG, questionCount: 380, difficultyDist: { easy: 15, medium: 65, hard: 20 }, hiringRate: 'Low', tags: ['Graphs', 'Recursion'] },
    { id: 'infosys', name: 'Infosys', logo: 'I', category: CompanyCategory.SERVICE, questionCount: 140, difficultyDist: { easy: 60, medium: 30, hard: 10 }, hiringRate: 'High', tags: ['SQL', 'OOPS'] },
  ];

  const categories = useMemo(() => ['All', ...problemService.getCategories()], []);
  
  const filteredCompanies = companies.filter(c => 
    (activeCat === 'ALL' || c.category === activeCat) &&
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const filteredProblems = useMemo(() => {
    let probs = problemService.getAllProblems();
    if (problemFilter !== 'All') {
      probs = probs.filter(p => p.category === problemFilter);
    }
    if (search) {
      probs = probs.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));
    }
    return probs;
  }, [problemFilter, search]);

  return (
    <div className="animate-in space-y-12 pb-24">
      <header className="space-y-6 px-2">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <h1 className="text-5xl font-black text-slate-900 tracking-tighter">Placement Arena</h1>
            <p className="text-lg text-slate-500 font-medium italic">"Bridge the gap between learning logic and cracking the offer letter, beta."</p>
          </div>
          <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-slate-100">
            <button onClick={() => setView('companies')} className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${view === 'companies' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400'}`}>Target Companies</button>
            <button onClick={() => setView('all-problems')} className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${view === 'all-problems' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400'}`}>Practice Hub</button>
          </div>
        </div>
      </header>

      {/* Search & Filters */}
      <div className="flex flex-col lg:flex-row gap-6 sticky top-24 z-40 bg-[#F8FAFC]/90 backdrop-blur-md py-4 px-2">
        <div className="flex-1 relative">
           <i className="fa-solid fa-magnifying-glass absolute left-6 top-1/2 -translate-y-1/2 text-slate-400"></i>
           <input 
            type="text" 
            placeholder={view === 'companies' ? "Search company..." : "Search problems..."} 
            className="w-full pl-14 pr-6 py-5 bg-white border border-slate-100 rounded-2xl shadow-sm outline-none focus:border-indigo-400 font-bold"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
           />
        </div>
        
        {view === 'companies' ? (
          <div className="flex bg-white p-2 rounded-2xl border border-slate-100 shadow-sm gap-2 overflow-x-auto hide-scrollbar">
            {['ALL', CompanyCategory.FAANG, CompanyCategory.PRODUCT, CompanyCategory.SERVICE, CompanyCategory.STARTUP].map(cat => (
              <button 
                key={cat} 
                onClick={() => setActiveCat(cat as any)}
                className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${activeCat === cat ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-indigo-600'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        ) : (
          <div className="flex bg-white p-2 rounded-2xl border border-slate-100 shadow-sm gap-2 overflow-x-auto hide-scrollbar">
            {categories.map(cat => (
              <button 
                key={cat} 
                onClick={() => setProblemFilter(cat)}
                className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${problemFilter === cat ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-indigo-600'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {view === 'companies' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCompanies.map(company => (
            <div 
              key={company.id} 
              onClick={() => navigate(`/company/${company.id}`)}
              className="sakhi-card p-10 bg-white border-none shadow-2xl shadow-slate-200/50 group cursor-pointer transition-all hover:scale-[1.02]"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center text-3xl font-black shadow-xl group-hover:rotate-6 transition-all">
                  {company.logo}
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[9px] font-black uppercase tracking-widest rounded-full border border-indigo-100">{company.category}</span>
                  <span className={`text-[9px] font-black uppercase tracking-widest ${company.hiringRate === 'Very High' ? 'text-emerald-500' : 'text-slate-400'}`}>Hiring: {company.hiringRate}</span>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">{company.name}</h3>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">{company.questionCount} Targeted Questions</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-[9px] font-black text-slate-400 uppercase tracking-widest">
                    <span>Logic Spread</span>
                    <span className="text-slate-900">E {company.difficultyDist.easy}% / M {company.difficultyDist.medium}% / H {company.difficultyDist.hard}%</span>
                  </div>
                  <div className="h-2 rounded-full flex overflow-hidden">
                    <div className="bg-emerald-500 h-full" style={{ width: `${company.difficultyDist.easy}%` }}></div>
                    <div className="bg-amber-500 h-full" style={{ width: `${company.difficultyDist.medium}%` }}></div>
                    <div className="bg-rose-500 h-full" style={{ width: `${company.difficultyDist.hard}%` }}></div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-50">
                  {company.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-slate-50 text-slate-500 text-[9px] font-black uppercase rounded-lg border border-slate-100">{tag}</span>
                  ))}
                </div>
              </div>

              <button className="w-full mt-8 py-4 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl group-hover:bg-indigo-600 transition-all flex items-center justify-center gap-2">
                Practice Logic <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="sakhi-card bg-white border-none shadow-3xl shadow-indigo-100/30 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Title</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Category</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Difficulty</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Asked In</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredProblems.map(p => (
                  <tr 
                    key={p.id} 
                    onClick={() => navigate(`/compiler/${p.id}`)}
                    className="group hover:bg-indigo-50/40 transition-all cursor-pointer"
                  >
                    <td className="px-10 py-7">
                      <p className="text-sm font-black text-slate-800 tracking-tight group-hover:text-indigo-600 transition-colors">{p.title}</p>
                    </td>
                    <td className="px-10 py-7">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{p.category}</span>
                    </td>
                    <td className="px-10 py-7 text-center">
                      <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                        p.difficulty === 'Easy' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                        p.difficulty === 'Medium' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                        'bg-rose-50 text-rose-600 border-rose-100'
                      }`}>
                        {p.difficulty}
                      </span>
                    </td>
                    <td className="px-10 py-7">
                      <div className="flex gap-2">
                        {p.companies.map(c => (
                          <span key={c} className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center text-[10px] font-black uppercase text-slate-400 border border-slate-200">{c[0]}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-10 py-7 text-right">
                      <button className="px-6 py-3 bg-slate-900 text-white rounded-xl text-[9px] font-black uppercase tracking-widest shadow-xl group-hover:bg-indigo-600 transition-all">
                        Solve <i className="fa-solid fa-arrow-right ml-1"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Mock Section CTA */}
      <section className="sakhi-card p-12 lg:p-16 bg-[#0F172A] text-white relative overflow-hidden group border-none shadow-2xl mt-20">
         <div className="absolute top-[-20%] right-[-10%] w-[35rem] h-[35rem] bg-indigo-600/10 rounded-full blur-[100px]"></div>
         <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left">
            <div className="space-y-4 max-w-xl">
               <h2 className="text-4xl font-black tracking-tighter">Mock Interview Simulator</h2>
               <p className="text-slate-400 font-medium italic">"Experience a 90-minute timed pressure simulation with company-specific logical traps, beta."</p>
            </div>
            <button className="px-12 py-6 bg-white text-slate-900 rounded-full font-black text-xs uppercase tracking-widest shadow-2xl shadow-indigo-500/20 hover:scale-105 transition-all">
               Start Simulation <i className="fa-solid fa-stopwatch ml-2"></i>
            </button>
         </div>
      </section>
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default CompanyPrep;

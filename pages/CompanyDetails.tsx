
import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { problemService } from '../services/problemService';

const CompanyDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const companyProblems = useMemo(() => {
    return problemService.getProblemsByCompany(id || '');
  }, [id]);

  const getDifficultyColor = (diff: string) => {
    if (diff === 'Easy') return 'bg-emerald-50 text-emerald-600 border-emerald-100';
    if (diff === 'Medium') return 'bg-amber-50 text-amber-600 border-amber-100';
    return 'bg-rose-50 text-rose-600 border-rose-100';
  };

  const navigateToProblem = (questionId: string) => {
    navigate(`/compiler/${questionId}?company=${id}`);
  };

  return (
    <div className="animate-in space-y-12 pb-24">
      <nav className="flex items-center gap-4 px-2">
        <button onClick={() => navigate('/company-prep')} className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-indigo-600 flex items-center gap-2 transition-colors">
           <i className="fa-solid fa-arrow-left"></i> All Companies
        </button>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-8">
           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 px-2">
              <div className="space-y-1">
                 <h1 className="text-4xl font-black text-slate-900 tracking-tighter capitalize">{id} Selection Track</h1>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Logic Nodes requested at {id}</p>
              </div>
              <div className="bg-white px-6 py-3 rounded-2xl border border-slate-100 flex items-center gap-4 shadow-sm">
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Progress</span>
                 <span className="text-lg font-black text-indigo-600">0 / {companyProblems.length}</span>
              </div>
           </div>

           <div className="sakhi-card bg-white border-none shadow-3xl shadow-indigo-100/30 overflow-hidden">
              <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead>
                       <tr className="bg-slate-50 border-b border-slate-100">
                          <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                          <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Title</th>
                          <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Difficulty</th>
                          <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Asked In</th>
                          <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Gate</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                       {companyProblems.map(q => (
                          <tr 
                            key={q.id} 
                            onClick={() => navigateToProblem(q.id)}
                            className="group hover:bg-indigo-50/40 transition-all cursor-pointer"
                          >
                             <td className="px-10 py-7"><i className="fa-solid fa-lock text-slate-200"></i></td>
                             <td className="px-10 py-7">
                                <div className="space-y-1.5">
                                   <p className="text-sm font-black text-slate-800 tracking-tight group-hover:text-indigo-600 transition-colors">{q.title}</p>
                                   <div className="flex gap-2">
                                      <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{q.category}</span>
                                   </div>
                                </div>
                             </td>
                             <td className="px-10 py-7 text-center">
                                <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${getDifficultyColor(q.difficulty)}`}>
                                   {q.difficulty}
                                </span>
                             </td>
                             <td className="px-10 py-7 text-center">
                                <div className="flex justify-center gap-1">
                                   <i className="fa-solid fa-fire text-rose-500 text-[9px]"></i>
                                   <i className="fa-solid fa-fire text-rose-500 text-[9px]"></i>
                                   <i className="fa-solid fa-fire text-slate-100 text-[9px]"></i>
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
        </div>

        <div className="lg:col-span-4 space-y-8">
           <div className="sakhi-card p-10 bg-white border-none shadow-3xl shadow-indigo-100 space-y-10">
              <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-4">
                 <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 shadow-inner">
                   <i className="fa-solid fa-lightbulb"></i>
                 </div>
                 Strategic Edge
              </h3>
              
              <div className="space-y-8">
                 <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Company Insight</h4>
                    <p className="text-sm text-slate-600 font-medium italic leading-relaxed">
                       "Friend, {id} focuses on scalability. When explaining your logic, mention how the memory grows as users increase!"
                    </p>
                 </div>

                 <div className="space-y-4">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Success protocol</h4>
                    {[
                       { label: 'Time Nodes', desc: 'Maintain O(log N) where possible', icon: 'fa-clock' },
                       { label: 'Clean Sync', desc: 'Use readable variable names', icon: 'fa-wand-sparkles' },
                    ].map(round => (
                       <div key={round.label} className="flex gap-5 p-5 rounded-[2rem] bg-white border border-slate-50 shadow-sm transition-all hover:border-indigo-200">
                          <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-500 shadow-sm shrink-0">
                             <i className={`fa-solid ${round.icon}`}></i>
                          </div>
                          <div>
                             <p className="text-[10px] font-black text-slate-800 uppercase tracking-widest leading-none mb-1.5">{round.label}</p>
                             <p className="text-[10px] text-slate-400 font-bold italic">{round.desc}</p>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;

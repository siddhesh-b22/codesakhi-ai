
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const CourseListing: React.FC = () => {
  const navigate = useNavigate();
  const { stats } = useUser();

  const courses = [
    {
      id: 'dsa-mastery',
      title: 'DSA Logic Mastery',
      tag: 'Logical Core',
      desc: 'Master the pillars of engineering: Arrays, Linked Lists, Trees, and Dynamic Programming with simple stories.',
      icon: 'fa-brain',
      color: 'indigo',
      totalModules: 4,
      difficulty: 'Intermediate'
    },
    {
      id: 'ml-foundations',
      title: 'Machine Learning Beta',
      tag: 'AI Future',
      desc: 'From Linear Regression to Neural Networks. We break down the math using grocery market analogies.',
      icon: 'fa-robot',
      color: 'emerald',
      totalModules: 5,
      difficulty: 'Advanced'
    },
    {
      id: 'ai-prompt-eng',
      title: 'AI System Design',
      tag: 'Modern Stack',
      desc: 'Build AI-native apps. Learn prompt engineering, vector DBs, and LLM orchestration.',
      icon: 'fa-sparkles',
      color: 'amber',
      totalModules: 3,
      difficulty: 'Beginner'
    }
  ];

  const calculateProgress = (courseId: string, total: number) => {
    const completedCount = stats.completedModules.filter(mId => mId.startsWith(courseId.split('-')[0])).length;
    return Math.min(100, Math.round((completedCount / total) * 100));
  };

  return (
    <div className="animate-in space-y-16 pb-20">
      <div className="space-y-4 px-2">
         <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-slate-900 rounded-[1.5rem] flex items-center justify-center text-white shadow-2xl">
              <i className="fa-solid fa-route text-2xl"></i>
            </div>
            <div>
               <h1 className="text-5xl font-black text-slate-800 tracking-tighter">Learning Pathways</h1>
               <p className="text-sm text-slate-400 font-bold uppercase tracking-widest mt-1">Gated progression for guaranteed mastery</p>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {courses.map((course) => {
          const progress = calculateProgress(course.id, course.totalModules);
          
          return (
            <div 
              key={course.id}
              onClick={() => navigate(`/course/${course.id}`)}
              className="sakhi-card p-10 group cursor-pointer bg-white border-none shadow-2xl shadow-slate-100 transition-all duration-500 hover:scale-[1.02]"
            >
              <div className="flex justify-between items-start mb-10">
                 <div className={`w-20 h-20 rounded-[2rem] bg-${course.color}-50 text-${course.color}-600 flex items-center justify-center text-4xl group-hover:rotate-6 transition-all duration-500 shadow-inner`}>
                    <i className={`fa-solid ${course.icon}`}></i>
                 </div>
                 <div className="flex flex-col items-end gap-2">
                    <span className={`px-4 py-1.5 bg-${course.color}-50 text-${course.color}-600 text-[9px] font-black uppercase tracking-[0.2em] rounded-full border border-${course.color}-100`}>
                      {course.tag}
                    </span>
                    <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{course.difficulty}</span>
                 </div>
              </div>
              
              <div className="space-y-4 mb-10">
                 <h3 className="text-3xl font-black text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors">{course.title}</h3>
                 <p className="text-slate-500 text-sm leading-relaxed font-medium italic">"{course.desc}"</p>
              </div>

              <div className="space-y-6 pt-6 border-t border-slate-50">
                 <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                    <span className="text-slate-400">Mastery Level</span>
                    <span className="text-slate-900">{progress}%</span>
                 </div>
                 <div className="h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                    <div className={`h-full bg-${course.color}-500 transition-all duration-1000 shadow-sm`} style={{ width: `${progress}%` }}></div>
                 </div>
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <i className="fa-solid fa-map-pin text-slate-300"></i>
                       <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{course.totalModules} Gateways</span>
                    </div>
                    <div className="text-indigo-600 font-black text-xs uppercase tracking-widest group-hover:gap-4 flex items-center gap-2 transition-all">
                       Sync Logic <i className="fa-solid fa-arrow-right"></i>
                    </div>
                 </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="sakhi-card p-12 bg-slate-900 text-white relative overflow-hidden">
         <div className="absolute top-0 right-0 p-12 opacity-5">
            <i className="fa-solid fa-terminal text-[15rem]"></i>
         </div>
         <div className="relative z-10 space-y-12">
            <div className="max-w-xl space-y-4">
               <h3 className="text-3xl font-black tracking-tight leading-none">The CodeSakhi Gateway Protocol</h3>
               <p className="text-slate-400 font-medium italic">"We don't believe in skipping logic. Each module is a locked node. Clear the assessment, unlock the mastery."</p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
               {[
                 { icon: "fa-file-lines", label: "Logic Slides", desc: "Read & Understand" },
                 { icon: "fa-terminal", label: "Logic Play", desc: "Interactive Coding" },
                 { icon: "fa-shield-heart", label: "Assessment", desc: "Pass Gateway" },
                 { icon: "fa-crown", label: "Unlock", desc: "Next Logic Path" }
               ].map((step, i) => (
                 <div key={i} className="flex-1 text-center space-y-4 relative">
                    <div className="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center mx-auto text-xl shadow-2xl border-4 border-white/10 group">
                       <i className={`fa-solid ${step.icon}`}></i>
                    </div>
                    <div className="space-y-1">
                       <h4 className="text-sm font-black uppercase tracking-widest">{step.label}</h4>
                       <p className="text-[10px] text-slate-500 uppercase">{step.desc}</p>
                    </div>
                    {i < 3 && <div className="hidden md:block absolute top-8 left-[60%] w-full h-[1px] bg-white/10"></div>}
                 </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default CourseListing;

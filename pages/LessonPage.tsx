import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { geminiService } from '../services/geminiService';
import { QuizQuestion } from '../types';

const SimulationViewer: React.FC<{ type?: string, progress: number }> = ({ type, progress }) => {
  return (
    <div className="w-full h-64 bg-slate-900 rounded-[2rem] flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
         <div className="grid grid-cols-10 h-full w-full">
            {Array.from({length: 100}).map((_, i) => <div key={i} className="border border-white/10"></div>)}
         </div>
      </div>
      
      <div className="flex items-center gap-8 relative z-10 transition-all duration-1000" style={{ transform: `translateX(${-progress * 150}px)` }}>
         {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="flex items-center gap-4">
               <div className={`w-24 h-24 rounded-2xl border-4 flex flex-col items-center justify-center text-white transition-all duration-500 ${i <= progress + 1 ? 'border-indigo-500 bg-indigo-500/20 shadow-[0_0_30px_rgba(99,102,241,0.4)]' : 'border-slate-700 opacity-30'}`}>
                  <span className="text-[9px] font-black uppercase text-indigo-300 mb-1">Data</span>
                  <span className="text-xl font-black">{String.fromCharCode(64 + i)}</span>
                  <div className="w-full h-[2px] bg-white/10 my-1"></div>
                  <span className="text-[8px] font-black text-slate-500 uppercase">{"Next ->"}</span>
               </div>
               {i < 5 && (
                  <div className={`w-12 h-1 bg-gradient-to-r from-indigo-500 to-slate-700 transition-opacity duration-500 ${i <= progress ? 'opacity-100' : 'opacity-10'}`}></div>
               )}
            </div>
         ))}
      </div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black/40 px-4 py-2 rounded-full border border-white/5">
         <i className="fa-solid fa-play text-[10px] text-indigo-400"></i>
         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Logic Simulation Active</span>
      </div>
    </div>
  );
};

const LessonPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { recordAssessment, stats, preferences } = useUser();
  const [activeStage, setActiveStage] = useState<'tutorial' | 'simulation' | 'sandbox' | 'assessment'>('tutorial');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sandboxCode, setSandboxCode] = useState('class Node {\n  constructor(data) {\n    this.data = data;\n    this.next = null;\n  }\n}');
  
  const [quiz, setQuiz] = useState<QuizQuestion[] | null>(null);
  const [quizIdx, setQuizIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [weakTopics, setWeakTopics] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);

  const moduleData = {
    title: 'The World of Nodes',
    slides: [
      { 
        title: "🧠 Tiffin Box Memory – Understanding Nodes", 
        analogy: "Imagine you bring 3 tiffin boxes to college, but they aren't together! Box 1 (Roti) has a note saying 'Next box is in Library'. Box 2 (Sabzi) has a note saying 'Next box is in Canteen'.",
        breakdown: "Each 'Node' in memory holds two things: The Data (the food) and a Pointer (the address note). Unlike arrays, these boxes don't need to be side-by-side, yaar!",
        example: "Memory 1001: [10 | Next: 3050]\nMemory 3050: [20 | Next: NULL]",
        why: "Dynamic size & efficient insertion! Foundations of almost all complex DSA.",
        mistake: "Forgetting to set next = NULL (your code will keep searching for a tiffin that doesn't exist!)",
        icon: "fa-box-open" 
      },
      { 
        title: "🔗 Head & Tail – The Start and End", 
        analogy: "Think of a treasure hunt. If you lose the very first clue (The Head), the whole hunt is over, friend!",
        breakdown: "The 'Head' is a special pointer that tells us where the list starts. The 'Tail' is the last node whose pointer is always NULL.",
        example: "Node* head = node1;\nnode3->next = NULL;",
        why: "To traverse a list, you MUST know where it starts. If you overwrite the head, you lose the whole list.",
        mistake: "Accidentally moving the head pointer instead of a temp pointer during traversal.",
        icon: "fa-link-slash" 
      }
    ]
  };

  const startAssessment = async () => {
    setLoading(true);
    setActiveStage('assessment');
    try {
      const data = await geminiService.generateQuiz(moduleData.title, preferences.difficulty, preferences.userName, stats.weakConcepts);
      setQuiz(data);
    } catch (err) {
      alert("Retrying sync, yaar...");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (idx: number) => {
    if (isAnswered) return;
    setSelectedOpt(idx);
    setIsAnswered(true);
    const correct = idx === quiz![quizIdx].correctAnswer;
    if (correct) setScore(s => s + 1);
    else setWeakTopics(prev => [...prev, quiz![quizIdx].conceptTag]);
  };

  const nextQuestion = () => {
    if (quizIdx < quiz!.length - 1) {
      setQuizIdx(i => i + 1);
      setSelectedOpt(null);
      setIsAnswered(false);
    } else {
      const finalPercentage = (score / quiz!.length) * 100;
      recordAssessment(id || 'temp', finalPercentage, weakTopics);
      setFinished(true);
    }
  };

  return (
    <div className="animate-in pb-24 space-y-12 max-w-5xl mx-auto">
      <nav className="flex items-center justify-between px-2">
         <button onClick={() => navigate(-1)} className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 hover:text-indigo-600 transition-colors">
            <i className="fa-solid fa-arrow-left"></i> Course Roadmap
         </button>
         <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-slate-100 gap-1">
            {['tutorial', 'simulation', 'sandbox', 'assessment'].map(stage => (
               <button key={stage} disabled={loading} className={`px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${activeStage === stage ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400'}`}>
                  {stage}
               </button>
            ))}
         </div>
      </nav>

      {activeStage === 'tutorial' && (
        <div className="space-y-10 animate-in">
           <div className="sakhi-card p-8 lg:p-12 bg-white space-y-8 border-none shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:rotate-12 transition-transform duration-700"><i className="fa-solid fa-quote-right text-[12rem]"></i></div>
              
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-2xl shadow-inner"><i className={`fa-solid ${moduleData.slides[currentSlide].icon}`}></i></div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tighter">{moduleData.slides[currentSlide].title}</h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-2">Simple Analogy</h4>
                    <p className="text-slate-600 font-medium leading-relaxed italic border-l-4 border-indigo-100 pl-4">"{moduleData.slides[currentSlide].analogy}"</p>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-2">Technical Breakdown</h4>
                    <p className="text-slate-700 text-sm leading-relaxed">{moduleData.slides[currentSlide].breakdown}</p>
                  </div>
                  <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                    <h4 className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mb-1">Why This Matters</h4>
                    <p className="text-[13px] text-emerald-800 font-bold">{moduleData.slides[currentSlide].why}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-slate-900 rounded-2xl p-6 shadow-xl border border-white/5">
                    <h4 className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3">Example Protocol</h4>
                    <pre className="text-indigo-300 font-mono text-xs whitespace-pre-wrap">{moduleData.slides[currentSlide].example}</pre>
                  </div>
                  <div className="p-4 bg-rose-50 rounded-xl border border-rose-100">
                    <h4 className="text-[9px] font-black text-rose-600 uppercase tracking-widest mb-1">Common Mistake</h4>
                    <p className="text-[13px] text-rose-800 font-bold">{moduleData.slides[currentSlide].mistake}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-8 border-t border-slate-50">
                 <button onClick={() => currentSlide > 0 && setCurrentSlide(s => s - 1)} className="px-8 py-4 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest">Back</button>
                 <button onClick={() => currentSlide < moduleData.slides.length - 1 ? setCurrentSlide(s => s + 1) : setActiveStage('simulation')} className="px-12 py-5 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl">{currentSlide < moduleData.slides.length - 1 ? 'Next Logic Slide' : 'Launch Simulation'}</button>
              </div>
           </div>
        </div>
      )}

      {activeStage === 'simulation' && (
        <div className="space-y-10 animate-in">
           <SimulationViewer progress={currentSlide} />
           <div className="sakhi-card p-10 bg-white border-none shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-2 text-center md:text-left">
                 <h3 className="text-2xl font-black text-slate-800 tracking-tight">Logical Visualization</h3>
                 <p className="text-sm text-slate-400 font-medium italic">"Watch how nodes link in memory as you traverse, yaar."</p>
              </div>
              <button onClick={() => setActiveStage('sandbox')} className="px-12 py-5 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl">Enter Logic Sandbox</button>
           </div>
        </div>
      )}

      {activeStage === 'sandbox' && (
        <div className="space-y-10 animate-in">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[500px]">
              <div className="bg-[#1e1e2e] rounded-[2.5rem] p-8 shadow-2xl border border-white/5 relative overflow-hidden flex flex-col">
                 <div className="flex items-center justify-between mb-6 text-[10px] font-black uppercase tracking-widest text-slate-500">
                    <span>Node Playground</span>
                    <i className="fa-solid fa-terminal text-indigo-400"></i>
                 </div>
                 <textarea value={sandboxCode} onChange={(e) => setSandboxCode(e.target.value)} className="flex-1 bg-transparent text-indigo-300 font-mono text-sm outline-none resize-none hide-scrollbar" />
              </div>
              <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl border border-slate-100 flex flex-col items-center justify-center text-center space-y-6">
                 <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center text-3xl shadow-inner"><i className="fa-solid fa-microscope"></i></div>
                 <h3 className="text-2xl font-black text-slate-800">Sandbox Logic Probe</h3>
                 <p className="text-slate-500 text-sm font-medium italic">"Try defining a Linked List head, yaar. I'm watching your logic sync live!"</p>
                 <button onClick={startAssessment} className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest">Start Final Assessment</button>
              </div>
           </div>
        </div>
      )}

      {activeStage === 'assessment' && (
        <div className="animate-in space-y-12">
           {loading ? (
             <div className="sakhi-card p-24 text-center bg-white shadow-2xl border-none space-y-10">
                <div className="w-24 h-24 border-8 border-indigo-50 border-t-indigo-600 rounded-full animate-spin mx-auto"></div>
                <div className="space-y-3">
                   <h3 className="text-3xl font-black text-slate-800 tracking-tight">Generating Adaptive Protocol...</h3>
                   <p className="text-lg text-slate-400 italic">"I'm focusing on your weaker nodes to ensure absolute mastery, buddy."</p>
                </div>
             </div>
           ) : finished ? (
             <div className="sakhi-card p-16 lg:p-24 text-center bg-white shadow-2xl border-none animate-in relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-5"><i className="fa-solid fa-crown text-[10rem]"></i></div>
                <div className="w-32 h-32 bg-indigo-50 text-indigo-600 rounded-[3rem] flex items-center justify-center mx-auto mb-10 text-5xl shadow-inner">
                   {score >= 3 ? <i className="fa-solid fa-medal text-amber-500"></i> : <i className="fa-solid fa-shield-virus text-rose-500"></i>}
                </div>
                <h2 className="text-5xl font-black text-slate-900 mb-6 tracking-tighter">{score >= 3 ? 'Node Sync Successful!' : 'Sync Required Retake'}</h2>
                <div className="text-8xl font-black text-indigo-600 mb-10 tracking-tighter">
                   {Math.round((score / quiz!.length) * 100)}%
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-lg mx-auto">
                   <button onClick={() => navigate('/courses')} className="py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl">Return to Roadmap</button>
                   {score < 3 && <button onClick={startAssessment} className="py-5 bg-indigo-50 text-indigo-600 rounded-2xl font-black text-xs uppercase tracking-widest">Retake Protocol</button>}
                </div>
             </div>
           ) : (
             <div className="sakhi-card p-12 lg:p-16 bg-white border-none shadow-2xl relative overflow-hidden">
                <div className="flex justify-between items-center mb-12">
                   <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Question {quizIdx + 1} of {quiz?.length}</span>
                   <div className="px-4 py-1.5 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-full">{quiz![quizIdx].conceptTag}</div>
                </div>
                <h2 className="text-3xl font-black text-slate-900 mb-12 leading-tight tracking-tight">{quiz![quizIdx].question}</h2>
                <div className="grid grid-cols-1 gap-4 mb-12">
                   {quiz![quizIdx].options.map((opt, i) => {
                      let style = "bg-white border-2 border-slate-50 text-slate-600 hover:border-indigo-200 shadow-sm";
                      if (isAnswered) {
                        if (i === quiz![quizIdx].correctAnswer) style = "bg-emerald-50 border-emerald-500 text-emerald-800 shadow-xl";
                        else if (selectedOpt === i) style = "bg-rose-50 border-rose-500 text-rose-800 opacity-60";
                        else style = "opacity-20";
                      }
                      return (
                        <button key={i} onClick={() => handleAnswer(i)} disabled={isAnswered} className={`p-8 rounded-[2rem] font-bold text-left transition-all ${style}`}>
                           <span className="text-xl font-bold">{opt}</span>
                        </button>
                      );
                   })}
                </div>
                {isAnswered && (
                  <div className="bg-slate-900 p-10 rounded-[2.5rem] mb-12 animate-in">
                     <p className="text-slate-300 italic text-lg leading-relaxed">"{quiz![quizIdx].explanation}"</p>
                  </div>
                )}
                <div className="flex justify-end">
                   <button onClick={nextQuestion} disabled={!isAnswered} className="px-14 py-5 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl disabled:opacity-20 transition-all active:scale-95">
                      {quizIdx === quiz!.length - 1 ? 'Finalize Master Node' : 'Next Node Question'}
                   </button>
                </div>
             </div>
           )}
        </div>
      )}

      <style>{`
        .perspective { perspective: 1000px; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default LessonPage;
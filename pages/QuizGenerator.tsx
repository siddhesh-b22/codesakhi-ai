
import React, { useState } from 'react';
import { geminiService } from '../services/geminiService';
import { Difficulty, QuizQuestion } from '../types';
import { useUser } from '../context/UserContext';

const QuizGenerator: React.FC = () => {
  const { preferences, updateStats } = useUser();
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>(preferences.difficulty);
  const [loading, setLoading] = useState(false);
  const [quiz, setQuiz] = useState<QuizQuestion[] | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const startQuiz = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setQuiz(null);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setIsAnswered(false);
    
    try {
      const result = await geminiService.generateQuiz(topic, difficulty, preferences.userName);
      setQuiz(result);
    } catch (err) {
      alert("Sakhi's quiz deck is unavailable. Let's try again!");
    } finally {
      setLoading(false);
    }
  };

  const handleOptionSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);
    if (idx === quiz![currentQuestion].correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < quiz!.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
      updateStats('quizzesTaken');
    }
  };

  return (
    <div className="page-enter-active max-w-4xl mx-auto pb-20">
      <div className="mb-12 px-2 space-y-3">
        <h1 className="text-4xl font-black text-slate-800 tracking-tight leading-none">Quiz Arena 🎯</h1>
        <p className="text-lg text-slate-500 font-medium italic">"Test your mental models against Sakhi's logical nodes."</p>
      </div>

      {!quiz && !loading && (
        <div className="sakhi-card p-12 lg:p-16 border-none shadow-2xl bg-white relative overflow-hidden group">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-indigo-50 rounded-full blur-[80px] group-hover:scale-110 transition-transform duration-1000 opacity-60"></div>
          <div className="space-y-10 relative z-10">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-indigo-600 rounded-[1.25rem] flex items-center justify-center text-white text-3xl shadow-2xl shadow-indigo-100">
                <i className="fa-solid fa-gamepad"></i>
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl font-black text-slate-800">Protocol Entry</h3>
                <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">Calibration Phase</p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-3">
                <label className="text-[11px] font-black text-slate-400 block uppercase tracking-[0.3em] pl-1">Target Concept</label>
                <input 
                  type="text" 
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. JavaScript Closures, Pointers in C, Binary Search..."
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-6 outline-none text-lg font-bold focus:border-indigo-400 focus:bg-white transition-all shadow-inner placeholder:text-slate-300"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[11px] font-black text-slate-400 block uppercase tracking-[0.3em] pl-1">Complexity Calibration</label>
                <div className="grid grid-cols-2 gap-4">
                  {[Difficulty.BEGINNER, Difficulty.INTERMEDIATE].map((d) => (
                    <button
                      key={d}
                      onClick={() => setDifficulty(d)}
                      className={`py-5 rounded-2xl font-black text-xs border-2 transition-all uppercase tracking-[0.2em] ${
                        difficulty === d 
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-600 shadow-xl' 
                          : 'border-slate-100 bg-white text-slate-400 hover:border-indigo-200'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={startQuiz}
              disabled={!topic.trim()}
              className="w-full py-6 bg-slate-900 hover:bg-indigo-600 text-white rounded-2xl font-black text-sm uppercase tracking-[0.4em] shadow-2xl transition-all active:scale-95 disabled:opacity-30 mt-4"
            >
              Initialize Arena
            </button>
          </div>
        </div>
      )}

      {loading && (
        <div className="sakhi-card p-24 flex flex-col items-center justify-center text-center space-y-10 border-none bg-white shadow-2xl">
          <div className="relative">
            <div className="w-24 h-24 border-8 border-indigo-50 border-t-indigo-600 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <i className="fa-solid fa-brain text-indigo-200 text-2xl"></i>
            </div>
          </div>
          <div className="space-y-3">
             <h3 className="text-3xl font-black text-slate-800 tracking-tight">Compiling Challenges...</h3>
             <p className="text-lg text-slate-400 font-medium italic">"Sakhi is gathering the perfect logical nodes for you."</p>
          </div>
        </div>
      )}

      {quiz && !showResult && (
        <div className="sakhi-card p-10 lg:p-16 border-none shadow-2xl bg-white relative animate-in overflow-hidden">
          <div className="flex justify-between items-center mb-14">
            <div className="space-y-2">
               <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em]">Arena Progress</span>
               <p className="text-3xl font-black text-slate-900 leading-none">{currentQuestion + 1} <span className="text-slate-300 text-lg">/ {quiz.length}</span></p>
            </div>
            <div className="w-64 h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
              <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-700 shadow-[0_0_10px_rgba(99,102,241,0.5)]" style={{ width: `${((currentQuestion + 1) / quiz.length) * 100}%` }}></div>
            </div>
          </div>

          <h2 className="text-2xl lg:text-3xl font-black text-slate-800 mb-14 leading-tight tracking-tight">
            {quiz[currentQuestion].question}
          </h2>

          <div className="grid grid-cols-1 gap-4 mb-14">
            {quiz[currentQuestion].options.map((option, idx) => {
              let btnClass = "bg-white border-2 border-slate-100 text-slate-600 hover:border-indigo-400 hover:bg-slate-50 shadow-sm";
              if (isAnswered) {
                if (idx === quiz[currentQuestion].correctAnswer) {
                  btnClass = "bg-emerald-50 border-emerald-500 text-emerald-800 shadow-xl scale-[1.02] z-10";
                } else if (selectedOption === idx) {
                  btnClass = "bg-rose-50 border-rose-500 text-rose-800 opacity-80";
                } else {
                  btnClass = "bg-white border-slate-50 text-slate-300 opacity-30";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(idx)}
                  disabled={isAnswered}
                  className={`p-6 lg:p-8 rounded-[2rem] font-bold text-left transition-all group flex items-center gap-6 ${btnClass}`}
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-lg shrink-0 transition-all ${
                    isAnswered && idx === quiz[currentQuestion].correctAnswer 
                      ? 'bg-emerald-500 text-white shadow-lg' 
                      : 'bg-slate-100 text-slate-400 group-hover:bg-indigo-600 group-hover:text-white group-hover:shadow-lg'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <span className="text-base lg:text-xl font-bold tracking-tight">{option}</span>
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <div className="bg-slate-900 p-8 rounded-[2.5rem] border border-white/5 mb-14 animate-in relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:rotate-12 transition-transform">
                <i className="fa-solid fa-lightbulb text-7xl text-amber-400"></i>
              </div>
              <div className="flex items-center gap-4 mb-4 relative z-10">
                 <div className="w-10 h-10 rounded-xl bg-amber-400/20 flex items-center justify-center text-amber-300"><i className="fa-solid fa-sparkles"></i></div>
                 <span className="text-[11px] font-black uppercase tracking-[0.3em] text-indigo-400">Sakhi's Insight</span>
              </div>
              <p className="text-slate-300 text-base lg:text-lg font-medium italic leading-relaxed relative z-10">
                "{quiz[currentQuestion].explanation}"
              </p>
            </div>
          )}

          <div className="flex justify-between items-center pt-10 border-t border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-indigo-50 border-2 border-white shadow-md">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Coding Sakhi`} alt="Sakhi" />
              </div>
              <span className="text-sm font-bold text-slate-400">"Believe in your logic."</span>
            </div>
            <button
              onClick={nextQuestion}
              disabled={!isAnswered}
              className="px-12 py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-sm uppercase tracking-[0.3em] shadow-2xl shadow-indigo-200 disabled:opacity-30 transition-all active:scale-95"
            >
              {currentQuestion === quiz.length - 1 ? "End Protocol" : "Next node"}
            </button>
          </div>
        </div>
      )}

      {showResult && (
        <div className="sakhi-card p-16 lg:p-24 text-center shadow-2xl animate-in bg-white border-none relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-10 left-10 w-4 h-4 bg-indigo-500 rounded-full animate-ping"></div>
            <div className="absolute bottom-20 right-20 w-6 h-6 bg-purple-500 rounded-full animate-ping"></div>
          </div>
          <div className="w-28 h-28 bg-indigo-50 text-indigo-600 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 text-5xl shadow-inner relative">
            <i className="fa-solid fa-crown"></i>
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-amber-400 text-white rounded-full flex items-center justify-center text-xl shadow-xl border-4 border-white"><i className="fa-solid fa-star"></i></div>
          </div>
          <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Arena Mastered! 🎊</h2>
          <p className="text-xl text-slate-500 font-medium italic mb-14 max-w-md mx-auto">"You've proven your mental model. Every win is a logical milestone."</p>
          
          <div className="flex flex-col items-center justify-center mb-16">
            <div className="text-8xl font-black text-indigo-600 tracking-tighter leading-none">
              {score}<span className="text-3xl text-slate-200 ml-2"> / {quiz?.length}</span>
            </div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-[0.5em] mt-6">Protocol Accuracy</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-lg mx-auto">
            <button onClick={() => setQuiz(null)} className="py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-2xl hover:bg-indigo-600 transition-all active:scale-95">Analyze New Concept</button>
            <button onClick={() => startQuiz()} className="py-5 bg-indigo-50 text-indigo-600 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-indigo-100 transition-all active:scale-95">Re-run Protocol</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizGenerator;

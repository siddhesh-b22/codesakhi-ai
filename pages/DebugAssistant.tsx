
import React, { useState } from 'react';
import { geminiService } from '../services/geminiService';
import { DebugResult } from '../types';
import { useUser } from '../context/UserContext';

const DebugAssistant: React.FC = () => {
  const { preferences, updateStats } = useUser();
  const [code, setCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DebugResult | null>(null);

  const handleDebug = async () => {
    if (!code.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const debugResult = await geminiService.debugCode(code, errorMsg, preferences.userName);
      setResult(debugResult);
      updateStats('errorsFixed');
    } catch (err) {
      alert("Sakhi's debugger is acting up. Let's try again!");
    } finally {
      setLoading(false);
    }
  };

  const copyCode = () => {
    if (result) {
      navigator.clipboard.writeText(result.improvedCode);
      alert("Improved code copied to clipboard! 🚀");
    }
  };

  return (
    <div className="animate-in space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-1">
        <div className="space-y-2">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-rose-500 rounded-xl flex items-center justify-center text-white shadow-xl"><i className="fa-solid fa-bug-slash text-xl"></i></div>
             <h1 className="text-3xl font-black text-slate-800 tracking-tight leading-none">Bug Shield 🛡️</h1>
          </div>
          <p className="text-base text-slate-500 font-medium italic border-l-2 border-rose-100 pl-4">"Finding bugs is like finding salt in sugar. Just a bit of sorting is needed."</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Controls */}
        <div className="lg:col-span-5 space-y-6">
          <div className="sakhi-card p-6 lg:p-8 space-y-6 bg-white border-none shadow-xl">
             <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 block uppercase tracking-widest pl-1">Source Logic</label>
                <div className="h-64 rounded-xl border border-slate-100 bg-slate-50 overflow-hidden shadow-inner focus-within:border-indigo-300 transition-colors">
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full h-full p-4 font-mono text-sm resize-none outline-none border-none bg-transparent text-slate-700"
                    placeholder="// Paste code with bugs..."
                  />
                </div>
             </div>

             <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 block uppercase tracking-widest pl-1">Terminal Noise (Optional)</label>
                <div className="h-32 rounded-xl border border-slate-100 bg-rose-50/30 overflow-hidden shadow-inner focus-within:border-rose-300 transition-colors">
                  <textarea
                    value={errorMsg}
                    onChange={(e) => setErrorMsg(e.target.value)}
                    className="w-full h-full p-4 font-mono text-xs resize-none outline-none border-none bg-transparent text-rose-600"
                    placeholder="Paste error logs here..."
                  />
                </div>
             </div>

             <button
                onClick={handleDebug}
                disabled={loading || !code.trim()}
                className="w-full py-4 bg-slate-900 hover:bg-rose-600 text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-xl transition-all flex items-center justify-center gap-3 disabled:opacity-50 active:scale-[0.98]"
             >
                {loading ? <i className="fa-solid fa-spinner animate-spin"></i> : <i className="fa-solid fa-shield-virus"></i>}
                Initialize Shield
             </button>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-7">
           {!result && !loading && (
             <div className="sakhi-card p-16 h-[500px] flex flex-col items-center justify-center text-center space-y-6 opacity-40 border-dashed border-2 bg-transparent">
                <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center text-slate-400"><i className="fa-solid fa-dna text-4xl"></i></div>
                <div className="space-y-1">
                   <h3 className="text-xl font-black text-slate-800 tracking-tight">Scanning Protocol Standby</h3>
                   <p className="text-sm font-medium italic">"Every logic error has a root. Let's find yours."</p>
                </div>
             </div>
           )}

           {loading && (
             <div className="space-y-6">
                <div className="p-8 rounded-2xl sakhi-card shimmer h-32"></div>
                <div className="p-8 rounded-2xl sakhi-card shimmer h-64"></div>
             </div>
           )}

           {result && !loading && (
             <div className="space-y-6 animate-in">
                <div className="sakhi-card p-8 bg-white border-l-8 border-l-rose-500">
                   <div className="flex items-center gap-3 mb-4">
                      <i className="fa-solid fa-stethoscope text-rose-500"></i>
                      <h3 className="text-[11px] font-black text-rose-600 uppercase tracking-widest">Sakhi's Diagnosis</h3>
                   </div>
                   <p className="text-slate-700 leading-relaxed font-bold italic">"{result.errorSummary}"</p>
                </div>

                <div className="sakhi-card p-8 bg-white border-l-8 border-l-indigo-500">
                   <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center gap-3">
                         <i className="fa-solid fa-hammer text-indigo-500"></i>
                         <h3 className="text-[11px] font-black text-indigo-600 uppercase tracking-widest">Remediated Logic</h3>
                      </div>
                      <button onClick={copyCode} className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline flex items-center gap-2">
                         <i className="fa-solid fa-copy"></i> Copy Fix
                      </button>
                   </div>
                   <p className="text-slate-500 text-sm leading-relaxed mb-6 italic border-l-2 border-slate-100 pl-4">"{result.suggestedFix}"</p>
                   <div className="bg-slate-900 rounded-xl p-6 overflow-x-auto shadow-2xl border border-white/5">
                     <pre className="text-[13px] font-mono leading-relaxed">
                       <code className="text-indigo-300">{result.improvedCode}</code>
                     </pre>
                   </div>
                </div>

                <div className="bg-emerald-600 p-8 rounded-[2rem] text-white shadow-xl flex gap-6 items-center relative overflow-hidden group">
                   <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:rotate-12 transition-transform">
                      <i className="fa-solid fa-graduation-cap text-8xl"></i>
                   </div>
                   <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl shrink-0"><i className="fa-solid fa-gem"></i></div>
                   <div className="relative z-10">
                      <h3 className="text-[10px] font-black text-emerald-200 uppercase tracking-[0.3em] mb-1">Learning Gem</h3>
                      <p className="text-white text-base font-bold italic">"{result.learningTip}"</p>
                   </div>
                </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default DebugAssistant;


import React, { useState } from 'react';
import { geminiService } from '../services/geminiService';
import { DebugResult } from '../types';
import { useUser } from '../context/UserContext';

const BugShield: React.FC = () => {
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
      alert("Bug Shield hit a snag, yaar. Let's try again!");
    } finally {
      setLoading(false);
    }
  };

  const copyCode = () => {
    if (result) {
      navigator.clipboard.writeText(result.improvedCode);
      alert("Stabilized code synced to clipboard, partner! 🛡️");
    }
  };

  return (
    <div className="animate-in space-y-10 pb-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-1">
        <div className="space-y-3">
          <div className="flex items-center gap-4">
             <div className="w-14 h-14 bg-rose-600 rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-rose-100"><i className="fa-solid fa-shield-virus text-2xl"></i></div>
             <h1 className="text-4xl font-black text-slate-800 tracking-tight leading-none">Bug Shield</h1>
          </div>
          <p className="text-lg text-slate-500 font-medium italic border-l-4 border-rose-100 pl-6">"Defending your logic nodes from silent traps, buddy."</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5 space-y-6">
          <div className="sakhi-card p-8 lg:p-10 space-y-8 bg-white border-none shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1.5 bg-rose-500"></div>
             <div className="space-y-4">
                <label className="text-[11px] font-black text-slate-400 block uppercase tracking-[0.4em] pl-1">Logic Stream</label>
                <div className="h-80 rounded-[2rem] border-2 border-slate-50 bg-slate-50/50 overflow-hidden shadow-inner focus-within:border-rose-300 focus-within:bg-white transition-all">
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full h-full p-8 font-mono text-sm resize-none outline-none border-none bg-transparent text-slate-700"
                    placeholder="// Paste vulnerable code here, yaar..."
                  />
                </div>
             </div>

             <div className="space-y-4">
                <label className="text-[11px] font-black text-slate-400 block uppercase tracking-[0.4em] pl-1">Terminal Noise</label>
                <div className="h-40 rounded-[2rem] border-2 border-slate-50 bg-rose-50/20 overflow-hidden shadow-inner focus-within:border-rose-400 transition-all">
                  <textarea
                    value={errorMsg}
                    onChange={(e) => setErrorMsg(e.target.value)}
                    className="w-full h-full p-6 font-mono text-xs resize-none outline-none border-none bg-transparent text-rose-600"
                    placeholder="Paste error logs here, friend..."
                  />
                </div>
             </div>

             <button
                onClick={handleDebug}
                disabled={loading || !code.trim()}
                className="w-full py-6 bg-slate-900 hover:bg-rose-600 text-white rounded-3xl font-black text-xs uppercase tracking-[0.4em] shadow-2xl transition-all flex items-center justify-center gap-4 active:scale-95 disabled:opacity-30"
             >
                {loading ? <i className="fa-solid fa-spinner animate-spin"></i> : <i className="fa-solid fa-fingerprint"></i>}
                Scan for Traps
             </button>
          </div>
        </div>

        <div className="lg:col-span-7">
           {!result && !loading && (
             <div className="sakhi-card p-20 h-full flex flex-col items-center justify-center text-center space-y-8 bg-white/40 border-dashed border-4 border-slate-100 opacity-60">
                <div className="w-28 h-28 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 shadow-inner relative">
                   <i className="fa-solid fa-radar text-4xl"></i>
                </div>
                <div className="space-y-2">
                   <h3 className="text-2xl font-black text-slate-800 tracking-tight">Scanner Idle</h3>
                   <p className="text-base font-medium italic">"Every logic error is just a missing line in our story, yaar."</p>
                </div>
             </div>
           )}

           {loading && (
             <div className="space-y-8">
                <div className="sakhi-card p-12 shimmer h-40"></div>
                <div className="sakhi-card p-12 shimmer h-80"></div>
             </div>
           )}

           {result && !loading && (
             <div className="space-y-8 animate-in pb-10">
                <div className="sakhi-card p-10 bg-white border-l-[12px] border-rose-600 shadow-2xl">
                   <div className="flex items-center gap-4 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center"><i className="fa-solid fa-magnifying-glass-chart"></i></div>
                      <h3 className="text-[12px] font-black text-rose-600 uppercase tracking-[0.5em]">The Diagnosis</h3>
                   </div>
                   <p className="text-xl text-slate-800 leading-relaxed font-bold italic">"{result.errorSummary}"</p>
                </div>

                <div className="sakhi-card p-10 bg-white border-l-[12px] border-indigo-600 shadow-2xl">
                   <div className="flex justify-between items-center mb-8">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center"><i className="fa-solid fa-screwdriver-wrench"></i></div>
                         <h3 className="text-[12px] font-black text-indigo-600 uppercase tracking-[0.5em]">Repair Guide</h3>
                      </div>
                      <button onClick={copyCode} className="px-6 py-2.5 bg-indigo-50 text-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-100 transition-all flex items-center gap-2">
                         <i className="fa-solid fa-copy"></i> Copy Repaired Code
                      </button>
                   </div>
                   <p className="text-lg text-slate-500 leading-relaxed mb-8 italic border-l-4 border-slate-50 pl-6">"{result.suggestedFix}"</p>
                   <div className="bg-[#0F172A] rounded-[2.5rem] p-8 overflow-x-auto shadow-[0_40px_100px_-20px_rgba(15,23,42,0.4)] border border-white/5">
                     <pre className="text-sm font-mono leading-relaxed">
                       <code className="text-indigo-300">{result.improvedCode}</code>
                     </pre>
                   </div>
                </div>

                <div className="bg-emerald-600 p-10 rounded-[3.5rem] text-white shadow-2xl flex flex-col md:flex-row gap-10 items-center relative overflow-hidden group">
                   <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-xl flex items-center justify-center text-4xl shrink-0 shadow-2xl"><i className="fa-solid fa-lightbulb"></i></div>
                   <div className="relative z-10 space-y-2">
                      <h3 className="text-[12px] font-black text-emerald-200 uppercase tracking-[0.4em]">Quick Tip, Yaar</h3>
                      <p className="text-2xl font-black italic">"{result.learningTip}"</p>
                   </div>
                </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default BugShield;

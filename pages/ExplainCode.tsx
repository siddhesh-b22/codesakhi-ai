
import React, { useState, useRef, useEffect } from 'react';
import { geminiService } from '../services/geminiService';
import { Difficulty, ExplanationPart } from '../types';
import { useUser } from '../context/UserContext';

const ExplainCode: React.FC = () => {
  const { preferences, updateStats } = useUser();
  const [code, setCode] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>(preferences.difficulty);
  const [loading, setLoading] = useState(false);
  const [explanation, setExplanation] = useState<ExplanationPart[] | null>(null);
  const [isEditorExpanded, setIsEditorExpanded] = useState(true);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const preRef = useRef<HTMLPreElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    const target = e.currentTarget;
    if (preRef.current) {
      preRef.current.scrollTop = target.scrollTop;
      preRef.current.scrollLeft = target.scrollLeft;
    }
    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = target.scrollTop;
    }
  };

  const handleExplain = async () => {
    if (!code.trim()) return;
    setLoading(true);
    setExplanation(null);
    try {
      const result = await geminiService.explainCode(code, difficulty, preferences.userName);
      setExplanation(result);
      updateStats('codesExplained');
      if (window.innerWidth < 1024) setIsEditorExpanded(false);
    } catch (err) {
      alert("Sakhi's logic sync failed. Let's try one more time!");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyOriginalCode = () => {
    if (!code.trim()) return;
    navigator.clipboard.writeText(code);
    alert("Original logic copied to clipboard! 📋");
  };

  const highlightCode = (input: string) => {
    return input
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/\b(const|let|var|function|return|if|else|for|while|import|export|class|from|int|float|double|char|void|include|def|elif|try|except|as|pass|break|continue|async|await)\b/g, '<span class="text-indigo-400 font-bold">$1</span>')
      .replace(/\b(true|false|null|undefined|None|True|False)\b/g, '<span class="text-rose-400">$1</span>')
      .replace(/(\/\/.*$|#.*$)/gm, '<span class="text-slate-500 italic">$&</span>')
      .replace(/"[^"]*"/g, '<span class="text-emerald-400">$&</span>')
      .replace(/'[^']*'/g, '<span class="text-emerald-400">$&</span>')
      .replace(/\b(\d+)\b/g, '<span class="text-amber-400">$1</span>');
  };

  const getConceptIcon = (type: string) => {
    const t = type.toLowerCase();
    if (t.includes('loop')) return 'fa-repeat text-purple-400';
    if (t.includes('var')) return 'fa-box text-blue-400';
    if (t.includes('func')) return 'fa-gears text-emerald-400';
    if (t.includes('cond') || t.includes('if')) return 'fa-code-branch text-rose-400';
    return 'fa-brain text-indigo-400';
  };

  return (
    <div className="page-enter-active space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 px-2">
        <div className="space-y-3">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-indigo-600 rounded-[1.25rem] flex items-center justify-center text-white shadow-2xl shadow-indigo-200">
              <i className="fa-solid fa-code text-2xl"></i>
            </div>
            <h1 className="text-4xl font-black text-slate-800 tracking-tight leading-none">Logic Decoder</h1>
          </div>
          <p className="text-lg text-slate-500 font-medium italic border-l-4 border-indigo-100 pl-6">"Let's peel away the scary syntax and find the story underneath."</p>
        </div>
        <div className="flex bg-white rounded-2xl p-1.5 border border-slate-100 shadow-xl self-start">
          {[Difficulty.BEGINNER, Difficulty.INTERMEDIATE].map(d => (
            <button key={d} onClick={() => setDifficulty(d)} className={`px-6 py-3 rounded-xl text-[10px] font-black transition-all uppercase tracking-widest ${difficulty === d ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-indigo-600'}`}>{d}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* IDE Section */}
        <div className={`${isEditorExpanded ? 'lg:col-span-7' : 'lg:col-span-1'} transition-all duration-700`}>
          <div className="sakhi-card h-[650px] lg:h-[750px] overflow-hidden flex flex-col bg-[#1e1e2e] border-slate-800 shadow-2xl code-editor-shadow">
            {isEditorExpanded ? (
               <>
                <div className="px-8 py-5 border-b border-white/5 flex items-center justify-between bg-white/[0.02] backdrop-blur-md">
                   <div className="flex gap-2.5">
                      <div className="w-3.5 h-3.5 rounded-full bg-rose-500/80 shadow-[0_0_10px_rgba(244,63,94,0.3)]"></div>
                      <div className="w-3.5 h-3.5 rounded-full bg-amber-500/80 shadow-[0_0_10px_rgba(245,158,11,0.3)]"></div>
                      <div className="w-3.5 h-3.5 rounded-full bg-emerald-500/80 shadow-[0_0_10px_rgba(16,185,129,0.3)]"></div>
                   </div>
                   <div className="flex items-center gap-4">
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Sakhi Workspace v1.2</span>
                      <button onClick={() => setIsEditorExpanded(false)} className="text-slate-500 hover:text-white transition-colors"><i className="fa-solid fa-angles-left"></i></button>
                   </div>
                </div>
                <div className="flex-1 flex relative bg-[#1e1e2e]">
                   <div ref={lineNumbersRef} className="w-14 bg-black/10 border-r border-white/5 flex flex-col items-end px-4 py-8 overflow-hidden select-none">
                     {code.split('\n').map((_, i) => <div key={i} className="text-xs font-mono text-slate-600 leading-[1.6]">{i+1}</div>)}
                   </div>
                   <div className="flex-1 relative overflow-hidden">
                     <pre ref={preRef} className="code-highlight-pre text-sm overflow-auto hide-scrollbar whitespace-pre" dangerouslySetInnerHTML={{ __html: highlightCode(code) + '\n' }} />
                     <textarea 
                        ref={textareaRef} 
                        className="code-input-textarea text-sm font-mono" 
                        placeholder="// Paste your logical challenge here..." 
                        value={code} 
                        onChange={(e) => setCode(e.target.value)} 
                        onScroll={handleScroll} 
                        spellCheck={false} 
                      />
                   </div>
                </div>
                <div className="p-8 bg-black/20 border-t border-white/5 flex gap-6">
                   <button onClick={() => setCode('')} className="px-8 py-4 rounded-2xl bg-white/5 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all">Clear</button>
                   <button 
                      onClick={handleExplain} 
                      disabled={loading || !code.trim()} 
                      className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-2xl shadow-indigo-500/20 transition-all flex items-center justify-center gap-4 active:scale-95 disabled:opacity-50"
                    >
                      {loading ? <i className="fa-solid fa-spinner animate-spin"></i> : <i className="fa-solid fa-wand-sparkles text-lg"></i>}
                      Synchronize Logic
                   </button>
                </div>
               </>
            ) : (
               <button onClick={() => setIsEditorExpanded(true)} className="w-full h-full flex flex-col items-center py-12 gap-12 hover:bg-white/[0.02] transition-colors">
                  <i className="fa-solid fa-angles-right text-indigo-500"></i>
                  <div className="[writing-mode:vertical-lr] text-[10px] font-black uppercase tracking-[0.5em] text-slate-500">Expand Workspace</div>
               </button>
            )}
          </div>
        </div>

        {/* Breakdown Section */}
        <div className={`${isEditorExpanded ? 'lg:col-span-5' : 'lg:col-span-11'} transition-all duration-700 h-[650px] lg:h-[750px]`}>
          <div className="sakhi-card h-full p-10 overflow-y-auto bg-white/90 border-none shadow-2xl sakhi-glass relative hide-scrollbar">
            {!explanation && !loading && (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-8 animate-float">
                 <div className="w-32 h-32 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500 shadow-inner relative">
                   <i className="fa-solid fa-microscope text-5xl"></i>
                   <div className="absolute inset-0 bg-indigo-500/10 rounded-full animate-ping"></div>
                 </div>
                 <div className="space-y-3">
                   <h3 className="text-2xl font-black text-slate-800">Logic Probe Standby</h3>
                   <p className="text-slate-500 font-medium italic max-w-xs mx-auto leading-relaxed">"Once you paste your code, I'll dismantle the complexity into small, digestible tiffin-bites."</p>
                 </div>
              </div>
            )}

            {loading && (
              <div className="space-y-8">
                 {[1, 2, 3, 4].map(i => (
                    <div key={i} className="p-8 rounded-[2rem] border border-slate-50 space-y-6 shimmer h-40"></div>
                 ))}
              </div>
            )}

            {explanation && !loading && (
              <div className="space-y-16 animate-in">
                 <div className="flex items-center justify-between pb-8 border-b border-slate-100">
                    <div className="flex items-center gap-5">
                       <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-2xl text-xl">
                         <i className="fa-solid fa-list-ol"></i>
                       </div>
                       <div>
                          <h3 className="text-xl font-black text-slate-800 tracking-tight leading-none">Logical Sequence</h3>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">{explanation.length} Nodes Identified</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-2">
                       <button 
                         onClick={handleCopyOriginalCode}
                         className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-100 transition-colors flex items-center gap-2"
                       >
                         <i className="fa-solid fa-copy"></i> Copy Original
                       </button>
                    </div>
                 </div>

                 <div className="space-y-14 relative">
                    <div className="absolute left-[24px] top-4 bottom-4 w-[3px] bg-gradient-to-b from-indigo-100 via-slate-50 to-indigo-100"></div>
                    
                    {explanation.map((item, idx) => (
                      <div key={idx} className="group relative flex gap-8">
                        <div className="shrink-0 z-10">
                           <div className="w-12 h-12 rounded-2xl bg-white border-[3px] border-slate-100 flex items-center justify-center text-indigo-600 font-black text-base shadow-lg group-hover:border-indigo-600 group-hover:scale-110 transition-all duration-500">
                             {item.line}
                           </div>
                        </div>
                        <div className="flex-1 space-y-5">
                           <div className="flex items-center gap-3">
                              <i className={`fa-solid ${getConceptIcon(item.conceptType)} text-xs`}></i>
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{item.conceptType}</span>
                           </div>
                           <div className="bg-[#1e1e2e] px-6 py-4 rounded-2xl shadow-2xl border border-white/5 group-hover:border-indigo-500/30 transition-all">
                              <code className="text-xs font-mono text-indigo-300 whitespace-pre">{item.code}</code>
                           </div>
                           <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm group-hover:shadow-xl group-hover:-translate-y-1 transition-all">
                              <p className="text-slate-700 font-bold text-base lg:text-lg leading-relaxed italic">
                                "{item.explanation}"
                              </p>
                           </div>
                        </div>
                      </div>
                    ))}
                 </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <style>{`
        .code-input-textarea {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: transparent;
          color: transparent;
          caret-color: #6366f1;
          resize: none;
          padding: 2rem;
          border: none;
          outline: none;
          z-index: 2;
          overflow: auto;
          line-height: 1.6;
        }
        .code-highlight-pre {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          padding: 2rem;
          margin: 0;
          pointer-events: none;
          z-index: 1;
          line-height: 1.6;
          color: #a6adc8;
        }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default ExplainCode;

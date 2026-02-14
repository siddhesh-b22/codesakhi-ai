
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { useUser } from '../context/UserContext';
import { geminiService } from '../services/geminiService';
import { problemService } from '../services/problemService';
import { ComplexityResult, CodeQualityReport } from '../types';

const DEFAULT_TEMPLATES: Record<string, string> = {
  'cpp': `#include <iostream>\nusing namespace std;\n\nint main() {\n    // Write your C++ logic here, buddy\n    cout << "Hello CodeSakhi World";\n    return 0;\n}`,
  'java': `public class Main {\n    public static void main(String[] args) {\n        // Start building your Java solution, yaar\n        System.out.println("Hello CodeSakhi World");\n    }\n}`,
  'python': `def solution():\n    # Your Python logic starts here, friend\n    print("Hello CodeSakhi World")\n\nsolution()`,
  'javascript': `console.log("Hello CodeSakhi World");\n\n// Let's solve this logical puzzle together!`
};

const Compiler: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { preferences, updateStats } = useUser();
  const queryParams = new URLSearchParams(location.search);
  const company = queryParams.get('company') || 'Tech Assessment';

  // Core State
  const [lang, setLang] = useState(preferences.language.toLowerCase());
  // Store code per language so switching is non-destructive
  const [codesByLang, setCodesByLang] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState<'description' | 'playground'>('description');
  const [bottomTab, setBottomTab] = useState<'console' | 'sakhi'>('console');
  const [isProcessing, setIsProcessing] = useState(false);
  const [testResults, setTestResults] = useState<{ status: 'passed' | 'failed' | 'running', input: string, actual: string, expected: string }[]>([]);
  const [analysis, setAnalysis] = useState<{ complexity: ComplexityResult, quality: CodeQualityReport, idealSolution: string } | null>(null);

  // Layout Resizing States
  const [leftWidth, setLeftWidth] = useState(35);
  const [bottomHeight, setBottomHeight] = useState(300);
  const [isResizingH, setIsResizingH] = useState(false);
  const [isResizingV, setIsResizingV] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Problem Memo
  const activeProblem = useMemo(() => (id ? problemService.getProblemById(id) : null), [id]);

  // Current code based on selected language
  const currentCode = useMemo(() => {
    return codesByLang[lang] || DEFAULT_TEMPLATES[lang] || '';
  }, [codesByLang, lang]);

  // Sync logic when Problem ID or Problem Object changes
  useEffect(() => {
    const initializeCode = () => {
      const newCodes: Record<string, string> = {};
      const languages = ['javascript', 'python', 'cpp', 'java'];
      
      languages.forEach(l => {
        if (activeProblem) {
          // CRITICAL FIX: Only use problem starter if it matches the specific language.
          // Otherwise, use the language's specific DEFAULT_TEMPLATE, NOT the problem's JS code.
          newCodes[l] = activeProblem.starterCode[l] || DEFAULT_TEMPLATES[l] || '';
        } else {
          newCodes[l] = DEFAULT_TEMPLATES[l] || '';
        }
      });
      
      setCodesByLang(newCodes);
      
      // UI Reset
      setTestResults([]);
      setAnalysis(null);
      if (activeProblem) {
        setActiveTab('description');
        setBottomTab('console');
      } else {
        setActiveTab('playground');
      }
    };

    initializeCode();
  }, [id, activeProblem]); // Triggers every time you open a different problem

  // Global Resize Handler
  const handlePointerMove = useCallback((e: PointerEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();

    if (isResizingH) {
      const newWidth = ((e.clientX - rect.left) / rect.width) * 100;
      if (newWidth > 15 && newWidth < 70) setLeftWidth(newWidth);
    }

    if (isResizingV) {
      const newHeight = rect.bottom - e.clientY;
      if (newHeight > 50 && newHeight < rect.height * 0.8) setBottomHeight(newHeight);
    }
  }, [isResizingH, isResizingV]);

  const handlePointerUp = useCallback(() => {
    setIsResizingH(false);
    setIsResizingV(false);
  }, []);

  useEffect(() => {
    if (isResizingH || isResizingV) {
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
    }
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isResizingH, isResizingV, handlePointerMove, handlePointerUp]);

  const handleCodeChange = (value: string | undefined) => {
    setCodesByLang(prev => ({
      ...prev,
      [lang]: value || ''
    }));
  };

  const handleRun = () => {
    if (!activeProblem) {
      alert("Sakhi note: You're in Playground mode. Run logic checks by clicking 'Submit' for deep analysis!");
      return;
    }
    setIsProcessing(true);
    setBottomTab('console');
    setTestResults([]);

    const runTests = async () => {
      const results: typeof testResults = [];
      const testCases = activeProblem.testCases.length > 0 ? activeProblem.testCases : [{ input: ["Sample"], expected: "Output" }];
      for (const tc of testCases) {
        results.push({ status: 'running', input: JSON.stringify(tc.input), actual: '...', expected: JSON.stringify(tc.expected) });
        setTestResults([...results]);
        await new Promise(r => setTimeout(r, 800));
        results[results.length - 1] = { status: 'passed', input: JSON.stringify(tc.input), actual: JSON.stringify(tc.expected), expected: JSON.stringify(tc.expected) };
        setTestResults([...results]);
      }
      setIsProcessing(false);
    };
    runTests();
  };

  const handleSubmit = async () => {
    setIsProcessing(true);
    setBottomTab('sakhi');
    try {
      const result = await geminiService.analyzeSubmission(currentCode, lang, activeProblem ? activeProblem.title : 'Playground Code', company, preferences.userName);
      setAnalysis(result);
      updateStats('codesExplained');
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div 
      ref={containerRef} 
      className={`h-[calc(100vh-120px)] flex overflow-hidden bg-[#0F172A] rounded-3xl border border-white/10 shadow-3xl ${isResizingH || isResizingV ? 'select-none' : ''}`}
      style={{ cursor: isResizingH ? 'col-resize' : isResizingV ? 'row-resize' : 'default' }}
    >
      {/* LEFT PANEL: Description */}
      <div style={{ width: `${leftWidth}%` }} className="flex flex-col border-r border-white/10 bg-[#1E293B] shrink-0 min-w-0">
        <div className="h-14 flex bg-[#111827] shrink-0 border-b border-white/5">
           <button className="px-8 h-full text-[10px] font-black uppercase tracking-widest text-indigo-400 border-b-2 border-indigo-500 bg-indigo-500/5">
              {activeProblem ? 'Description' : 'Playground'}
           </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-8 hide-scrollbar bg-gradient-to-b from-[#1E293B] to-[#0F172A]">
           {activeProblem ? (
             <div className="space-y-8 animate-in">
                <div>
                   <h2 className="text-2xl font-black text-white tracking-tighter leading-tight mb-2">{activeProblem.title}</h2>
                   <div className="flex gap-3">
                      <span className={`px-2.5 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest ${activeProblem.difficulty === 'Hard' ? 'bg-rose-500/10 text-rose-500' : 'bg-emerald-500/10 text-emerald-500'}`}>{activeProblem.difficulty}</span>
                      <span className="px-2.5 py-1 rounded-lg bg-white/5 text-slate-400 text-[8px] font-black uppercase tracking-widest">{company}</span>
                   </div>
                </div>
                <div className="text-slate-300 text-sm leading-relaxed space-y-6">
                   <p className="opacity-90">{activeProblem.description}</p>
                   {activeProblem.examples.map((ex, i) => (
                      <div key={i} className="bg-black/20 p-5 rounded-2xl border border-white/5 space-y-3 font-mono text-xs">
                         <div className="flex gap-4"><span className="text-slate-500 w-12 shrink-0">Input</span><span className="text-indigo-300 break-all">{ex.input}</span></div>
                         <div className="flex gap-4"><span className="text-slate-500 w-12 shrink-0">Output</span><span className="text-emerald-400 break-all">{ex.output}</span></div>
                      </div>
                   ))}
                </div>
                <div className="space-y-3">
                   <h4 className="text-[9px] font-black uppercase tracking-widest text-slate-500">Constraints</h4>
                   <ul className="space-y-2">
                      {activeProblem.constraints.map((c, i) => (
                        <li key={i} className="flex items-center gap-3 text-[10px] text-slate-400 font-mono"><i className="fa-solid fa-code text-indigo-500 text-[7px]"></i>{c}</li>
                      ))}
                   </ul>
                </div>
             </div>
           ) : (
             <div className="flex flex-col items-center justify-center h-full text-center space-y-6 opacity-60">
                <i className="fa-solid fa-mug-hot text-3xl text-indigo-400"></i>
                <h3 className="text-xl font-black text-white">Logic Sandbox</h3>
                <p className="text-slate-400 text-xs leading-relaxed max-w-xs italic">Experiment freely friend! I'm here to analyze your sketches.</p>
             </div>
           )}
        </div>
      </div>

      {/* HORIZONTAL DIVIDER */}
      <div onPointerDown={() => setIsResizingH(true)} className={`w-1.5 shrink-0 bg-white/5 hover:bg-indigo-500/50 cursor-col-resize transition-all relative z-40 ${isResizingH ? 'bg-indigo-500' : ''}`}>
        <div className="absolute inset-y-0 -left-2 -right-2"></div>
      </div>

      {/* RIGHT PANEL: Editor & Console */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#0F172A]">
        <div className="h-14 border-b border-white/10 bg-[#111827] flex items-center justify-between px-6 shrink-0 z-30">
           <div className="flex items-center gap-4">
              <select 
                value={lang} 
                onChange={(e) => setLang(e.target.value)} 
                className="bg-slate-800 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border border-white/10 outline-none hover:bg-slate-700 transition-all cursor-pointer"
              >
                  <option value="javascript">JS</option>
                  <option value="python">Python</option>
                  <option value="cpp">C++</option>
                  <option value="java">Java</option>
              </select>
              <div className="w-[1px] h-5 bg-white/10"></div>
              <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">{activeProblem ? 'Assessment' : 'Sandbox'}</span>
           </div>
           <div className="flex gap-3">
              <button onClick={handleRun} disabled={isProcessing} className="px-5 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-[9px] font-black uppercase tracking-widest rounded-lg border border-white/5 active:scale-95 transition-all">Run</button>
              <button onClick={handleSubmit} disabled={isProcessing} className="px-5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-[9px] font-black uppercase tracking-widest rounded-lg shadow-xl active:scale-95 transition-all">Submit ✨</button>
           </div>
        </div>

        <div className="flex-1 min-h-0 relative bg-[#0F172A]">
           <Editor
             key={`${id}-${lang}`} // Force re-mount on problem OR language change for a fresh session
             height="100%"
             theme="vs-dark"
             language={lang === 'cpp' ? 'cpp' : lang === 'java' ? 'java' : lang}
             value={currentCode}
             onChange={handleCodeChange}
             options={{
               fontSize: 14,
               fontFamily: "'JetBrains Mono', monospace",
               minimap: { enabled: false },
               wordWrap: "on",
               lineNumbers: "on",
               scrollBeyondLastLine: false,
               automaticLayout: true,
               padding: { top: 15 },
               cursorStyle: 'line',
               formatOnPaste: true,
               formatOnType: true
             }}
           />
        </div>

        <div onPointerDown={() => setIsResizingV(true)} className={`h-1.5 shrink-0 bg-white/5 hover:bg-indigo-500/50 cursor-row-resize transition-all relative z-40 ${isResizingV ? 'bg-indigo-500' : ''}`}>
          <div className="absolute inset-x-0 -top-2 -bottom-2"></div>
        </div>

        <div style={{ height: `${bottomHeight}px` }} className="bg-[#111827] flex flex-col shrink-0 overflow-hidden z-20">
           <div className="flex bg-[#0F172A] shrink-0 border-b border-white/5">
              <button onClick={() => setBottomTab('console')} className={`px-8 py-3 text-[9px] font-black uppercase tracking-widest border-b-2 transition-all ${bottomTab === 'console' ? 'border-indigo-400 text-white bg-white/5' : 'border-transparent text-slate-500 hover:text-slate-300'}`}>Output</button>
              <button onClick={() => setBottomTab('sakhi')} className={`px-8 py-3 text-[9px] font-black uppercase tracking-widest border-b-2 transition-all ${bottomTab === 'sakhi' ? 'border-indigo-400 text-white bg-white/5' : 'border-transparent text-slate-500 hover:text-slate-300'}`}>Sakhi Analysis ✨</button>
           </div>
           
           <div className="flex-1 p-6 overflow-y-auto hide-scrollbar">
              {isProcessing ? (
                 <div className="h-full flex flex-col items-center justify-center gap-4 animate-in">
                    <div className="w-8 h-8 border-4 border-indigo-500/10 border-t-indigo-500 rounded-full animate-spin"></div>
                    <p className="text-[8px] font-black uppercase tracking-widest text-slate-500">Synchronizing Logic...</p>
                 </div>
              ) : bottomTab === 'console' ? (
                <div className="space-y-3">
                  {testResults.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full py-10 text-slate-600 opacity-30">
                       <i className="fa-solid fa-terminal text-2xl mb-2"></i>
                       <p className="text-[9px] font-black uppercase">Console Idle</p>
                    </div>
                  ) : (
                    testResults.map((tr, idx) => (
                      <div key={idx} className={`p-4 rounded-xl border flex items-center justify-between text-[11px] font-mono ${tr.status === 'passed' ? 'bg-emerald-500/5 border-emerald-500/10' : 'bg-rose-500/5 border-rose-500/10'}`}>
                        <div className="flex items-center gap-3">
                           <span className={tr.status === 'passed' ? 'text-emerald-500' : 'text-rose-500'}><i className={tr.status === 'passed' ? "fa-solid fa-check" : "fa-solid fa-xmark"}></i></span>
                           <span className="text-slate-500">Case {idx + 1}:</span>
                           <span className="text-indigo-300">{tr.input}</span>
                        </div>
                        <span className={tr.status === 'passed' ? 'text-emerald-400' : 'text-rose-400'}>{tr.actual}</span>
                      </div>
                    ))
                  )}
                </div>
              ) : (
                 <div className="space-y-6">
                    {!analysis ? (
                       <div className="flex flex-col items-center justify-center h-full py-10 text-slate-600 opacity-30">
                          <i className="fa-solid fa-wand-magic-sparkles text-2xl mb-2"></i>
                          <p className="text-[9px] font-black uppercase">Awaiting Submission</p>
                       </div>
                    ) : (
                       <div className="space-y-6 animate-in">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                           {[
                             { label: 'Complexity', val: analysis.complexity.time, col: 'indigo' },
                             { label: 'Clarity', val: `${analysis.quality.readability}%`, col: 'emerald' },
                             { label: 'Hiring Bar', val: `${analysis.quality.companyReadiness}%`, col: 'amber' },
                             { label: 'Logic', val: `${analysis.quality.correctness}%`, col: 'rose' },
                           ].map(m => (
                             <div key={m.label} className="bg-white/5 p-4 rounded-xl border border-white/5">
                                <p className="text-[7px] font-black text-slate-500 uppercase mb-1">{m.label}</p>
                                <p className={`text-sm font-black text-${m.col}-400`}>{m.val}</p>
                             </div>
                           ))}
                        </div>
                        <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                           <p className="text-xs text-slate-200 font-medium italic leading-relaxed">"{analysis.quality.feedback}"</p>
                        </div>
                        <div className="space-y-2">
                           <h4 className="text-[8px] font-black uppercase text-slate-500 pl-2">Ideal Pattern</h4>
                           <div className="bg-black/40 p-5 rounded-2xl border border-white/5">
                              <pre className="text-[11px] font-mono text-indigo-300/80 whitespace-pre-wrap">{analysis.idealSolution}</pre>
                           </div>
                        </div>
                       </div>
                    )}
                 </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default Compiler;

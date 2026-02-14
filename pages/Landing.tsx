
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const IllustrationNode = ({ icon, color, delay, pos }: { icon: string, color: string, delay: string, pos: string }) => (
  <div 
    className={`absolute ${pos} w-20 h-20 rounded-2xl bg-${color}-100 text-${color}-600 flex items-center justify-center text-3xl sticker-card border-2 shadow-[6px_6px_0px_#0f172a] animate-bounce hover:scale-125 transition-transform z-20`}
    style={{ animationDuration: '4s', animationDelay: delay }}
  >
    <i className={`fa-solid ${icon}`}></i>
  </div>
);

const Landing: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress((winScroll / height) * 100);

      const reveals = document.querySelectorAll('.reveal');
      reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const revealTop = reveal.getBoundingClientRect().top;
        const revealPoint = 150;
        if (revealTop < windowHeight - revealPoint) {
          reveal.classList.add('active');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen selection:bg-indigo-100 selection:text-indigo-600">
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }}></div>

      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 lg:px-20 flex items-center justify-between ${scrolled ? 'h-20 bg-white/80 backdrop-blur-2xl border-b-4 border-slate-900 shadow-xl' : 'h-28 bg-transparent'}`}>
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-white text-xl font-black shadow-[4px_4px_0px_#6366f1] hover:rotate-12 transition-transform">CS</div>
          <span className="text-2xl font-black tracking-tighter text-slate-900 italic">Code<span className="text-indigo-600">Sakhi</span></span>
        </div>
        
        <div className="hidden lg:flex items-center gap-10">
          {[
            { name: 'Contrast', id: 'comparison' },
            { name: 'Blueprint', id: 'blueprint' },
            { name: 'Features', id: 'decoder' },
            { name: 'Community', id: 'stories' }
          ].map(item => (
            <button 
              key={item.id} 
              onClick={() => scrollToSection(item.id)}
              className="text-[10px] font-black text-slate-600 hover:text-indigo-600 transition-all uppercase tracking-[0.3em] outline-none"
            >
              {item.name}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <Link to="/auth" className="hidden sm:block text-[10px] font-black text-slate-900 uppercase tracking-widest px-4 hover:text-indigo-600 transition-colors">Login</Link>
          <Link to="/auth" className="btn-vibrant px-8 py-4 text-[10px] tracking-[0.2em] uppercase border-2 border-slate-900 shadow-[4px_4px_0px_#0f172a]">Get Started ✨</Link>
        </div>
      </nav>

      <section className="relative pt-48 pb-16 lg:pt-64 lg:pb-32 overflow-hidden">
        <IllustrationNode icon="fa-code" color="indigo" delay="0s" pos="top-32 left-[12%]" />
        <IllustrationNode icon="fa-bug" color="rose" delay="0.5s" pos="bottom-48 left-[8%]" />
        <IllustrationNode icon="fa-flask" color="amber" delay="1s" pos="top-40 right-[12%]" />
        <IllustrationNode icon="fa-heart" color="emerald" delay="1.5s" pos="bottom-64 right-[8%]" />
        
        <div className="max-w-[90rem] mx-auto px-6 lg:px-20 text-center space-y-12 reveal active">
          <div className="inline-flex items-center gap-4 px-6 py-3 bg-white border-2 border-slate-900 rounded-full text-slate-900 text-[11px] font-black uppercase tracking-[0.3em] shadow-[4px_4px_0px_#d9f99d] animate-bounce">
            <span className="w-3 h-3 bg-indigo-500 rounded-full"></span>
            India's #1 Learning Partner 🇮🇳
          </div>
          
          <h1 className="text-7xl lg:text-[10rem] font-black text-slate-900 leading-[0.8] tracking-tighter">
            Logic <span className="italic text-indigo-600">Simplified,</span><br />
            Career <span className="text-transparent bg-clip-text hero-gradient">Amplified.</span>
          </h1>
          
          <p className="text-xl lg:text-3xl text-slate-500 font-medium max-w-4xl mx-auto leading-relaxed">
            Stop memorizing. Start imagining. CodeSakhi translates scary syntax into <span className="underline decoration-indigo-400 decoration-8 underline-offset-8">vivid stories</span> that stick forever.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-8 justify-center pt-8 reveal active stagger-2">
            <Link to="/auth" className="px-16 py-8 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-[0.3em] hover:bg-indigo-600 transition-all shadow-[8px_8px_0px_#d9f99d] active:translate-x-1 active:translate-y-1 active:shadow-none">
              Start Your Protocol
            </Link>
            <button onClick={() => scrollToSection('comparison')} className="px-10 py-8 text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-all">
              Watch the Magic <i className="fa-solid fa-play ml-3"></i>
            </button>
          </div>
        </div>
      </section>

      <div className="ticker-wrap mb-32">
        <div className="ticker">
          {[
            "Arrays are like train coaches...",
            "Recursion is a Matryoshka doll...",
            "Variables are Tiffin Boxes...",
            "APIs are Waiters at a Dhaba...",
            "Databases are Library Shelves...",
            "Algorithms are Recipes from Nani...",
            "Inheritance is Family Legacy...",
            "Binary Search is looking for a word in a Dictionary..."
          ].map((text, i) => (
            <span key={i} className="text-white font-black text-xs uppercase tracking-[0.4em] mx-12">
              <i className="fa-solid fa-sparkles text-lime-300 mr-4"></i> {text}
            </span>
          ))}
          {[
            "Arrays are like train coaches...",
            "Recursion is a Matryoshka doll...",
            "Variables are Tiffin Boxes...",
            "APIs are Waiters at a Dhaba..."
          ].map((text, i) => (
            <span key={i + 10} className="text-white font-black text-xs uppercase tracking-[0.4em] mx-12">
              <i className="fa-solid fa-sparkles text-lime-300 mr-4"></i> {text}
            </span>
          ))}
        </div>
      </div>

      <section id="comparison" className="py-40 bg-slate-900 text-white overflow-hidden scroll-mt-20">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-20 space-y-24 reveal">
          <div className="text-center space-y-6">
            <h2 className="text-5xl lg:text-7xl font-black tracking-tighter">Why CodeSakhi?</h2>
            <p className="text-xl text-slate-400 italic">"Tutorials make you yawn. Sakhi makes you code, yaar."</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="sticker-card p-12 bg-white/5 border-white/10 shadow-[8px_8px_0px_#1e293b] grayscale opacity-40 hover:opacity-100 transition-opacity reveal stagger-1">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center"><i className="fa-solid fa-cloud-moon"></i></div>
                <h3 className="text-xl font-black uppercase tracking-widest">Boring Tutorials</h3>
              </div>
              <div className="space-y-6">
                <div className="p-6 bg-black/20 rounded-2xl border border-white/5 font-mono text-sm text-slate-400">
                  "A Linked List is a linear data structure where elements are not stored in contiguous locations..."
                </div>
                <p className="text-sm font-bold text-slate-500 italic">"I'm literally sleeping... 😴"</p>
              </div>
            </div>

            <div className="sticker-card p-12 bg-indigo-600 border-indigo-400 shadow-[8px_8px_0px_#d9f99d] reveal stagger-2">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-white text-indigo-600 rounded-xl flex items-center justify-center text-xl shadow-lg"><i className="fa-solid fa-wand-sparkles"></i></div>
                <h3 className="text-xl font-black uppercase tracking-widest">CodeSakhi Way</h3>
              </div>
              <div className="space-y-6">
                <div className="p-6 bg-white rounded-2xl border-4 border-slate-900 font-bold text-slate-900 text-lg leading-relaxed shadow-xl">
                  "Linked Lists are like a Treasure Hunt! Each clue tells you exactly where to find the next one in the house."
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                     <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Priya" alt="Happy student" />
                  </div>
                  <p className="text-sm font-black text-lime-300 italic">"I can visualize the entire list now! 🤩"</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Sakhi Method: Redesigned Logic Blueprint */}
      <section id="blueprint" className="py-40 bg-white overflow-hidden scroll-mt-20 reveal">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-20">
          <div className="flex flex-col lg:flex-row items-center gap-32">
             <div className="flex-1 space-y-12">
                <div className="space-y-6">
                  <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.6em]">The Sakhi Method</span>
                  <h2 className="text-7xl font-black text-slate-900 tracking-tighter leading-none">The Logic <br /><span className="text-indigo-600 italic">Blueprint.</span></h2>
                </div>
                <p className="text-2xl text-slate-500 font-medium leading-relaxed italic border-l-8 border-indigo-100 pl-10">
                  "We map coding to your life experiences, friend. It's not learning new things; it's recognizing what you already know in a different language."
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="sticker-card p-8 bg-slate-50 border-slate-200 group hover:bg-white transition-all">
                      <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center text-xl mb-4 group-hover:rotate-6 transition-transform"><i className="fa-solid fa-dna"></i></div>
                      <h4 className="font-black text-slate-900 uppercase text-xs tracking-widest mb-2">Synaptic Storytelling</h4>
                      <p className="text-[11px] text-slate-500 font-bold leading-relaxed">We bridge binary and real life. (e.g., Queues = Ration Lines, Recursion = Post-office routing)</p>
                   </div>
                   <div className="sticker-card p-8 bg-indigo-50 border-indigo-100 group hover:bg-white transition-all">
                      <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-xl mb-4 group-hover:-rotate-6 transition-transform"><i className="fa-solid fa-bento-box"></i></div>
                      <h4 className="font-black text-slate-900 uppercase text-xs tracking-widest mb-2">Tiffin-Sized Nuggets</h4>
                      <p className="text-[11px] text-slate-500 font-bold leading-relaxed">Digestible chunks of wisdom that keep your brain fueled without the crash, yaar.</p>
                   </div>
                </div>
             </div>
             
             <div className="flex-1 relative">
                <div className="absolute inset-0 bg-indigo-100/50 rounded-[4rem] blur-3xl -z-10 animate-pulse"></div>
                <div className="sticker-card p-2 bg-slate-900 border-none shadow-3xl rotate-2 relative overflow-hidden">
                   <div className="bg-[#111827] rounded-[3rem] p-10 lg:p-14 text-white space-y-12 border border-white/10 relative">
                      <div className="flex items-center justify-between">
                         <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                         </div>
                         <div className="flex items-center gap-2 bg-white/5 px-4 py-1.5 rounded-full border border-white/10">
                            <i className="fa-solid fa-mug-hot text-[10px] text-indigo-400 animate-bounce"></i>
                            <span className="text-[9px] font-black uppercase tracking-widest text-indigo-200">Chai Break Mode</span>
                         </div>
                      </div>

                      <div className="space-y-12">
                         <div className="flex items-center justify-between gap-6">
                            <div className="sticker-card bg-indigo-500/10 border-indigo-500/30 p-4 text-center flex-1 reveal stagger-1">
                               <p className="text-[9px] font-black uppercase text-indigo-300 mb-2">Boring Syntax</p>
                               <code className="text-[10px] font-mono text-slate-400 italic">while(i < n)...</code>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border border-white/10 z-10 shadow-lg">
                               <i className="fa-solid fa-plus text-[10px] text-indigo-400"></i>
                            </div>
                            <div className="sticker-card bg-emerald-500/10 border-emerald-500/30 p-4 text-center flex-1 reveal stagger-2">
                               <p className="text-[9px] font-black uppercase text-emerald-300 mb-2">Life Context</p>
                               <span className="text-[10px] font-bold text-slate-400 italic">Chai in a Kettle</span>
                            </div>
                         </div>

                         <div className="flex flex-col items-center gap-4 reveal stagger-2">
                            <div className="h-12 w-[2px] bg-gradient-to-b from-slate-700 to-indigo-500"></div>
                            <div className="w-16 h-16 rounded-3xl bg-indigo-600 flex items-center justify-center text-white text-2xl shadow-[0_0_40px_rgba(99,102,241,0.5)] border-4 border-indigo-400/50 animate-pulse">
                               <i className="fa-solid fa-bolt"></i>
                            </div>
                         </div>

                         <div className="sticker-card bg-gradient-to-r from-indigo-900 to-slate-900 border-indigo-500/50 p-8 text-center reveal stagger-3 shadow-2xl">
                            <h5 className="text-xl font-black text-white tracking-tight mb-2">Golden Logic Node</h5>
                            <p className="text-[11px] font-medium text-indigo-200 italic">"I finally understand why it stops before the end, yaar!"</p>
                            <div className="flex gap-1 justify-center mt-4">
                               {[1,2,3,4,5].map(i => <div key={i} className="h-1 w-4 bg-lime-300 rounded-full"></div>)}
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      <section id="journey" className="py-40 bg-slate-50 overflow-hidden scroll-mt-20 reveal">
        <div className="max-w-4xl mx-auto px-6 relative">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-slate-200 hidden lg:block"></div>
          
          <div className="text-center space-y-6 mb-32">
            <h2 className="text-6xl font-black tracking-tighter">Your Logic Journey</h2>
            <p className="text-slate-400 font-bold uppercase tracking-widest">From Zero to Engineer in 4 Nodes</p>
          </div>

          <div className="space-y-32">
            {[
              { title: "Node 01: The Analogy", icon: "fa-brain", side: "left", color: "indigo", desc: "We replace scary theory with stories about tiffin boxes and traffic jams." },
              { title: "Node 02: Visual Debugging", icon: "fa-shield-virus", side: "right", color: "rose", desc: "Identify logical 'traps' using our visual shield before they break your code." },
              { title: "Node 03: Alchemist Shift", icon: "fa-flask", side: "left", color: "amber", desc: "Transmute your notes into atomic chunks for 2x faster recall during interviews." },
              { title: "Node 04: The Offer", icon: "fa-medal", side: "right", color: "emerald", desc: "Apply your logic to company-specific tracks and land that dream CTC." }
            ].map((step, i) => (
              <div key={i} className={`flex flex-col lg:flex-row items-center gap-12 reveal ${step.side === 'right' ? 'lg:flex-row-reverse' : ''}`}>
                <div className="flex-1 space-y-4 text-center lg:text-left">
                  <h3 className="text-3xl font-black text-slate-900">{step.title}</h3>
                  <p className="text-lg text-slate-500 font-medium leading-relaxed">{step.desc}</p>
                </div>
                <div className="relative z-10 w-24 h-24 rounded-3xl bg-white border-4 border-slate-900 flex items-center justify-center text-3xl shadow-[8px_8px_0px_#0f172a] hover:rotate-12 transition-all cursor-crosshair">
                  <i className={`fa-solid ${step.icon} text-${step.color}-600`}></i>
                </div>
                <div className="flex-1 hidden lg:block"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="decoder" className="py-40 bg-white scroll-mt-20 reveal">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-20 space-y-24">
          <div className="flex flex-col lg:flex-row items-end justify-between gap-8">
            <div className="space-y-4">
              <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.5em]">The Toolkit</span>
              <h2 className="text-6xl font-black tracking-tighter">Engineered for You.</h2>
            </div>
            <Link to="/auth" className="text-sm font-black text-slate-900 uppercase tracking-widest border-b-4 border-lime-300 pb-2 hover:text-indigo-600 transition-all">Explore All Tools <i className="fa-solid fa-arrow-right ml-2"></i></Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { title: "Logic Decoder", icon: "fa-brain", color: "indigo", desc: "Line-by-line story breakdown of any code snippet. No more 'huh?' moments." },
              { title: "Bug Shield", icon: "fa-shield-virus", color: "rose", desc: "Find logical traps and memory leaks using our smart visual scanner." },
              { title: "Notes Alchemist", icon: "fa-flask", color: "amber", desc: "Turn messy scribbles into structured flashcards and nuggets instantly." },
              { title: "Placement Arena", icon: "fa-building", color: "emerald", desc: "Company-specific tracks for Google, Amazon, Zomato, and more." },
              { title: "Mock Sprints", icon: "fa-stopwatch", color: "purple", desc: "90-minute pressure simulations to build real interview stamina." },
              { title: "Chai Community", icon: "fa-mug-hot", color: "orange", desc: "A safe space to discuss doubts and share career wins with fellow sakhis." }
            ].map((f, i) => (
              <div key={i} className="sticker-card p-12 bg-white group cursor-pointer reveal" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className={`w-16 h-16 rounded-2xl bg-${f.color}-100 text-${f.color}-600 flex items-center justify-center text-3xl mb-8 border-2 border-slate-900 shadow-[4px_4px_0px_#0f172a] group-hover:scale-110 group-hover:rotate-6 transition-all`}>
                  <i className={`fa-solid ${f.icon}`}></i>
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">{f.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed italic border-l-4 border-slate-100 pl-6">"{f.desc}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="stories" className="py-40 bg-slate-50 relative overflow-hidden scroll-mt-20 reveal">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-20 relative z-10 flex flex-col lg:flex-row items-center gap-24">
          <div className="flex-1 space-y-10">
            <h2 className="text-7xl font-black text-slate-900 tracking-tighter leading-none">The Digital <br /><span className="text-indigo-600">Chai Stall.</span></h2>
            <p className="text-2xl text-slate-500 font-medium leading-relaxed italic border-l-8 border-indigo-100 pl-10">
              "We're more than an app. We're a family of builders helping each other crack the biggest gates in tech, yaar."
            </p>
            <div className="flex gap-4">
              <Link to="/auth" className="px-12 py-6 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-[8px_8px_0px_#d9f99d] hover:scale-105 transition-transform">Join the Sisterhood</Link>
            </div>
          </div>
          
          <div className="flex-1 grid grid-cols-2 gap-6 p-4">
             <div className="sticker-card p-8 rotate-[-3deg] bg-amber-100 border-slate-900 reveal stagger-1">
               <p className="text-sm font-black text-slate-900">"Sakhi explained BFS as 'Spreading a viral rumor in college'. Never forgot it since!"</p>
               <span className="text-[10px] font-black uppercase text-amber-600 mt-4 block">- Ananya, IIT Madras</span>
             </div>
             <div className="sticker-card p-8 rotate-[2deg] translate-y-12 bg-indigo-100 border-slate-900 reveal stagger-2">
               <p className="text-sm font-black text-slate-900">"Finally cracked Google! The Logic Decoder was my secret weapon in Round 3."</p>
               <span className="text-[10px] font-black uppercase text-indigo-600 mt-4 block">- Rahul, DTU</span>
             </div>
             <div className="sticker-card p-8 rotate-[1deg] bg-rose-100 border-slate-900 reveal stagger-3">
               <p className="text-sm font-black text-slate-900">"Bug Shield is like a guardian angel for my logic. No more syntax nightmares!"</p>
               <span className="text-[10px] font-black uppercase text-rose-600 mt-4 block">- Priya, VIT</span>
             </div>
             <div className="sticker-card p-8 rotate-[-2deg] translate-y-8 bg-emerald-100 border-slate-900 reveal stagger-1">
               <p className="text-sm font-black text-slate-900">"The analogic learning style is a game changer. Why wasn't this in college?"</p>
               <span className="text-[10px] font-black uppercase text-emerald-600 mt-4 block">- Vikram, SRM</span>
             </div>
          </div>
        </div>
      </section>

      {/* Sync Your Potential: Illustrative Final CTA */}
      <section className="py-64 bg-[#0F172A] relative overflow-hidden group">
        {/* Animated Illustrative Elements (Stickers) */}
        <div className="absolute top-20 left-[15%] sticker-card px-8 py-4 bg-white border-2 border-slate-900 rounded-2xl -rotate-12 animate-pulse hidden lg:flex items-center gap-3">
           <i className="fa-solid fa-file-contract text-indigo-600"></i>
           <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Offer @ Google 📄</span>
        </div>
        <div className="absolute top-40 right-[15%] sticker-card px-8 py-4 bg-lime-300 border-2 border-slate-900 rounded-2xl rotate-12 animate-bounce hidden lg:flex items-center gap-3">
           <i className="fa-solid fa-trophy text-slate-900"></i>
           <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Logic Master 🏆</span>
        </div>
        <div className="absolute bottom-40 left-[10%] sticker-card w-20 h-20 bg-rose-100 border-2 border-slate-900 rounded-full flex items-center justify-center text-3xl -rotate-6 animate-float hidden lg:flex">
           <i className="fa-solid fa-heart-pulse text-rose-500"></i>
        </div>
        <div className="absolute bottom-32 right-[20%] sticker-card px-8 py-4 bg-indigo-100 border-2 border-slate-900 rounded-2xl -rotate-6 animate-pulse hidden lg:flex items-center gap-3">
           <i className="fa-solid fa-graduation-cap text-indigo-600"></i>
           <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Campus Hero ✨</span>
        </div>

        <div className="absolute inset-0 blob bg-indigo-600 opacity-10 scale-150 blur-3xl group-hover:scale-[1.7] transition-transform duration-1000"></div>
        
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center space-y-16 reveal">
          <div className="space-y-8">
            <h2 className="text-7xl lg:text-[10rem] font-black text-white leading-none tracking-tighter">
              Sync Your <br />
              <span className="text-transparent bg-clip-text hero-gradient italic">Potential.</span>
            </h2>
            <p className="text-2xl lg:text-3xl text-indigo-100 font-medium italic max-w-2xl mx-auto leading-relaxed border-t border-white/5 pt-12">
              "Your engineering career isn't about the <span className="text-white font-black underline decoration-lime-300 decoration-8 underline-offset-8">code you write</span>, but the <span className="text-white font-black">logic you build</span>. Let's build it together, yaar."
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 pt-8">
            <Link 
              to="/auth" 
              className="px-20 py-10 bg-white text-slate-900 rounded-[2.5rem] font-black text-sm uppercase tracking-[0.4em] shadow-[12px_12px_0px_#6366f1] hover:scale-110 active:shadow-none active:translate-x-1 active:translate-y-1 transition-all flex items-center gap-4 group/btn"
            >
              Launch Your Protocol 🚀
              <i className="fa-solid fa-sparkles text-amber-500 group-hover/btn:rotate-45 transition-transform"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Redesigned Interesting and Attractive Footer: The Digital Chai Stall */}
      <footer className="bg-white border-t-[12px] border-slate-900 pt-32 pb-16 overflow-hidden relative">
         <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-indigo-50/50 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
         
         <div className="max-w-[90rem] mx-auto px-6 lg:px-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 lg:gap-32 mb-32">
               {/* Brand & Community Status */}
               <div className="lg:col-span-5 space-y-12">
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 bg-slate-900 rounded-3xl flex items-center justify-center text-white text-3xl font-black shadow-[8px_8px_0px_#6366f1] hover:rotate-12 transition-transform">CS</div>
                    <span className="text-5xl font-black tracking-tighter text-slate-900 italic">CodeSakhi <span className="text-indigo-600">AI</span></span>
                  </div>
                  <p className="text-2xl text-slate-500 font-medium leading-relaxed italic max-w-lg border-l-8 border-indigo-100 pl-8">
                    "Building India's brightest engineers through the power of relatable stories and simple logic, yaar."
                  </p>
                  <div className="flex items-center gap-6 bg-emerald-50 border-2 border-emerald-100 rounded-[2.5rem] p-8 w-fit shadow-lg transform hover:-rotate-1 transition-transform">
                     <div className="relative">
                        <div className="w-4 h-4 bg-emerald-500 rounded-full animate-ping absolute inset-0"></div>
                        <div className="w-4 h-4 bg-emerald-500 rounded-full relative"></div>
                     </div>
                     <div className="space-y-1">
                        <span className="text-[12px] font-black uppercase tracking-[0.3em] text-emerald-700 block">Digital Chai Stall Live</span>
                        <span className="text-xs font-bold text-slate-500">1,452 Sakhis Online Now</span>
                     </div>
                  </div>
               </div>

               {/* Navigation Nodes */}
               <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12 lg:gap-24">
                  <div className="space-y-10">
                     <h4 className="text-[12px] font-black text-slate-900 uppercase tracking-[0.4em] border-b-4 border-indigo-100 pb-4 w-fit">The Lab</h4>
                     <ul className="space-y-8">
                        {['Logic Decoder', 'Bug Shield', 'Notes Alchemist', 'Arena'].map(link => (
                          <li key={link}><Link to="/auth" className="text-sm font-black text-slate-400 hover:text-indigo-600 transition-colors uppercase tracking-widest">{link}</Link></li>
                        ))}
                     </ul>
                  </div>
                  <div className="space-y-10">
                     <h4 className="text-[12px] font-black text-slate-900 uppercase tracking-[0.4em] border-b-4 border-rose-100 pb-4 w-fit">The Library</h4>
                     <ul className="space-y-8">
                        {['DSA Core', 'System Design', 'ML Foundations', 'AI Native'].map(link => (
                          <li key={link}><Link to="/auth" className="text-sm font-black text-slate-400 hover:text-indigo-600 transition-colors uppercase tracking-widest">{link}</Link></li>
                        ))}
                     </ul>
                  </div>
                  <div className="space-y-10">
                     <h4 className="text-[12px] font-black text-slate-900 uppercase tracking-[0.4em] border-b-4 border-emerald-100 pb-4 w-fit">Community</h4>
                     <ul className="space-y-8">
                        {['Success Stories', 'Campus Connect', 'Mentor Sync', 'Support'].map(link => (
                          <li key={link}><Link to="/auth" className="text-sm font-black text-slate-400 hover:text-indigo-600 transition-colors uppercase tracking-widest">{link}</Link></li>
                        ))}
                     </ul>
                  </div>
               </div>
            </div>

            {/* Social Sync & Credits */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-12 pt-20 border-t-8 border-slate-900">
               <div className="flex flex-wrap justify-center gap-6">
                  {[
                    { name: 'Twitter', icon: 'fa-twitter', color: 'bg-sky-50 text-sky-600' },
                    { name: 'GitHub', icon: 'fa-github', color: 'bg-slate-50 text-slate-900' },
                    { name: 'LinkedIn', icon: 'fa-linkedin-in', color: 'bg-blue-50 text-blue-700' },
                    { name: 'Instagram', icon: 'fa-instagram', color: 'bg-rose-50 text-rose-600' }
                  ].map((social) => (
                    <div key={social.name} className={`sticker-card px-10 py-5 ${social.color} border-2 border-slate-900 flex items-center gap-4 hover:scale-110 hover:-rotate-3 transition-all cursor-pointer shadow-none hover:shadow-[6px_6px_0px_#0f172a]`}>
                       <i className={`fa-brands ${social.icon} text-xl`}></i>
                       <span className="text-[11px] font-black uppercase tracking-widest">{social.name}</span>
                    </div>
                  ))}
               </div>
               
               <div className="text-center md:text-right space-y-4">
                  <p className="text-[11px] font-black text-slate-900 uppercase tracking-[0.5em]">Built for the builders by the Sakhis 🇮🇳</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">© 2025 CodeSakhi AI Hub • All Logic Synced</p>
                  <div className="flex gap-2 justify-center md:justify-end">
                     {[1,2,3,4,5].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-100"></div>)}
                  </div>
               </div>
            </div>
         </div>
      </footer>
    </div>
  );
};

export default Landing;

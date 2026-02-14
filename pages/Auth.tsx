
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useUser();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(name || "Friend");
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col lg:flex-row">
      {/* Visual Side */}
      <div className="hidden lg:flex lg:w-1/2 hero-gradient p-20 flex-col justify-between text-white relative overflow-hidden">
         <div className="absolute top-[-10%] right-[-10%] w-[40rem] h-[40rem] bg-white/10 rounded-full blur-[120px]"></div>
         <div className="absolute bottom-[-10%] left-[-10%] w-[30rem] h-[30rem] bg-lime-300/10 rounded-full blur-[100px]"></div>
         
         <Link to="/landing" className="flex items-center gap-3 relative z-10 group">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-indigo-600 text-xl font-black shadow-2xl">CS</div>
            <span className="text-3xl font-black tracking-tighter italic">CodeSakhi</span>
         </Link>

         <div className="relative z-10 space-y-8">
            <h2 className="text-6xl font-black leading-[1.1] tracking-tighter">Your Logic <br />Journey Starts <br />Right Here, Yaar.</h2>
            <p className="text-xl text-indigo-100 font-medium max-w-lg leading-relaxed italic">
               "Mastering engineering concepts isn't about memorizing syntax, it's about building a mental library of simple stories with a friend."
            </p>
         </div>

         <div className="relative z-10 flex items-center gap-6">
            <div className="flex -space-x-4">
              {[1,2,3,4].map(i => (
                <img key={i} src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i*99}`} className="w-12 h-12 rounded-full border-4 border-indigo-600 bg-white" alt="" />
              ))}
            </div>
            <span className="text-sm font-black uppercase tracking-widest text-indigo-200">Joined by 12k+ sakhis</span>
         </div>
      </div>

      {/* Form Side */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-20 relative bg-white">
        <Link to="/landing" className="lg:hidden absolute top-10 left-10 flex items-center gap-3 text-slate-500 font-black">
          <i className="fa-solid fa-arrow-left"></i> Home
        </Link>
        
        <div className="w-full max-w-md space-y-12 animate-in">
          <div className="space-y-4">
            <h1 className="text-5xl font-black text-slate-900 tracking-tighter">
              {isLogin ? "Welcome Back!" : "Start Learning"}
            </h1>
            <p className="text-slate-500 font-bold text-lg">
              {isLogin ? "Your logic companion is waiting for you, friend." : "Ready to master engineering concepts, yaar?"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Display Name</label>
              <input 
                type="text" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Coding Guru" 
                className="w-full bg-slate-50 border border-slate-100 rounded-3xl p-6 outline-none focus:border-indigo-400 focus:bg-white transition-all text-slate-700 font-bold"
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Email Stream</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="yaar@university.edu" 
                className="w-full bg-slate-50 border border-slate-100 rounded-3xl p-6 outline-none focus:border-indigo-400 focus:bg-white transition-all text-slate-700 font-bold"
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Secure Protocol</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full bg-slate-50 border border-slate-100 rounded-3xl p-6 outline-none focus:border-indigo-400 focus:bg-white transition-all text-slate-700 font-bold"
              />
            </div>

            <button type="submit" className="w-full py-6 hero-gradient text-white font-black rounded-3xl shadow-2xl shadow-indigo-100 hover:scale-[1.02] transition-all active:scale-[0.98] uppercase tracking-[0.2em] text-sm mt-6">
              {isLogin ? "Initialize Sync" : "Start Protocol"}
            </button>
          </form>

          <div className="pt-8 border-t border-slate-50 text-center">
            <p className="text-slate-500 font-bold text-sm">
              {isLogin ? "New to CodeSakhi?" : "Already a member?"}{" "}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="text-indigo-600 hover:text-indigo-700 font-black underline underline-offset-4"
              >
                {isLogin ? "Register Now" : "Login Protocol"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;

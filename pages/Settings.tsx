
import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { Difficulty } from '../types';

const Settings: React.FC = () => {
  const { preferences, updatePreferences } = useUser();
  const [localPrefs, setLocalPrefs] = useState(preferences);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  const handleSave = () => {
    updatePreferences(localPrefs);
    setSaveStatus('Preferences saved successfully!');
    setTimeout(() => setSaveStatus(null), 3000);
  };

  return (
    <div className="animate-in max-w-4xl mx-auto space-y-12 pb-24">
      <div className="space-y-2">
        <h1 className="text-3xl font-black text-slate-800 tracking-tight">Settings ⚙️</h1>
        <p className="text-slate-500 font-medium italic">Customize your CodeSakhi experience, friend.</p>
      </div>

      <div className="space-y-8">
        <div className="sakhi-card p-10 bg-white border-none shadow-xl space-y-10">
          <h3 className="text-xl font-black text-slate-800 flex items-center gap-3">
             <i className="fa-solid fa-user-gear text-indigo-600"></i> Profile Calibration
          </h3>
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="relative group">
              <div className="w-32 h-32 rounded-3xl overflow-hidden border-4 border-slate-50 shadow-inner bg-slate-100 flex items-center justify-center">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${localPrefs.userName}`} alt="Profile" />
              </div>
              <button className="absolute -bottom-4 -right-4 w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-xl border-4 border-white hover:bg-indigo-700 transition-all">
                <i className="fa-solid fa-camera"></i>
              </button>
            </div>
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Sync Name</label>
                <input 
                  type="text" 
                  value={localPrefs.userName}
                  onChange={(e) => setLocalPrefs(prev => ({ ...prev, userName: e.target.value }))}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-slate-700 font-bold outline-none focus:border-indigo-400 transition-colors" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Email Node</label>
                <input type="email" disabled className="w-full bg-slate-100 border border-slate-100 rounded-2xl p-4 text-slate-400 font-bold outline-none cursor-not-allowed" defaultValue="yaar@university.edu" />
              </div>
            </div>
          </div>
        </div>

        <div className="sakhi-card p-10 bg-white border-none shadow-xl space-y-10">
          <h3 className="text-xl font-black text-slate-800 flex items-center gap-3">
             <i className="fa-solid fa-microchip text-indigo-600"></i> Logical Defaults
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div className="flex flex-col gap-2">
                <h4 className="font-black text-slate-800 tracking-tight">Default Logic Level</h4>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">Adjust the complexity of initial explanations.</p>
                <div className="flex bg-slate-50 rounded-2xl p-2 gap-2 mt-2">
                  {[Difficulty.BEGINNER, Difficulty.INTERMEDIATE].map(d => (
                    <button 
                      key={d}
                      onClick={() => setLocalPrefs(prev => ({ ...prev, difficulty: d }))}
                      className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${localPrefs.difficulty === d ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-indigo-600'}`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex flex-col gap-2">
                <h4 className="font-black text-slate-800 tracking-tight">Primary Tech Stack</h4>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">Preferred language for compiler logic.</p>
                <select 
                  value={localPrefs.language}
                  onChange={(e) => setLocalPrefs(prev => ({ ...prev, language: e.target.value }))}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-slate-700 font-bold outline-none focus:border-indigo-400 mt-2"
                >
                  <option>JavaScript</option>
                  <option>Python</option>
                  <option>C++</option>
                  <option>Java</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {saveStatus && (
          <div className="bg-emerald-500 text-white px-8 py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest animate-in shadow-xl shadow-emerald-100 text-center">
            {saveStatus}
          </div>
        )}

        <div className="flex justify-end gap-6">
          <button onClick={handleSave} className="px-12 py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-indigo-600 transition-all active:scale-95">
             Commit Changes Node
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;


import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { UserProvider, useUser } from './context/UserContext';

// Import Pages
import Dashboard from './pages/Dashboard';
import ConceptTutor from './pages/ConceptTutor';
import LogicDecoder from './pages/LogicDecoder';
import BugShield from './pages/BugShield';
import NotesAlchemist from './pages/NotesAlchemist';
import QuizGenerator from './pages/QuizGenerator';
import Progress from './pages/Progress';
import Settings from './pages/Settings';
import Auth from './pages/Auth';
import Landing from './pages/Landing';
import Compiler from './pages/Compiler';
import CourseListing from './pages/CourseListing';
import CourseDetail from './pages/CourseDetail';
import LessonPage from './pages/LessonPage';
import CompanyPrep from './pages/CompanyPrep';
import CompanyDetails from './pages/CompanyDetails';
import SuccessStories from './pages/SuccessStories';

const ProtectedLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, logout, preferences } = useUser();
  const location = useLocation();
  const [showCompanyMenu, setShowCompanyMenu] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/landing" />;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <nav className="h-20 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-6 lg:px-12 flex items-center justify-between sticky top-0 z-[100] shadow-sm">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 hero-gradient rounded-xl flex items-center justify-center text-white text-lg font-black shadow-lg">CS</div>
            <span className="text-xl font-black tracking-tighter text-slate-900 italic hidden sm:block">Code<span className="text-indigo-600">Sakhi</span></span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            <Link to="/" className={`text-[10px] font-black uppercase tracking-[0.3em] ${location.pathname === '/' ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}>Dashboard</Link>
            <Link to="/courses" className={`text-[10px] font-black uppercase tracking-[0.3em] ${location.pathname.startsWith('/courses') || location.pathname.startsWith('/course') || location.pathname.startsWith('/lesson') ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}>Courses</Link>
            
            <div className="relative" onMouseEnter={() => setShowCompanyMenu(true)} onMouseLeave={() => setShowCompanyMenu(false)}>
              <Link to="/company-prep" className={`text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2 ${location.pathname.startsWith('/company') ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}>
                Company Prep <i className="fa-solid fa-chevron-down text-[8px]"></i>
              </Link>
              {showCompanyMenu && (
                <div className="absolute top-full left-0 w-56 bg-white shadow-2xl rounded-2xl border border-slate-100 p-2 mt-0 animate-in fade-in zoom-in duration-200">
                  {[
                    { label: 'All Companies', icon: 'fa-building', path: '/company-prep' },
                    { label: 'FAANG Focus', icon: 'fa-rocket', path: '/company-prep?cat=FAANG' },
                    { label: 'Service Based', icon: 'fa-server', path: '/company-prep?cat=SERVICE' },
                    { label: 'Mock Interviews', icon: 'fa-user-tie', path: '/company-prep?mock=true' },
                  ].map(item => (
                    <Link key={item.label} to={item.path} className="flex items-center gap-3 p-3 hover:bg-indigo-50 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:text-indigo-600 transition-all">
                      <i className={`fa-solid ${item.icon} w-4`}></i> {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/compiler" className={`text-[10px] font-black uppercase tracking-[0.3em] ${location.pathname.startsWith('/compiler') ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}>Compiler</Link>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-xs font-black text-slate-900">{preferences.userName}</span>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{preferences.difficulty} Learner</span>
          </div>
          <Link to="/settings" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-colors border border-slate-100">
            <i className="fa-solid fa-gear"></i>
          </Link>
          <button onClick={logout} className="text-[10px] font-black text-rose-500 uppercase tracking-widest hover:text-rose-600 transition-colors ml-2">
            Logout
          </button>
        </div>
      </nav>

      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-12 pt-8 pb-12">
        {children}
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <UserProvider>
      <HashRouter>
        <Routes>
          <Route path="/landing" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          
          <Route path="/" element={<ProtectedLayout><Dashboard /></ProtectedLayout>} />
          <Route path="/courses" element={<ProtectedLayout><CourseListing /></ProtectedLayout>} />
          <Route path="/course/:id" element={<ProtectedLayout><CourseDetail /></ProtectedLayout>} />
          <Route path="/lesson/:id" element={<ProtectedLayout><LessonPage /></ProtectedLayout>} />
          <Route path="/company-prep" element={<ProtectedLayout><CompanyPrep /></ProtectedLayout>} />
          <Route path="/company/:id" element={<ProtectedLayout><CompanyDetails /></ProtectedLayout>} />
          <Route path="/compiler/:id" element={<ProtectedLayout><Compiler /></ProtectedLayout>} />
          <Route path="/compiler" element={<ProtectedLayout><Compiler /></ProtectedLayout>} />
          <Route path="/tutor" element={<ProtectedLayout><ConceptTutor /></ProtectedLayout>} />
          <Route path="/logic-decoder" element={<ProtectedLayout><LogicDecoder /></ProtectedLayout>} />
          <Route path="/bug-shield" element={<ProtectedLayout><BugShield /></ProtectedLayout>} />
          <Route path="/notes-alchemist" element={<ProtectedLayout><NotesAlchemist /></ProtectedLayout>} />
          <Route path="/success-stories" element={<ProtectedLayout><SuccessStories /></ProtectedLayout>} />
          <Route path="/quiz" element={<ProtectedLayout><QuizGenerator /></ProtectedLayout>} />
          <Route path="/progress" element={<ProtectedLayout><Progress /></ProtectedLayout>} />
          <Route path="/settings" element={<ProtectedLayout><Settings /></ProtectedLayout>} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </UserProvider>
  );
};

export default App;

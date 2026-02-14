
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Difficulty, UserStats, AttemptRecord } from '../types';

interface UserContextType {
  stats: UserStats;
  preferences: {
    difficulty: Difficulty;
    language: string;
    userName: string;
  };
  isAuthenticated: boolean;
  login: (name: string) => void;
  logout: () => void;
  updateStats: (key: keyof UserStats, amount?: number) => void;
  recordAssessment: (moduleId: string, score: number, weakTopics: string[]) => void;
  updatePreferences: (newPrefs: Partial<UserContextType['preferences']>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem('sakhi_auth') === 'true');

  const [stats, setStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem('sakhi_stats');
    return saved ? JSON.parse(saved) : {
      conceptsLearned: 12,
      quizzesTaken: 8,
      codesExplained: 45,
      errorsFixed: 22,
      xp: 1500,
      streak: 5,
      completedModules: [],
      masteryScores: {},
      attemptHistory: [],
      weakConcepts: []
    };
  });

  const [preferences, setPreferences] = useState(() => {
    const saved = localStorage.getItem('sakhi_prefs');
    return saved ? JSON.parse(saved) : {
      difficulty: Difficulty.BEGINNER,
      language: 'JavaScript',
      userName: 'Coding Learner'
    };
  });

  useEffect(() => {
    localStorage.setItem('sakhi_stats', JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem('sakhi_prefs', JSON.stringify(preferences));
  }, [preferences]);

  const login = (name: string) => {
    setIsAuthenticated(true);
    setPreferences(prev => ({ ...prev, userName: name }));
    localStorage.setItem('sakhi_auth', 'true');
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('sakhi_auth');
  };

  const updateStats = (key: keyof UserStats, amount: number = 1) => {
    setStats(prev => {
      const current = prev[key];
      if (typeof current === 'number') {
        return { ...prev, [key]: current + amount };
      }
      return prev;
    });
  };

  const recordAssessment = (moduleId: string, score: number, weakTopics: string[]) => {
    setStats(prev => {
      const isPass = score >= 60;
      const xpGained = score * 5 + (isPass ? 200 : 0);
      
      const newHistory: AttemptRecord = {
        moduleId,
        score,
        timestamp: Date.now(),
        weakTopics
      };

      const updatedMastery = { ...prev.masteryScores };
      updatedMastery[moduleId] = Math.max(updatedMastery[moduleId] || 0, score);

      const updatedCompleted = isPass && !prev.completedModules.includes(moduleId)
        ? [...prev.completedModules, moduleId]
        : prev.completedModules;

      return {
        ...prev,
        xp: prev.xp + xpGained,
        quizzesTaken: prev.quizzesTaken + 1,
        completedModules: updatedCompleted,
        masteryScores: updatedMastery,
        attemptHistory: [newHistory, ...prev.attemptHistory].slice(0, 50),
        weakConcepts: Array.from(new Set([...prev.weakConcepts, ...weakTopics]))
      };
    });
  };

  const updatePreferences = (newPrefs: Partial<typeof preferences>) => {
    setPreferences(prev => ({ ...prev, ...newPrefs }));
  };

  return (
    <UserContext.Provider value={{ stats, preferences, isAuthenticated, login, logout, updateStats, recordAssessment, updatePreferences }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
};

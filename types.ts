
export enum Difficulty {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED'
}

export enum CompanyCategory {
  FAANG = 'FAANG',
  PRODUCT = 'PRODUCT',
  SERVICE = 'SERVICE',
  STARTUP = 'STARTUP'
}

export interface Problem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  category: 'Arrays' | 'Strings' | 'Linked List' | 'Trees' | 'DP' | 'Recursion' | 'Graphs' | 'Math';
  companies: string[]; // e.g. ['google', 'amazon']
  examples: { input: string; output: string; explanation?: string }[];
  testCases: { input: any[]; expected: any }[];
  constraints: string[];
  starterCode: Record<string, string>; // lang -> code
  tags: string[];
}

export interface ComplexityResult {
  time: string;
  space: string;
  isOptimal: boolean;
  suggestion: string;
}

export interface CodeQualityReport {
  correctness: number; // 0-100
  efficiency: number;
  readability: number;
  companyReadiness: number;
  feedback: string;
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  category: CompanyCategory;
  questionCount: number;
  difficultyDist: { easy: number; medium: number; hard: number };
  hiringRate: string;
  tags: string[];
}

export interface CompanyQuestion {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  acceptance: string;
  frequency: number;
  tags: string[];
  status: 'Solved' | 'Attempted' | 'Locked';
  askedInRounds: string[];
}

export interface AttemptRecord {
  moduleId: string;
  score: number;
  timestamp: number;
  weakTopics: string[];
}

export interface ExplanationPart {
  line: number;
  conceptType: string;
  code: string;
  explanation: string;
}

export interface DebugResult {
  errorSummary: string;
  suggestedFix: string;
  improvedCode: string;
  learningTip: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  conceptTag: string;
}

export interface UserStats {
  conceptsLearned: number;
  quizzesTaken: number;
  codesExplained: number;
  errorsFixed: number;
  xp: number;
  streak: number;
  completedModules: string[];
  masteryScores: Record<string, number>;
  attemptHistory: AttemptRecord[];
  weakConcepts: string[];
  companyProgress: Record<string, number>;
}

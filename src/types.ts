export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  subject?: string;
  mode?: string;
}

export interface StudyTask {
  day: number;
  title: string;
  duration: string;
  completed: boolean;
}

export interface StudyPhase {
  phaseName: string;
  daysRange: string;
  focus: string;
  tasks: StudyTask[];
}

export interface StudyPlan {
  title: string;
  subject: string;
  totalHours: number;
  intensity: string;
  goal: string;
  phases: StudyPhase[];
  milestones: {
    title: string;
    progress: number;
    status: string;
  }[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  hint: string;
  explanation: string;
  concept: string;
}

export interface QuizData {
  topic: string;
  difficulty: string;
  questions: QuizQuestion[];
}

export interface SubjectMastery {
  subject: string;
  category: string;
  percentage: number;
  color: string;
  tasksDone: number;
  totalTasks: number;
}

export interface TutorialStep {
  id: string;
  title: string;
  shortDesc: string;
  duration: string; // e.g. "5 Dk"
  icon: string; // Lucide icon name matching
  content: string; // Markdown or beautifully styled text
  sampleCode?: string; // If this step has playground demo code
  sampleCodeLanguage?: string; // html / css
  quiz?: {
    question: string;
    options: string[];
    answerIndex: number;
    explanation: string;
  };
}

export interface StepCategory {
  id: string;
  title: string;
  icon: string;
  description: string;
  steps: TutorialStep[];
}

export interface FAQItem {
  question: string;
  answer: string;
  category: "maliyet" | "kariyer" | "teknoloji" | "genel";
  curiosityLevel: "Yüksek" | "Orta" | "Temel";
}

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: Date;
}

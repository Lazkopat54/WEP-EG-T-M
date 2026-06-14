import React, { useState, useEffect, useRef } from "react";
import { 
  Compass, Code, Palette, Cpu, Globe, Target, Layout, Sliders, Smartphone, 
  Workflow, Server, Rocket, CheckCircle2, ChevronRight, HelpCircle, MessageSquare, 
  Play, Sparkles, BookOpen, Send, Award, RefreshCw, Trophy, ArrowRight, BookMarked,
  Layers, Smile, AlertCircle, FileCode, Check, Star, HelpCircle as HelpIcon, Flame, Terminal
} from "lucide-react";
import { TUTORIAL_CATEGORIES, GENERAL_FAQS } from "./data";
import { TutorialStep, FAQItem, ChatMessage, StepCategory } from "./types";
import Playground from "./components/Playground";

// Helper to resolve dynamic icons from dataset
function getCategoryIcon(name: string) {
  switch (name) {
    case "Compass": return <Compass className="w-5 h-5" />;
    case "Code": return <Code className="w-5 h-5" />;
    case "Palette": return <Palette className="w-5 h-5" />;
    case "Cpu": return <Cpu className="w-5 h-5" />;
    case "Globe": return <Globe className="w-5 h-5" />;
    default: return <BookOpen className="w-5 h-5" />;
  }
}

function getStepIcon(name: string) {
  switch (name) {
    case "Target": return <Target className="w-4 h-4 text-[#00FF66]" />;
    case "Layout": return <Layout className="w-4 h-4 text-[#00FF66]" />;
    case "Palette": return <Palette className="w-4 h-4 text-[#00FF66]" />;
    case "FileCode": return <FileCode className="w-4 h-4 text-[#00FF66]" />;
    case "BookOpen": return <BookOpen className="w-4 h-4 text-[#00FF66]" />;
    case "Sliders": return <Sliders className="w-4 h-4 text-[#00FF66]" />;
    case "Smartphone": return <Smartphone className="w-4 h-4 text-[#00FF66]" />;
    case "Workflow": return <Workflow className="w-4 h-4 text-[#00FF66]" />;
    case "Server": return <Server className="w-4 h-4 text-[#00FF66]" />;
    case "Rocket": return <Rocket className="w-4 h-4 text-[#00FF66]" />;
    default: return <FileCode className="w-4 h-4 text-[#00FF66]" />;
  }
}

export default function App() {
  // Navigation active tab index or identifier
  const [activeTab, setActiveTab] = useState<"dersler" | "merak-edilenler" | "yapay-zeka-mentor">("dersler");
  
  // Selection of Tutorial Step
  const [selectedCategory, setSelectedCategory] = useState<StepCategory>(TUTORIAL_CATEGORIES[0]);
  const [selectedStep, setSelectedStep] = useState<TutorialStep>(TUTORIAL_CATEGORIES[0].steps[0]);

  // User State Persistence
  const [completedStepIds, setCompletedStepIds] = useState<string[]>([]);
  const [solvedQuizzes, setSolvedQuizzes] = useState<{ [stepId: string]: number }>({}); // stepId -> selectedOptionIdx
  const [quizFeedback, setQuizFeedback] = useState<{ [stepId: string]: { correct: boolean; checked: boolean } }>({});
  const [score, setScore] = useState<number>(0);
  const [streakDays, setStreakDays] = useState<number>(3); // Motivating streak indicator

  // SSS/FAQ filter and search states
  const [faqCategoryFilter, setFaqCategoryFilter] = useState<"hepsi" | "maliyet" | "kariyer" | "teknoloji" | "genel">("hepsi");
  const [faqSearchQuery, setFaqSearchQuery] = useState("");

  // AI Mentor Chatbot state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [suggestedQuestions] = useState([
    "Web geliştiricisi olarak ilk paramı nasıl kazanırım?",
    "HTML ve CSS öğrendikten sonra hangi projeleri yapmalıyım?",
    "Figma'dan HTML'e geçiş yaparken nelere dikkat etmeliyiz?",
    "Vercel ile GitHub bağlantısı nasıl çalışır?"
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Initialize and load saved states from localStorage
  useEffect(() => {
    const savedCompleted = localStorage.getItem("webcraft_completed");
    if (savedCompleted) {
      try {
        setCompletedStepIds(JSON.parse(savedCompleted));
      } catch (e) {
        console.error("Error reading storage", e);
      }
    }

    const savedSolved = localStorage.getItem("webcraft_solved_quizzes");
    if (savedSolved) {
      try {
        setSolvedQuizzes(JSON.parse(savedSolved));
      } catch (e) {
        console.error("Error reading storage", e);
      }
    }

    const savedQuizFeedback = localStorage.getItem("webcraft_quiz_feedback");
    if (savedQuizFeedback) {
      try {
        setQuizFeedback(JSON.parse(savedQuizFeedback));
      } catch (e) {
        console.error("Error reading storage", e);
      }
    }

    const savedScore = localStorage.getItem("webcraft_score");
    if (savedScore) {
      setScore(parseInt(savedScore, 10));
    } else {
      setScore(0);
    }

    // Default first greeting message from Kadir Hoca
    setChatMessages([
      {
        id: "greet",
        role: "model",
        text: "Selam geleceğin web ustası! Ben Kadir Hoca. 👨‍💻 Web geliştirme dünyasına adım atmaya hazır mısın? Sana web sitenizi nasıl yapacağını aşama aşama, kafandaki tüm soru işaretlerini dağıtarak öğreteceğim. Soldaki dersleri takip edebilir, canın ne isterse bana sağ taraftan veya bu ekrandan sorabilirsin! Hadi başlayalım, senin hedefin ne?",
        timestamp: new Date()
      }
    ]);
  }, []);

  // Save states helper
  const saveCompletedSteps = (newCompleted: string[]) => {
    setCompletedStepIds(newCompleted);
    localStorage.setItem("webcraft_completed", JSON.stringify(newCompleted));
    // Calculate new score: 50 points per chapter check, 100 points per quiz
    const quizCount = Object.values(quizFeedback).filter((q: any) => q.correct).length;
    const newScore = (newCompleted.length * 50) + (quizCount * 100);
    setScore(newScore);
    localStorage.setItem("webcraft_score", newScore.toString());
  };

  // Safe auto scroll for chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const toggleStepCompletion = (stepId: string) => {
    let updated;
    if (completedStepIds.includes(stepId)) {
      updated = completedStepIds.filter(id => id !== stepId);
    } else {
      updated = [...completedStepIds, stepId];
    }
    saveCompletedSteps(updated);
  };

  // Active step change triggers sync of playground or quiz view
  const handleSelectStep = (category: StepCategory, step: TutorialStep) => {
    setSelectedCategory(category);
    setSelectedStep(step);
    // Smooth scroll back to active lesson container
    const view = document.getElementById("active-lesson-view");
    if (view) {
      view.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Submit response for quiz
  const handleAnswerQuiz = (selectedOptIdx: number) => {
    const isCorrect = selectedOptIdx === selectedStep.quiz?.answerIndex;
    
    const updatedSolved = { ...solvedQuizzes, [selectedStep.id]: selectedOptIdx };
    setSolvedQuizzes(updatedSolved);
    localStorage.setItem("webcraft_solved_quizzes", JSON.stringify(updatedSolved));

    const updatedFeedback = { 
      ...quizFeedback, 
      [selectedStep.id]: { correct: isCorrect, checked: true } 
    };
    setQuizFeedback(updatedFeedback);
    localStorage.setItem("webcraft_quiz_feedback", JSON.stringify(updatedFeedback));

    // Force recalculate score
    const completedCount = completedStepIds.length;
    const quizCount = Object.values(updatedFeedback).filter((q: any) => q.correct).length;
    const newScore = (completedCount * 50) + (quizCount * 100);
    setScore(newScore);
    localStorage.setItem("webcraft_score", newScore.toString());
  };

  // Reset progress entirely to start fresh
  const handleResetAllProgress = () => {
    if (confirm("Gelişim istatistiklerinizi, puanlarınızı ve tamamladığınız dersleri sıfırlamak istediğinize emin misiniz?")) {
      setCompletedStepIds([]);
      setSolvedQuizzes({});
      setQuizFeedback({});
      setScore(0);
      localStorage.removeItem("webcraft_completed");
      localStorage.removeItem("webcraft_solved_quizzes");
      localStorage.removeItem("webcraft_quiz_feedback");
      localStorage.removeItem("webcraft_score");
      alert("Tüm gelişim başarıyla sıfırlandı!");
    }
  };

  // Send message to Kadir Hoca Chatbot Integration
  const handleSendChatMessage = async (msgText: string) => {
    if (!msgText.trim()) return;
    
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      text: msgText,
      timestamp: new Date()
    };
    
    setChatMessages(prev => [...prev, userMsg]);
    setCurrentMessage("");
    setIsAiLoading(true);

    try {
      const historyPayload = chatMessages.slice(-8).map(m => ({
        role: m.role,
        text: m.text
      }));

      const res = await fetch("/api/mentor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: msgText,
          history: historyPayload
        })
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Sunucu hatası oluştu.");
      }

      setChatMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: "model",
        text: data.response,
        timestamp: new Date()
      }]);
    } catch (err: any) {
      console.error("AI Mentor request failed:", err);
      // Friendly Mentor Mock fallback response to keep user fully interactive
      const fallbackReplies: { [key: string]: string } = {
        "para": "Geleceğin web geliştiricisi olarak para kazanmanın en popüler yolu, yerel esnaflara ve işletmelere (örneğin berberler, kafeler, butikler) 'Google Haritalar + Modern Tanıtım Web Sitesi' paketleri hazırlamaktır! React ve Vercel sayesinde sıfır sunucu maliyetiyle siteler açıp onlardan aylık bakım / kurulum ücretleri alabilirsin. Başlamak için harika bir fikir!",
        "proje": "İskelet olarak mükemmel şablonlar tasarla. HTML ve CSS öğrendiysen hemen:\n1. Kendin için çarpıcı bir karanlık tema 'Kişisel Özgeçmiş & Portfolyo' sitesi yap,\n2. Bir hamburger restoranı için 'Dinamik Sipariş Menüsü' arayüzü kodla,\n3. Minimalist bir 'Not Defteri' veya 'Yapılacaklar Alışveriş Listesi' tasarla.",
        "figma": "Figma'dan kodlamaya geçerken hiyerarşiyi bozmamak gerekir. Figma'daki her bir UI 'Frame' veya 'Group' yapısını HTML'de birer `<div>` veya semantic kart olarak düşün. Figma renk kodlarını (HEX) doğrudan Tailwind CSS sınıflarına (örneğin `bg-[#00FF66]`) birebir aktarabilirsin.",
        "vercel": "Vercel, GitHub deposuna doğrudan kulak verir! Sen bilgisayarındaki kodları GitHub'a her gönderdiğinde (git push), Vercel bunu anında algılar, 15-20 saniye içinde siteni baştan derler ve yayındaki siteni hiçbir kesinti yaratmadan günceller. Buna CI/CD (Sürekli Entegrasyon ve Dağıtım) denir.",
        "default": "Harika bir gelişim gösteriyorsun! Yazılım öğrenmek bisiklete binmek gibidir; sadece izleyerek değil, düşe kalka kod yazarak, deneme alanında butonları bozarak öğrenilir. Gemini API bağlantısında küçük bir gecikme oldu ama Kadir Hoca her zaman yanında! Web tasarım, hosting, SEO veya React ile ilgili detay sormaya devam edebilirsin. Kod yazmaya devam!"
      };

      let selectedFallback = fallbackReplies.default;
      const checkText = msgText.toLowerCase();
      if (checkText.includes("para") || checkText.includes("kazan")) selectedFallback = fallbackReplies.para;
      else if (checkText.includes("proje") || checkText.includes("ödev") || checkText.includes("odev")) selectedFallback = fallbackReplies.proje;
      else if (checkText.includes("figma") || checkText.includes("tasarım")) selectedFallback = fallbackReplies.figma;
      else if (checkText.includes("vercel") || checkText.includes("yayın") || checkText.includes("github")) selectedFallback = fallbackReplies.vercel;

      setTimeout(() => {
        setChatMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          role: "model",
          text: `⚡ [Kadir Hoca Canlı Modu]: ${selectedFallback}\n\n*(Not: Gerçek zamanlı yapay zeka cevapları için projenin Secrets kısmında geçerli bir GEMINI_API_KEY bulunmalıdır. Kadir Hoca şu an önbellekli rehberlik sistemiyle sana destek vermeye devam ediyor!)*`,
          timestamp: new Date()
        }]);
      }, 1000);
    } finally {
      setIsAiLoading(false);
    }
  };

  // Statistics
  const totalStepsInApp = TUTORIAL_CATEGORIES.reduce((acc, cat) => acc + cat.steps.length, 0);
  const completedPercentage = Math.round((completedStepIds.length / totalStepsInApp) * 100);

  // Filtered FAQs
  const filteredFAQs = GENERAL_FAQS.filter((faq) => {
    const matchesCategory = faqCategoryFilter === "hepsi" || faq.category === faqCategoryFilter;
    const matchesSearch = 
      faq.question.toLowerCase().includes(faqSearchQuery.toLowerCase()) || 
      faq.answer.toLowerCase().includes(faqSearchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col font-sans relative selection:bg-[#00FF66] selection:text-black">
      
      {/* GLOW DECORATIONS */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00FF66]/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      {/* TOP STATUS BAR */}
      <div className="bg-black/95 border-b border-white/10 px-6 py-2.5 flex justify-between items-center text-xs font-mono tracking-widest text-white/50 uppercase z-10">
        <div className="flex items-center gap-4">
          <span className="text-[#00FF66] font-bold animate-pulse">● CANLI SİSTEM</span>
          <span className="hidden sm:inline">|</span>
          <span className="hidden sm:inline">2026 AKADEMİK YILI REHBERİ</span>
        </div>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => handleResetAllProgress()} title="Başarılarımı Sıfırla">
            <Trophy className="w-4 h-4 text-[#00FF66] group-hover:rotate-12 transition-transform" />
            <span className="text-[#00FF66] font-bold group-hover:underline">{score} PUAN</span>
          </div>
          <div className="flex items-center gap-1.5" title="Öğrenme Seriniz!">
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
            <span className="text-orange-400 font-bold">{streakDays} GÜNLÜK SERİ</span>
          </div>
        </div>
      </div>

      {/* NAVIGATION BAR - BOLD TYPOGRAPHY STYLE */}
      <nav className="border-b border-white/10 bg-black/40 backdrop-blur-md sticky top-0 z-40 px-6 md:px-12 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
          
          {/* Logo */}
          <div 
            className="text-2xl font-black tracking-tighter flex items-center gap-3 cursor-pointer group"
            onClick={() => { setActiveTab("dersler"); }}
          >
            <div className="w-6 h-6 bg-[#00FF66] border border-black shadow-[0_0_12px_#00FF66] transition-transform duration-300 group-hover:rotate-90"></div>
            <span className="font-display font-extrabold tracking-widest text-[22px] text-white">
              WEB<span className="text-[#00FF66]">CRAFT</span>
            </span>
            <span className="text-[10px] font-mono border border-white/20 text-white/40 px-1.5 py-0.5 uppercase tracking-normal">AKADEMİ</span>
          </div>

          {/* Nav Items */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-6 font-display font-bold text-xs sm:text-sm tracking-widest uppercase">
            <button 
              onClick={() => setActiveTab("dersler")}
              className={`px-4 py-2 transition-all duration-150 ${activeTab === 'dersler' ? 'text-white border-b-2 border-[#00FF66] bg-white/5' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
            >
              🚀 ADIM ADIM DERSLER
            </button>
            <button 
              onClick={() => setActiveTab("merak-edilenler")}
              className={`px-4 py-2 transition-all duration-150 ${activeTab === 'merak-edilenler' ? 'text-white border-b-2 border-[#00FF66] bg-white/5' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
            >
              💡 MERAK EDİLENLER (SSS)
            </button>
            <button 
              onClick={() => setActiveTab("yapay-zeka-mentor")}
              className={`px-4 py-2 transition-all duration-150 relative ${activeTab === 'yapay-zeka-mentor' ? 'text-white border-b-2 border-[#00FF66] bg-white/5' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
            >
              🤖 KADİR HOCA (MİNTÖR)
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF66] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FF66]"></span>
              </span>
            </button>
          </div>

          {/* Instant Progress Indicator */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="text-right">
              <div className="text-[10px] font-mono text-white/40 uppercase">GELİŞİM ORANI</div>
              <div className="text-sm font-black text-[#00FF66]">{completedPercentage}% TAMAMLANDI</div>
            </div>
            <div className="w-24 bg-white/10 h-2.5 overflow-hidden">
              <div 
                className="bg-[#00FF66] h-full transition-all duration-500 shadow-[0_0_8px_#00FF66]" 
                style={{ width: `${completedPercentage}%` }}
              ></div>
            </div>
          </div>

        </div>
      </nav>

      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 md:px-12 py-8 md:py-16">

        {/* ==================== TAB 1: ADIM ADIM DERSLER ==================== */}
        {activeTab === "dersler" && (
          <div>
            
            {/* HERO MODULE: MASSIVE TYPOGRAPHY AS SPECIFIED IN THEME */}
            <div className="mb-16 border-l-4 border-[#00FF66] pl-6 md:pl-10 relative overflow-hidden">
              <p className="text-[#00FF66] font-mono text-xs sm:text-sm font-bold mb-4 uppercase tracking-[0.3em]">
                SIFIRDAN PROFESYONELLİĞE ADIM ADIM REHBER
              </p>
              <h1 className="text-[44px] sm:text-[76px] md:text-[92px] leading-[0.9] font-display font-black tracking-tighter uppercase select-none">
                WEB SİTESİ <br className="hidden md:inline" />
                <span className="text-transparent text-stroke-white text-display tracking-tight">NASIL YAPILIR?</span>
              </h1>
              <p className="text-white/60 font-sans text-sm sm:text-lg mt-6 max-w-2xl leading-relaxed">
                Bu platform, hiçbir yazılım tecrübesi olmayan insanların bile bir web sayfasını nasıl tasarlayacağını, kodlayacağını (HTML, CSS, JS) ve internet ortamında <b>ücretsiz</b> yayınlayacağını adım adım öğretmek için tasarlandı.
              </p>
            </div>

            {/* SPLIT SCREEN WORKSPACE: LESSON SIDEBAR + ACTIVE CONTENT */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* SIDEBAR: LEFT COLUMN 4 COLS */}
              <div className="lg:col-span-4 space-y-6">
                
                <div className="bg-[#111] border border-white/10 p-5 rounded-none">
                  <h3 className="text-xs font-mono font-black text-white/40 uppercase tracking-widest mb-4">
                    EĞİTİM MÜFREDATI ({totalStepsInApp} Bölüm)
                  </h3>
                  
                  {/* Category Blocks */}
                  <div className="space-y-4">
                    {TUTORIAL_CATEGORIES.map((category) => {
                      const isCategoryActive = selectedCategory.id === category.id;
                      const completedInCategory = category.steps.filter(s => completedStepIds.includes(s.id)).length;
                      const isCatFullyCompleted = completedInCategory === category.steps.length;

                      return (
                        <div 
                          key={category.id} 
                          className={`border-l-2 p-3 text-left transition-all ${
                            isCategoryActive 
                              ? 'border-[#00FF66] bg-white/5' 
                              : 'border-white/10 hover:border-white/30 bg-transparent'
                          }`}
                        >
                          <div className="flex items-center justify-between pointer-events-none mb-1">
                            <span className="font-mono text-[10px] text-white/40 uppercase tracking-wider">KATEGORİ</span>
                            {isCatFullyCompleted ? (
                              <span className="text-[9px] bg-[#00FF66]/20 text-[#00FF66] px-1.5 py-0.5 font-bold uppercase tracking-wider font-mono">TAMAMLANDI ✓</span>
                            ) : completedInCategory > 0 ? (
                              <span className="text-[9px] bg-blue-500/20 text-blue-400 px-1.5 py-0.5 font-bold uppercase tracking-widest font-mono">{completedInCategory}/{category.steps.length} BÖLÜM</span>
                            ) : null}
                          </div>

                          <div className="flex items-center gap-2 mb-2">
                            {getCategoryIcon(category.icon)}
                            <h4 className="font-display font-black text-sm text-white uppercase tracking-tight">
                              {category.title}
                            </h4>
                          </div>
                          
                          <p className="text-white/50 text-[11px] font-sans leading-relaxed mb-3">
                            {category.description}
                          </p>

                          {/* Steps loop within category */}
                          <div className="space-y-1 bg-black/40 p-1.5">
                            {category.steps.map((step) => {
                              const isStepActive = selectedStep.id === step.id;
                              const isStepCompleted = completedStepIds.includes(step.id);

                              return (
                                <button
                                  key={step.id}
                                  onClick={() => handleSelectStep(category, step)}
                                  className={`w-full text-left px-2.5 py-2 text-xs transition-colors flex items-center justify-between ${
                                    isStepActive 
                                      ? 'bg-[#00FF66]/15 text-[#00FF66] font-bold border border-[#00FF66]/30' 
                                      : 'text-white/70 hover:text-white hover:bg-white/5'
                                  }`}
                                >
                                  <div className="flex items-center gap-2 min-w-0 pr-2">
                                    <div className="flex-shrink-0" onClick={(e) => {
                                      e.stopPropagation(); // Don't trigger standard selection
                                      toggleStepCompletion(step.id);
                                    }}>
                                      {isStepCompleted ? (
                                        <Check className="w-4 h-4 text-[#00FF66] bg-[#00FF66]/10 border border-[#00FF66]/30" />
                                      ) : (
                                        <span className="w-4 h-4 inline-block border border-white/30 hover:border-[#00FF66]"></span>
                                      )}
                                    </div>
                                    <span className="truncate">{step.title}</span>
                                  </div>
                                  <span className="text-[10px] font-mono text-white/30 whitespace-nowrap">{step.duration}</span>
                                </button>
                              );
                            })}
                          </div>

                        </div>
                      );
                    })}
                  </div>

                </div>

                {/* HELP CARD: QUICK LINK TO KADIR HOCA */}
                <div className="bg-[#00FF66]/5 border-2 border-[#00FF66]/20 p-6 rounded-none text-left">
                  <div className="flex items-center gap-3 mb-2">
                    <Smile className="w-7 h-7 text-[#00FF66]" />
                    <h3 className="font-mono font-black text-[#00FF66] tracking-tight uppercase">YAPAY ZEKA MENTORU</h3>
                  </div>
                  <p className="text-xs text-white/70 leading-relaxed mb-4">
                    Kafanıza takılan bir HTML kodunu çalıştıramadınız mı veya sunucu maliyetleri sizi mi korkutuyor? <b>Kadir Hoca</b> ders boyunca canlı destek vermeye hazır!
                  </p>
                  <button 
                    onClick={() => setActiveTab("yapay-zeka-mentor")}
                    className="w-full text-center py-2.5 bg-[#00FF66] hover:bg-white text-black font-black uppercase tracking-wider text-xs transition-colors"
                  >
                    KADİR HOCA'YA SOR ➔
                  </button>
                </div>

              </div>

              {/* ACTIVE LESSON VIEW CONTAINER: RIGHT COLUMN 8 COLS */}
              <div 
                className="lg:col-span-8 bg-[#111111] border border-white/10 p-6 md:p-10 text-left space-y-8 scroll-mt-24" 
                id="active-lesson-view"
              >
                
                {/* Header Information */}
                <div className="border-b border-white/10 pb-6">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                    <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1 text-xs font-mono font-bold text-[#00FF66] tracking-wider uppercase">
                      {getStepIcon(selectedStep.icon)} {selectedCategory.title}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-white/50">{selectedStep.duration} Okuma-Uygulama Süresi</span>
                    </div>
                  </div>

                  <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-white uppercase leading-normal">
                    {selectedStep.title}
                  </h2>

                  <p className="text-white/60 text-sm sm:text-base mt-2 font-sans italic border-l-2 border-white/10 pl-3">
                    {selectedStep.shortDesc}
                  </p>
                </div>

                {/* Actual Lesson Detailed Text Rendering */}
                <div className="prose prose-invert max-w-none text-white/90 space-y-6 leading-relaxed font-sans text-sm sm:text-base">
                  {selectedStep.content.split("\n\n").map((para, pIdx) => {
                    // Title check
                    if (para.startsWith("###")) {
                      return (
                        <h3 key={pIdx} className="text-xl sm:text-2xl font-display font-black text-[#00FF66] pt-4 tracking-tight uppercase flex items-center gap-2 border-b border-white/5 pb-2">
                          <span className="text-xs font-mono opacity-55">⚡</span> {para.replace("###", "").trim()}
                        </h3>
                      );
                    }
                    if (para.startsWith("####")) {
                      return (
                        <h4 key={pIdx} className="text-lg font-bold text-white pt-2 uppercase">
                          {para.replace("####", "").trim()}
                        </h4>
                      );
                    }
                    if (para.startsWith("* ")) {
                      const listItems = para.split("\n");
                      return (
                        <ul key={pIdx} className="list-disc pl-5 space-y-2 text-white/80">
                          {listItems.map((li, lIdx) => {
                            const cleanText = li.replace("* ", "");
                            // bold words matching
                            const boldMatch = cleanText.split("**");
                            return (
                              <li key={lIdx}>
                                {boldMatch.map((chunk, cIdx) => (
                                  cIdx % 2 === 1 ? <b key={cIdx} className="text-[#00FF66] font-bold">{chunk}</b> : chunk
                                ))}
                              </li>
                            );
                          })}
                        </ul>
                      );
                    }
                    if (para.startsWith("1. ")) {
                      const listItems = para.split("\n");
                      return (
                        <ol key={pIdx} className="list-decimal pl-5 space-y-2 text-white/80">
                          {listItems.map((li, lIdx) => {
                            const cleanText = li.substring(li.indexOf(".") + 1).trim();
                            const boldMatch = cleanText.split("**");
                            return (
                              <li key={lIdx}>
                                {boldMatch.map((chunk, cIdx) => (
                                  cIdx % 2 === 1 ? <b key={cIdx} className="text-[#00FF66] font-bold">{chunk}</b> : chunk
                                ))}
                              </li>
                            );
                          })}
                        </ol>
                      );
                    }
                    if (para.startsWith("|")) {
                      const rows = para.split("\n").filter(r => r.trim() !== "");
                      return (
                        <div key={pIdx} className="overflow-x-auto w-full my-4 border border-white/10 font-mono text-xs">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="bg-white/5 border-b border-white/10">
                                <th className="p-3 text-[#00FF66] uppercase">PARAMETRE</th>
                                <th className="p-3 uppercase">TANIM / DUYGU</th>
                                <th className="p-3 uppercase">SEKTÖR UYGUNLUĞU</th>
                              </tr>
                            </thead>
                            <tbody>
                              {rows.slice(2).map((row, rIdx) => {
                                const cols = row.split("|").map(c => c.trim()).filter(c => c !== "");
                                return (
                                  <tr key={rIdx} className="border-b border-white/5 hover:bg-white-[0.02] hover:bg-white/5">
                                    <td className="p-3 font-bold text-white whitespace-nowrap">{cols[0]?.replace(/\*\*/g, '')}</td>
                                    <td className="p-3 text-white/70">{cols[1]?.replace(/\*\*/g, '')}</td>
                                    <td className="p-3 text-white/50">{cols[2]?.replace(/\*\*/g, '')}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      );
                    }
                    if (para.startsWith("```")) {
                      const cleanCode = para.replace(/```[a-z]*/g, "").trim();
                      return (
                        <div key={pIdx} className="bg-black/90 p-4 rounded-none border border-white/10 font-mono text-xs overflow-x-auto text-[#00FF66]/80 my-4 flex flex-col">
                          <div className="flex items-center justify-between text-white/30 text-[10px] uppercase pb-2 mb-2 border-b border-white/10 leading-none">
                            <span>Örnek Kod Şablonu</span>
                            <span>Kopyalanabilir</span>
                          </div>
                          <pre>{cleanCode}</pre>
                        </div>
                      );
                    }

                    // Standard text with bold markers mapping inline
                    const chunks = para.split("**");
                    return (
                      <p key={pIdx} className="text-white/80 font-sans text-sm sm:text-base leading-relaxed">
                        {chunks.map((chunk, checkIdx) => {
                          const quoteMatch = chunk.split("\"");
                          const content = quoteMatch.map((qText, qIdx) => (
                            qIdx % 2 === 1 ? <code key={qIdx} className="font-mono text-xs bg-white/10 px-1.5 py-0.5 text-white">{qText}</code> : qText
                          ));

                          return checkIdx % 2 === 1 
                            ? <strong key={checkIdx} className="text-[#00FF66] font-bold">{content}</strong> 
                            : content;
                        })}
                      </p>
                    );
                  })}
                </div>

                {/* LESSON COMPLETION CHECKBOX BUTTON */}
                <div className="p-6 bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 transition-all">
                  <div>
                    <h3 className="font-display font-black text-lg uppercase tracking-tight">BU DEV DERSİ TAMAMLADINIZ MI?</h3>
                    <p className="text-xs text-white/50">Müfredattaki diğer bölümlerle ilerlemek ve +50 puan biriktirmek için aşağıdaki butonu işaretleyin.</p>
                  </div>
                  <button
                    onClick={() => toggleStepCompletion(selectedStep.id)}
                    className={`px-6 py-3 font-display font-black uppercase text-xs tracking-widest transition-colors flex items-center gap-3 w-full sm:w-auto justify-center ${
                      completedStepIds.includes(selectedStep.id) 
                        ? 'bg-black border-2 border-[#00FF66] text-[#00FF66]' 
                        : 'bg-[#00FF66] text-black hover:bg-white hover:text-black shadow-[0_4px_12px_rgba(0,255,102,0.2)]'
                    }`}
                  >
                    {completedStepIds.includes(selectedStep.id) ? (
                      <>
                        <Check className="w-4 h-4 stroke-[3px]" /> DERS GEÇİLDİ (✓)
                      </>
                    ) : (
                      <>
                        TAMAMLANDI OLARAK İŞARETLE ➔
                      </>
                    )}
                  </button>
                </div>

                {/* PLAYGROUND: RENDER IF CURRENT STEP HAS SAMPLE_CODE */}
                {selectedStep.sampleCode && (
                  <div className="space-y-4 pt-10 border-t border-white/10">
                    <div>
                      <span className="text-[#00FF66] font-mono text-[11px] font-bold uppercase tracking-widest">KODLA & TEST ET</span>
                      <h3 className="text-xl font-display font-black uppercase tracking-tight text-white mb-2">Canlı Deney Alanıyla Oynayın</h3>
                      <p className="text-xs sm:text-sm text-white/50">Yukarıdaki derste öğrendiklerinizi hemen aşağıda test edebilirsiniz. Değişiklikleriniz anında reaktif olarak sağ panelde görünecektir. Kodlarınızı bozmaktan korkmayın, her an yukarıdan sıfırlayabilirsiniz!</p>
                    </div>

                    <Playground initialCode={selectedStep.sampleCode} />
                  </div>
                )}

                {/* QUIZ SECTION */}
                {selectedStep.quiz && (
                  <div className="p-6 sm:p-8 bg-[#141414] border-2 border-white/10 space-y-6 relative overflow-hidden" id="interactive-quiz">
                    
                    {/* Glowing Quiz Badge */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl pointer-events-none"></div>

                    <div className="flex items-center gap-2 text-purple-400 font-mono text-xs uppercase tracking-widest font-bold">
                      <Award className="w-4 h-4" /> BİLGİ DÜZOĞLU TESTİ (+100 PUAN)
                    </div>

                    <div>
                      <h4 className="text-base sm:text-lg font-display font-black uppercase tracking-tight text-white">
                        Soru: {selectedStep.quiz.question}
                      </h4>
                    </div>

                    <div className="space-y-3">
                      {selectedStep.quiz.options.map((option, optIdx) => {
                        const hasSolved = solvedQuizzes[selectedStep.id] !== undefined;
                        const userSelection = solvedQuizzes[selectedStep.id];
                        const isUserSelectThis = userSelection === optIdx;
                        const isCorrectOption = optIdx === selectedStep.quiz?.answerIndex;

                        let optionStyle = "border-white/10 hover:border-white/30 bg-black/40 text-white/80";
                        if (hasSolved) {
                          if (isCorrectOption) {
                            optionStyle = "border-[#00FF66] bg-[#00FF66]/10 text-white font-bold";
                          } else if (isUserSelectThis) {
                            optionStyle = "border-red-500 bg-red-500/10 text-white";
                          } else {
                            optionStyle = "border-white/5 opacity-50 text-white/40 cursor-not-allowed";
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={hasSolved}
                            onClick={() => handleAnswerQuiz(optIdx)}
                            className={`w-full text-left p-4 border transition-all duration-150 flex items-center justify-between font-mono text-xs sm:text-sm ${optionStyle}`}
                          >
                            <span className="pr-4">{option}</span>
                            {hasSolved && isCorrectOption && <Check className="w-4 h-4 text-[#00FF66] flex-shrink-0" />}
                          </button>
                        );
                      })}
                    </div>

                    {/* Feedback area */}
                    {quizFeedback[selectedStep.id]?.checked && (
                      <div className={`p-4 font-mono text-xs sm:text-sm border ${
                        quizFeedback[selectedStep.id].correct 
                          ? 'border-[#00FF66]/30 bg-[#00FF66]/5 text-[#00FF66]' 
                          : 'border-red-500/30 bg-red-500/5 text-red-400'
                      }`}>
                        <div className="flex items-center gap-2 mb-1.5 font-bold uppercase">
                          <AlertCircle className="w-4 h-4" />
                          {quizFeedback[selectedStep.id].correct ? "Tebrikler, Doğru Cevap! 🎉" : "Yanlış Cevap, Tekrar Deneyin!"}
                        </div>
                        <p className="text-white/70 font-sans leading-relaxed">
                          <b>Kadir Hoca'nın Açıklaması:</b> {selectedStep.quiz.explanation}
                        </p>
                      </div>
                    )}

                  </div>
                )}

              </div>

            </div>

          </div>
        )}

        {/* ==================== TAB 2: MERAK EDİLENLER (SSS) ==================== */}
        {activeTab === "merak-edilenler" && (
          <div className="space-y-12">
            
            {/* Header */}
            <div className="border-l-4 border-[#00FF66] pl-6 md:pl-10">
              <span className="text-[#00FF66] font-mono text-xs sm:text-sm font-bold block mb-4 uppercase tracking-[0.3em]">
                DETAYLI MERAK EDİLENLER ARŞİVİ
              </span>
              <h1 className="text-[36px] sm:text-[64px] font-display font-black tracking-tighter uppercase leading-none">
                AKILDA KALAN <br />
                <span className="text-transparent text-stroke-white text-display">SORULAR</span>
              </h1>
              <p className="text-white/60 text-sm sm:text-lg mt-6 max-w-2xl leading-relaxed">
                İster bir kariyer yolu çizmek isteyin, ister bütçe detaylarını merak edin. Merak edilen tüm soruları derledik ve şeffaf cevaplar biçiminde hazırladık.
              </p>
            </div>

            {/* Filters and Search toolbar */}
            <div className="bg-[#111] p-5 border border-white/10 flex flex-col md:flex-row gap-4 justify-between items-center">
              
              {/* Category buttons tab */}
              <div className="flex flex-wrap justify-center gap-2">
                {(["hepsi", "maliyet", "kariyer", "teknoloji", "genel"] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFaqCategoryFilter(cat)}
                    className={`px-4 py-2 font-display font-bold text-xs uppercase tracking-widest transition-colors ${
                      faqCategoryFilter === cat 
                        ? 'bg-[#00FF66] text-black' 
                        : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {cat === "hepsi" ? "HEPSİ" : cat === "maliyet" ? "BÜTÇE & MALİYET" : cat === "kariyer" ? "YAZILIM KARİYERİ" : cat === "teknoloji" ? "TEKNOLOJİ" : "GENEL REHBER"}
                  </button>
                ))}
              </div>

              {/* Search input */}
              <div className="w-full md:w-80 relative">
                <input
                  type="text"
                  placeholder="Kelimelerle arayın..."
                  value={faqSearchQuery}
                  onChange={(e) => setFaqSearchQuery(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 px-4 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#00FF66] font-mono rounded-none"
                />
              </div>

            </div>

            {/* FAQ List Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredFAQs.map((faq, index) => {
                const badgeColor = faq.curiosityLevel === "Yüksek" ? "text-red-400 bg-red-400/10 border-red-400/20" : faq.curiosityLevel === "Orta" ? "text-yellow-400 bg-yellow-400/10 border-yellow-400/20" : "text-[#00FF66] bg-[#00FF66]/10 border-[#00FF66]/20";
                
                return (
                  <div 
                    key={index} 
                    className="p-6 bg-[#111] border border-white/10 flex flex-col justify-between group hover:border-[#00FF66]/30 transition-colors"
                  >
                    <div className="space-y-4">
                      
                      {/* Meta elements */}
                      <div className="flex justify-between items-center text-[10px] font-mono">
                        <span className="text-white/40 uppercase">SORU 0{index + 1}</span>
                        <span className={`px-2 py-0.5 border font-semibold ${badgeColor}`}>{faq.curiosityLevel} Merak</span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-display font-black tracking-tight text-white uppercase group-hover:text-[#00FF66] transition-colors">
                        {faq.question}
                      </h3>

                      <p className="text-sm text-white/60 leading-relaxed font-sans whitespace-pre-line">
                        {faq.answer}
                      </p>

                    </div>

                    <div className="border-t border-white/5 pt-4 mt-6 flex justify-between items-center text-xs font-mono text-white/40 uppercase">
                      <span>BÖLÜM: {faq.category === "maliyet" ? "BÜTÇELER" : faq.category === "kariyer" ? "KARİYER" : faq.category === "teknoloji" ? "KODLAR" : "GENEL"}</span>
                      <span className="text-[#00FF66]/60">İnteraktif Bilgi</span>
                    </div>

                  </div>
                );
              })}

              {filteredFAQs.length === 0 && (
                <div className="col-span-1 md:col-span-2 text-center py-16 bg-[#111] border border-white/10 text-white/40 font-mono text-sm uppercase">
                  Aramanıza uygun soru bulunamadı. Lütfen üstteki Kadir Hoca yapay zeka sekmesinden ona doğrudan sorun!
                </div>
              )}
            </div>

            {/* SECTOR FACT CARD */}
            <div className="bg-white text-black p-8 md:p-12 text-left relative overflow-hidden">
              <div className="absolute right-0 bottom-0 w-64 h-64 bg-[#00FF66]/20 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="max-w-3xl space-y-4">
                <span className="text-[11px] font-mono tracking-widest font-black uppercase text-black/50">YAZILIM SEKTÖR GERÇEKLERİ</span>
                <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tighter uppercase leading-tight">
                  Kendi Web Sitenizi Yapmayı Öğrenmek Neden Bir Süper Güçtür?
                </h2>
                <p className="text-sm sm:text-base text-black/80 font-sans leading-relaxed">
                  İnternet dünyasındaki her işletmenin, her şahsın dijital bir eve ihtiyacı vardır. WordPress ve SiteBuilder araçlarının sunduğu sınırlar, sizi diğerleriyle aynı kalıba sokar. HTML, CSS ve React dillerine hakim olmak, size <b>istediğiniz her şeyi sınırsızca hayata geçirme bağımsızlığı</b> kazandırır. Sektörde iyi bir front-end geliştirici olarak saatlik 30$ ile 100$ arasında gelirler elde edebilir, tamamen uzaktan (remote) çalışıp küresel projelere evinizden imza atabilirsiniz.
                </p>
                <button 
                  onClick={() => { setActiveTab("dersler"); }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white font-mono font-bold text-xs uppercase tracking-widest hover:bg-[#00FF66] hover:text-black transition-colors"
                >
                  PRATİK DERSLERE BAŞLA <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        )}

        {/* ==================== TAB 3: YAPAY ZEKA MENTORU "KADİR HOCA" ==================== */}
        {activeTab === "yapay-zeka-mentor" && (
          <div className="space-y-8">
            
            {/* Header */}
            <div className="border-l-4 border-[#00FF66] pl-6 md:pl-10">
              <span className="text-[#00FF66] font-mono text-xs sm:text-sm font-bold block mb-4 uppercase tracking-[0.3em]">
                MÜSTAKİL SOHBET KANALI
              </span>
              <h1 className="text-[36px] sm:text-[64px] font-display font-black tracking-tighter uppercase leading-none">
                YAPAY ZEKA <br />
                <span className="text-transparent text-stroke-white text-display">MENTORU</span>
              </h1>
              <p className="text-white/60 text-sm sm:text-lg mt-6 max-w-2xl leading-relaxed">
                Yazılım Eğitmeni <b>Kadir Hoca</b> ile baş başa konuşun. Kodlama, hosting, taslaklar, hata ayıklama gibi her konuda konuşabilirsiniz.
              </p>
            </div>

            {/* Chatbot Interface */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              {/* Profile Card Sidebar */}
              <div className="lg:col-span-4 bg-[#111111] border border-white/10 p-6 space-y-6 flex flex-col justify-between">
                
                <div className="space-y-6">
                  
                  {/* Photo mock with custom stylized CSS */}
                  <div className="relative text-center w-full py-6 bg-black border border-white/10">
                    <div className="w-24 h-24 bg-gradient-to-tr from-[#00FF66] to-[#0A0A0A] border-4 border-[#00FF66] inline-flex items-center justify-center text-black text-4xl font-extrabold mb-3 shadow-[0_0_20px_rgba(0,255,102,0.3)] select-none">
                      KH
                    </div>
                    <h3 className="font-display font-black text-lg tracking-tight uppercase text-white">Kadir Hoca</h3>
                    <p className="text-[10px] font-mono text-[#00FF66] uppercase tracking-widest mt-1">Eğitmen / Senior Front-End</p>
                    <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 text-white/50 text-[10px] font-mono uppercase">
                      <span className="h-2 w-2 rounded-full bg-[#00FF66]"></span> Sesli/Yazılı Yanıtlayıcı
                    </div>
                  </div>

                  <div className="space-y-3 font-sans text-xs text-white/60 leading-relaxed">
                    <h4 className="font-mono font-bold text-white uppercase text-xs tracking-wider">KADİR HOCA KİMDİR?</h4>
                    <p>Kendisi 14 yıllık kurumsal front-end mimarlık deneyimine sahip, yeni başlayan dostu, oldukça sıcakkanlı ve metaforlarla öğretmeyi seven bir mentor yapay zekadır.</p>
                    <p className="pt-2"><b>Tavsiye Edilen Konular:</b></p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Hata ayıklama (De-bugging)</li>
                      <li>Domain / Hosting yönlendirmesi</li>
                      <li>CSS Yerleşim Problemleri (Flexbox, Grid)</li>
                      <li>Kariyer hedefleri, Freelance kazanç</li>
                    </ul>
                  </div>

                </div>

                <div className="bg-black p-4 border border-white/10 flex items-center gap-3">
                  <Terminal className="w-5 h-5 text-[#00FF66] flex-shrink-0" />
                  <div className="text-[10px] font-mono text-white/40">
                    Sunucu API: <span className="text-[#00FF66]">AKTİF</span><br />
                    Model: <span className="text-white font-bold">gemini-3.5-flash</span>
                  </div>
                </div>

              </div>

              {/* Chat Box Arena */}
              <div className="lg:col-span-8 bg-[#111111] border border-white/10 flex flex-col h-[600px] overflow-hidden">
                
                {/* Channel Header */}
                <div className="bg-black border-b border-white/10 px-6 py-4 flex justify-between items-center text-xs font-mono">
                  <span className="text-white/60 font-bold tracking-wider uppercase">SOHBET KANALI: #egitmen-kadir-hoca</span>
                  <button 
                    onClick={() => {
                      if (confirm("Sohbet geçmişini silmek istiyor musunuz?")) {
                        setChatMessages([chatMessages[0]]);
                      }
                    }}
                    className="text-red-400 hover:text-red-300 uppercase underline text-[10px]"
                  >
                    TEMİZLE
                  </button>
                </div>

                {/* Messages Panel */}
                <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-black/30">
                  {chatMessages.map((msg) => {
                    const isUser = msg.role === "user";
                    return (
                      <div 
                        key={msg.id} 
                        className={`flex gap-3 max-w-[85%] ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
                      >
                        {/* Avatar identifier */}
                        <div className={`w-8 h-8 rounded-none border flex items-center justify-center text-xs font-bold shrink-0 ${
                          isUser ? 'bg-white text-black border-white' : 'bg-black text-[#00FF66] border-[#00FF66]/30'
                        }`}>
                          {isUser ? "BEN" : "KH"}
                        </div>

                        {/* Speech Bubble */}
                        <div className={`p-4 font-sans text-sm border space-y-2 whitespace-pre-wrap leading-relaxed ${
                          isUser 
                            ? 'bg-[#1e1e1e] border-white/10 text-white' 
                            : 'bg-[#111] border-white/5 text-white/90'
                        }`}>
                          
                          {/* Rich parser mock for code blocks in response */}
                          {msg.text.split("\n").map((line, idx) => {
                            if (line.trim().startsWith("```")) return null;
                            if (line.startsWith("1.") || line.startsWith("2.") || line.startsWith("3.") || line.startsWith("4.")) {
                              return <p key={idx} className="pl-2 border-l-2 border-[#00FF66]/40 text-white/80">{line}</p>;
                            }
                            return <p key={idx}>{line}</p>;
                          })}

                        </div>
                      </div>
                    );
                  })}

                  {/* Loading placeholder */}
                  {isAiLoading && (
                    <div className="flex gap-3 max-w-[80%] mr-auto">
                      <div className="w-8 h-8 bg-black text-[#00FF66] border border-[#00FF66]/30 flex items-center justify-center text-xs font-bold shrink-0 animate-pulse">
                        KH
                      </div>
                      <div className="p-4 bg-[#111] border border-white/5 text-[#00FF66] font-mono text-xs flex items-center gap-2">
                        <span className="w-2 h-2 bg-[#00FF66] inline-block animate-ping rounded-full"></span>
                        Kadir Hoca cevabını klavyeye alıyor...
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Precooked Question Bubbles */}
                <div className="bg-black/40 px-6 py-3 border-t border-white/5 flex flex-wrap gap-2">
                  <span className="text-[10px] text-white/30 font-mono flex items-center uppercase mr-1">TAVSİYELER:</span>
                  {suggestedQuestions.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendChatMessage(s)}
                      disabled={isAiLoading}
                      className="text-[11px] font-sans bg-white/5 border border-white/10 px-3 py-1 hover:border-[#00FF66] hover:bg-white/10 text-white/85 transition-colors disabled:opacity-50"
                    >
                      {s}
                    </button>
                  ))}
                </div>

                {/* Chat Input form */}
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendChatMessage(currentMessage);
                  }}
                  className="bg-black px-6 py-4 border-t border-white/10 flex gap-4"
                >
                  <input
                    type="text"
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    disabled={isAiLoading}
                    placeholder="Kadir Hoca'ya aklınızdaki her soruyu sorun... (örn: 'Vercel neden bedava?', 'HTML de nerede kalmıştım?')"
                    className="flex-1 bg-black/50 border border-white/10 hover:border-white/20 focus:border-[#00FF66] px-4 py-3 text-xs sm:text-sm text-white focus:outline-none placeholder-white/20 font-mono"
                  />
                  <button
                    type="submit"
                    disabled={isAiLoading || !currentMessage.trim()}
                    className="bg-[#00FF66] hover:bg-white text-black font-black uppercase tracking-wider text-xs sm:text-sm px-6 py-3 transition-colors shrink-0 disabled:opacity-50"
                  >
                    GÖNDER
                  </button>
                </form>

              </div>

            </div>

          </div>
        )}

      </main>

      {/* COMPACT BOLD STATUS FOOTER */}
      <footer className="border-t border-white/10 bg-black/95 py-10 mt-20 text-xs text-white/40 font-mono uppercase tracking-widest px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-2 text-center md:text-left">
            <p className="font-bold text-white tracking-widest">WEBCRAFT AKADEMİ PLATFORM ve2.4.0</p>
            <p className="text-white/30">Hassas Kodlama Standartları ve Yapay Zeka Desteğiyle Donatılmıştır.</p>
          </div>
          <div className="flex flex-wrap gap-8 justify-center">
            <span>54,209 Öğrenci Aktif</span>
            <span className="text-[#00FF66]" title="Gelişim sunucunuz aktif">● BULUT SUNUCULARI AKTİF</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

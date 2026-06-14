import React, { useState, useEffect } from "react";
import { Play, RotateCcw, Copy, Check, Code, Sparkles, Plus, Info } from "lucide-react";

interface PlaygroundProps {
  initialCode: string;
}

export default function Playground({ initialCode }: PlaygroundProps) {
  const [code, setCode] = useState(initialCode);
  const [copied, setCopied] = useState(false);

  // Sync with prop when user changes chapters/tutorials
  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    if (confirm("Kod alanını başlangıç koduna sıfırlamak istiyor musunuz?")) {
      setCode(initialCode);
    }
  };

  const insertSnippet = (snippet: string) => {
    setCode((prev) => prev + "\n" + snippet);
  };

  const snippets = {
    button: `<button class="px-6 py-2.5 bg-[#00FF66] text-black font-black uppercase text-xs tracking-wider hover:bg-white transition-all transform duration-150">
  ÖZEL BUTON ⚡
</button>`,
    badge: `<span class="inline-flex items-center px-4 py-1.5 bg-black text-[#00FF66] text-xs font-mono font-bold tracking-widest border border-[#00FF66]/30 uppercase rounded-none">
  SİSTEM ÇEVRİMİÇİ ●
</span>`,
    card: `<div class="p-6 bg-[#161616] rounded-none border border-white/10 shadow-xl max-w-sm">
  <h3 class="font-black text-white text-xl tracking-tight uppercase">BETA KARTI</h3>
  <p class="text-xs text-white/60 mt-2 leading-relaxed font-sans">Bold Typography temasıyla oluşturulmuş, yüksek kontrastlı ve keskin hatlara sahip eğitim örneğidir.</p>
</div>`
  };

  return (
    <div className="bg-[#121212] rounded-none border-2 border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col h-[560px]" id="live-playground">
      {/* Playground Header */}
      <div className="bg-black px-6 py-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 bg-[#00FF66] inline-block"></span>
            <span className="w-3 h-3 bg-white/40 inline-block col-span-2"></span>
          </div>
          <span className="text-xs font-mono font-bold tracking-widest text-[#00FF66] uppercase">KOD DENEY PANELİ (PLAYGROUND)</span>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={copyCode}
            className="p-2 text-white/60 hover:text-[#00FF66] rounded-none hover:bg-white/5 border border-white/5 transition-colors" 
            title="Kodu kopyala"
          >
            {copied ? <Check className="w-4 h-4 text-[#00FF66]" /> : <Copy className="w-4 h-4" />}
          </button>
          <button 
            onClick={handleReset}
            className="p-2 text-white/60 hover:text-red-400 rounded-none hover:bg-white/5 border border-white/5 transition-colors"
            title="Sıfırla"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Editor & Preview Split Panel */}
      <div className="flex-1 flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-white/10 overflow-hidden">
        {/* Code Input */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#0E0E0E]">
          <div className="bg-black px-4 py-2 border-b border-white/10 flex justify-between items-center text-xs">
            <span className="text-white/40 font-mono tracking-wider font-bold">HTML & TAILWIND EDITÖRÜ</span>
            <div className="flex gap-4">
              <button 
                onClick={() => insertSnippet(snippets.button)}
                className="text-white/60 hover:text-[#00FF66] transition-all font-mono text-[11px] uppercase tracking-wider flex items-center gap-1"
              >
                <Plus className="w-3 h-3 text-[#00FF66]" /> +BUTON
              </button>
              <button 
                onClick={() => insertSnippet(snippets.badge)}
                className="text-white/60 hover:text-[#00FF66] transition-all font-mono text-[11px] uppercase tracking-wider flex items-center gap-1"
              >
                <Plus className="w-3 h-3 text-[#00FF66]" /> +ROZET
              </button>
              <button 
                onClick={() => insertSnippet(snippets.card)}
                className="text-white/60 hover:text-[#00FF66] transition-all font-mono text-[11px] uppercase tracking-wider flex items-center gap-1"
              >
                <Plus className="w-3 h-3 text-[#00FF66]" /> +KART
              </button>
            </div>
          </div>
          <div className="flex-1 relative">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="absolute inset-0 w-full h-full p-5 font-mono text-[12px] bg-[#0A0A0A] text-[#00FF66] resize-none outline-none focus:ring-0 leading-relaxed border-0 select-text selection:bg-[#00FF66]/20"
              placeholder="HTML kodlarınızı buraya yazın..."
              spellCheck={false}
            />
          </div>
        </div>

        {/* Live Rendering Display */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#161616]">
          <div className="bg-black px-4 py-2 border-b border-white/10 flex justify-between items-center text-xs">
            <span className="font-bold tracking-widest text-white flex items-center gap-2 font-mono uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#00FF66]" /> CANLI ÖNİZLEME
            </span>
            <span className="text-[10px] bg-[#00FF66]/10 text-[#00FF66] px-2 py-0.5 font-bold uppercase tracking-wider">REAKTİF</span>
          </div>
          
          <div className="flex-1 p-8 overflow-y-auto flex items-center justify-center relative min-h-[220px] bg-[#111111] bg-[radial-gradient(#1e1e1e_1px,transparent_1px)] [background-size:16px_16px]">
            {/* The actual live parsed HTML div. It will render custom elements and Tailwind instantly because Tailwind is globally loaded. */}
            <div 
              className="w-full flex justify-center items-center py-4"
              dangerouslySetInnerHTML={{ __html: code }}
            />
          </div>

          <div className="bg-black/80 px-4 py-2 text-[11px] text-white/50 flex items-center gap-1.5 font-mono tracking-wider uppercase">
            <Info className="w-3.5 h-3.5 text-[#00FF66] flex-shrink-0" />
            <span>YAZDIĞINIZ DEĞİŞİKLİKLER ANINDA GÖRSELLEŞİR</span>
          </div>
        </div>
      </div>
    </div>
  );
}

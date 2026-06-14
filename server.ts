import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware for parsing JSON requests
  app.use(express.json());

  // API endpoints
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  // AI Mentor Chatbot API Endpoint
  app.post("/api/mentor", async (req, res) => {
    try {
      const { history, message } = req.body;
      
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ 
          error: "Gemini API Anahtarı eksik. Lütfen AI Studio Secrets panelinden GEMINI_API_KEY değerini ayarlayın." 
        });
      }

      // Initialize GoogleGenAI SDK as strictly requested in system skill
      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      // Construct history structure according to @google/genai guidelines
      const contents: any[] = [];
      if (history && Array.isArray(history)) {
        for (const item of history) {
          contents.push({
            role: item.role === 'user' ? 'user' : 'model',
            parts: [{ text: item.text }]
          });
        }
      }
      
      contents.push({
        role: 'user',
        parts: [{ text: message }]
      });

      // System instruction sets the persona of an expert web mentor named 'Kadir Hoca'
      const systemInstruction = 
        "Sen 'Kadir Hoca' adında, alanında uzman, oldukça samimi, sabırlı ve teşvik edici bir Senior Front-End ve Web Geliştirme Eğitmenisin. " +
        "Görevin, kullanıcılara adım adım kaliteli web siteleri yapmayı öğretmektir. " +
        "Kullanıcıların web tasarımı, web geliştirme teknolojileri (HTML, CSS, JavaScript, React, Tailwind CSS, Vite vb.), hosting, alan adı, SEO ve " +
        "web dünyasında merak edilen her türlü konudaki (maliyet, kariyer, back-end/front-end ayrımları) sorularını yanıtla. " +
        "Cevaplarını Türkçe ver. Cevapların akıcı, heyecan uyandırıcı ve rehberlik edici olsun. " +
        "Yeni başlayanlar için soyut terimleri somut benzetmelerle açıkla (örneğin: HTML = Binanın karkası/duvarları, CSS = Dış cephe giydirme/boya, JS = Prizler/asansör vb.). " +
        "Kod blokları verdiğinde, satır aralarına sade Türkçe yorumlar koymayı ihmal etme. " +
        "Kullanıcıyı öğrenmeye, merak etmeye ve kendi projelerini tasarlamaya motive et.";

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        }
      });

      res.json({ response: response.text });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ 
        error: error.message || "Yapay zeka yanıtı alınırken bir sorun oluştu." 
      });
    }
  });

  // Hot Module Replacement/Vite middleware for development vs built build
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // SPA routing - all unknown routes serve index.html index
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Web Öğretim Sunucusu çalışıyor: http://localhost:${PORT}`);
  });
}

startServer();

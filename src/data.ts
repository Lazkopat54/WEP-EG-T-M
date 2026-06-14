import { StepCategory, FAQItem } from "./types";

export const TUTORIAL_CATEGORIES: StepCategory[] = [
  {
    id: "tasarim",
    title: "1. Tasarım & Planlama",
    icon: "Compass",
    description: "Kod yazmadan önce sitenizin haritasını çıkarın, renkleri ve duruşu belirleyin.",
    steps: [
      {
        id: "tasarim-1",
        title: "Web Sitenizin Amacını ve Hedef Kitlesini Belirleme",
        shortDesc: "Bir web sitesinin başarısının sırrı, ne için yapıldığını iyi bilmektir.",
        duration: "5 Dk",
        icon: "Target",
        content: `### 🎯 Web Sitenizin Amacı Nedir?

Bir web sitesi yapmaya başlamadan önce kendinize sormanız gereken ilk soru şudur: **\"Ben bu siteyi neden yapıyorum?\"**
*   **Kişisel Portfolyo:** Çalışmalarınızı sergilemek, CV'nizi paylaşmak için.
*   **Blog/İçerik Sitesi:** İlgi alanlarınızdaki bilgileri paylaşmak için.
*   **Kurumsal Site:** Bir işletmeyi tanıtmak ve müşterilere ulaşmak için.
*   **E-Ticaret:** Ürün satmak, güvenli ödeme almak için.

### 👥 Hedef Kitlenizi Tanıyın
Sitenizi ziyaret edecek insanların yaş grubu, internet alışkanlıkları ve beklentileri sitenizin tasarımını doğrudan etkiler. Örneğin:
*   Gençler ve teknoloji meraklıları için **modern, koyu temalı ve animasyonlu** dinamik tasarımlar tercih edilir.
*   Kurumsal müşteriler için **sade, güven veren renklerin (lacivert, beyaz, gri) ağırlıkta olduğu, okunabilirliği yüksek** tasarımlar tercih edilir.

### 📐 Site Haritası (Sitemap) Çıkarma
Sitenizin hangi sayfalardan oluşacağını kağıt üzerinde veya zihin haritası (mindmap) araçlarıyla planlayın.
Genel bir site şablonu şunları içerir:
1.  **Ana Sayfa:** Karşılama, en önemli başlıklar ve hızlı menü.
2.  **Hakkımızda:** Sizi veya markanızı tanıtan profesyonel bir hikaye.
3.  **Hizmetler / Projeler:** Neler yaptığınızı gösteren görseller ve detaylar.
4.  **İletişim:** E-posta, sosyal medya bağlantıları ve harita/iletişim formu.`,
        quiz: {
          question: "Web sitesi koduna başlamadan önce yapılması gereken ilk ve en önemli aşama hangisidir?",
          options: [
            "Domain (Alan adı) satın almak",
            "Sitenin amacını, hedef kitlesini belirlemek ve tasarımını planlamak",
            "Hemen CSS kodları yazmaya başlamak",
            "Hosting sağlayıcısı kiralamak"
          ],
          answerIndex: 1,
          explanation: "Önce planlama yapılmalıdır. Hedef kitleyi ve amacı bilmeden yazılan kodlar veya seçilen tasarımlar ilerleyen aşamalarda büyük değişiklikler gerektirir ve zaman kaybına yol açar."
        }
      },
      {
        id: "tasarim-2",
        title: "Tel Kafes (Wireframe) ve Figma Kullanımı",
        shortDesc: "Tasarımınızı kodlamadan önce dijital bir taslak haline getirin.",
        duration: "8 Dk",
        icon: "Layout",
        content: `### ✏️ Wireframe (Tel Kafes) Nedir?

Wireframe, bir web sayfasının renkler, görseller ve detaylı metinler olmadan, kabataslak yerleşim planıdır. 

Ev yapmadan önce çizilen mimari kroki gibidir. Amaç, elemanların (logo, menü, yazı alanı, görseller) nerede duracağını belirlemektir.
*   **Düşük Detay (Lo-Fi):** Genelde kurşun kalemle bir kağıda çizilen basit kutulardır.
*   **Yüksek Detay (Hi-Fi):** Bilgisayarda, butonların ve alanların gerçek boyutlarında çizildiği taslaklardır.

### 🎨 Figma ile Tanışın
Günümüzde modern web tasarımcılarının ve arayüz geliştiricilerinin vazgeçilmez bulut tabanlı aracı **Figma**'dır. Ücretsizdir ve tarayıcıda çalışabilir.

#### Figma'da Temel Adımlar:
1.  **Frame (Çerçeve) Oluşturun:** Telefon (iPhone/Android) veya Masaüstü (Desktop) ekran boyutu seçin.
2.  **Dikdörtgenler ve Şekiller Çizin:** Grid yerleşim sistemi kurarak menü, banner ve içerik kartları kutularını yerleştirin.
3.  **Metin Alanları Ekleyin:** Hangi fontu ve büyüklüğü kullanacağınıza karar verin.
4.  **Bileşenleştirme (Components):** Bir butonu bir kez tasarlayıp sitenin her yerinde tekrar kullanmak için Figma bileşenlerini kullanın.`,
        quiz: {
          question: "Modern dünyada web tasarımlarını kodlamadan önce UI çizmek için yaygın kullanılan, ücretsiz de olan bulut tabanlı araç hangisidir?",
          options: [
            "MS Paint",
            "Figma",
            "Excel",
            "WordPress"
          ],
          answerIndex: 1,
          explanation: "Figma, günümüzün en popüler kullanıcı arayüzü (UI) ve kullanıcı deneyimi (UX) tasarım aracıdır."
        }
      },
      {
        id: "tasarim-3",
        title: "Renk Teorisi ve Tipografi Seçimi",
        shortDesc: "Sitenizin duygusunu yansıtacak renk paleti ve yazı tiplerini belirleyin.",
        duration: "6 Dk",
        icon: "Palette",
        content: `### 🎨 Web Tasarımda Renklerin Gücü

Renkler kullanıcı üzerinde psikolojik etkilere sahiptir. Sitenizde genelde **3 renk kuralı** uygulanmalıdır:
1.  **Baskın Renk (%60):** Genelde arka planlar; nötr tonlar (beyaz, çok açık gri veya çok koyu gri).
2.  **Yarık Baskın Renk (%30):** Menü alanları, kart arka planları, metin renkleri.
3.  **Vurgu Rengi (%10):** Sadece butonlar, önemli linkler, bildirimler (Canlı turuncu, yeşil veya mavi gibi dikkat çekici tonlar).

| Renk | Sembolize Ettiği Duygu | Sektör Kullanımı |
| :--- | :--- | :--- |
| **Mavi** | Güven, Huzur, Profesyonellik | Finans, Bankacılık, Sağlık, Teknoloji |
| **Yeşil** | Doğa, Sağlık, Para, Tazelik | Organik Tarım, Finans, Çevre Teknolojileri |
| **Siyah / Füme** | Prestij, Lüks, Güç | Saat, Moda, Otomobil, Yazılım Portfolyoları |
| **Turuncu / Sarı** | Canlılık, Enerji, Gençlik | Yiyecek, İndirim Kampanyaları, Eğitim |

### ✍️ Tipografi (Yazı Tipi / Font) Kuralları
Web sitenizdeki yazıların kolay okunması hayati önem taşır.
*   **Okunabilirlik:** Süslemeli el yazısı fontları yerine modern **Sans-Serif** (tırnaksız) fontları tercih edin. (Örnek: *Inter*, *Roboto*, *Open Sans*).
*   **Hiyerarşi (Başlık Büyüklükleri):** Başlıklar (\`<h1>\` - \`<h2>\`) kalın ve büyük olmalı, gövde yazısı daha ince ve okunabilir boyutta (en az 16px) olmalıdır.
*   *Tavsiye:* Sitenizde 2 farklı yazı tipinden fazlasını kullanmayın. Birini Display (başlıklar) için, diğerini ise içerik yazıları için seçebilirsiniz.`,
        quiz: {
          question: "Tipografide gövde metinleri için okunabilirliği en yüksek olan ve web tasarımda en çok tercih edilen font ailesi hangisidir?",
          options: [
            "Sans-Serif (Tırnaksız modern fontlar)",
            "Chancery (Süslü el yazısı)",
            "Courier New (Eski daktilo fontu)",
            "Serif (Çok süslü klasik tırnaklı fontlar)"
          ],
          answerIndex: 0,
          explanation: "Sans-Serif (örneğin Inter), ekran okumalarında gözü en az yoran ve modern web arayüzlerinin temelini oluşturan yazı tipi sınıfıdır."
        }
      }
    ]
  },
  {
    id: "html",
    title: "2. Yapı Taşları: HTML5",
    icon: "Code",
    description: "Sitenizin duvarlarını ve kemiklerini oluşturan HTML etiketlerini öğrenin.",
    steps: [
      {
        id: "html-1",
        title: "HTML Nedir? Etiket Mantığı",
        shortDesc: "HTML, HyperText Markup Language, web sitelerinin iskeletidir.",
        duration: "5 Dk",
        icon: "FileCode",
        content: `### 🦴 HTML Nedir?

HTML bir programlama dili değil, bir **işaretleme (markup) dilidir**. Tarayıcıya (Chrome, Safari, Edge) ekrandaki verilerin başlık mı, paragraf mı, yoksa resim mi olduğunu söyler.

### 🏷️ Etiket (Tag) Mantığı
HTML'de her şey açılış ve kapanış etiketleri arasına yazılır:
\`\`\`html
<etiket_adi>Buraya İçerik Gelecek</etiket_adi>
\`\`\`

Kapanış etiketinin solunda eğik çizgi \`/\` bulunur.

### 🧱 En Sık Kullanılan Temel Etiketler
*   \`<h1>\` - \`<h6>\`: Başlık etiketleri. \`<h1>\` en büyük ve en önemli başlığı temsil ederken (genelde sayfa başlığı), \`<h6>\` en küçüğüdür.
*   \`<p>\`: Paragraf metinleri için kullanılır.
*   \`<a>\`: Başka sayfa veya siteye bağlantı (link) vermek için kullanılır. \`href\` özniteliği ile adres belirtilir.
*   \`<img>\`: Görsel/resim eklemek için kullanılır. Kapanış etiketi olmayan tekil bir etikettir. \`src\` özniteliği ile resmin yolu belirtilir.
*   \`<div>\`: İçerikleri gruplamak, kutulamak ve hizalamak için kullanılan en temel taşıyıcı yapıdır.

Örneğimizi hemen yandaki **Kod Deney Alanı** sekmesine geçerek özgürce değiştirebilir, saniyeler içinde ekrandaki değişimi izleyebilirsiniz!`,
        sampleCode: `<div class="p-6 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-xl shadow-lg text-center font-sans max-w-sm mx-auto">
  <h1 class="text-3xl font-extrabold mb-2">Merhaba Dünya! 🚀</h1>
  <p class="text-md opacity-90 mb-4">Bu benim ilk interaktif web sitem. HTML ile yapıyı kurdum, Tailwind sınıfları ile renklendirdim.</p>
  <a href="#" class="inline-block px-6 py-2 bg-white text-teal-600 font-semibold rounded-lg hover:bg-neutral-100 transition shadow">
    Bana Tıkla!
  </a>
</div>`,
        sampleCodeLanguage: "html",
        quiz: {
          question: "Bir web sayfasında tıklandığında başka bir sayfaya gitmesini sağlayan link (bağlantı) etiketi hangisidir?",
          options: [
            "<span>",
            "<a>",
            "<link>",
            "<img>"
          ],
          answerIndex: 1,
          explanation: "<a> etiketi (anchor), web sayfaları arasında köprüler kurmaya yarayan en temel HTML bağlantı etiketidir."
        }
      },
      {
        id: "html-2",
        title: "HTML Klasik Sayfa Yapısı",
        shortDesc: "Bir web sayfasının arka planda tarayıcıya kendini tanıtan temel şablonu.",
        duration: "6 Dk",
        icon: "BookOpen",
        content: `### 📄 Standart Bir HTML Dosyası Nasıl Görünür?

Her standart HTML dosyası (\`index.html\`) belirli bir hiyerarşik düzene uymak zorundadır. Tarayıcı dosyayı yukarıdan aşağıya doğru okur.

Şablon şudur:
\`\`\`html
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Benim Harika Sitem</title>
</head>
<body>
    <h1>Siteme Hoş Geldiniz!</h1>
    <p>Bu alan ziyaretçilerin gördüğü ana içerik alanıdır.</p>
</body>
</html>
\`\`\`

### 🗺️ Bölüm Açıklamaları
1.  **\`<!DOCTYPE html>\`**: Tarayıcıya bu dosyanın modern **HTML5** standardında olduğunu bildirir.
2.  **\`<html>\`**: Tüm sayfa kodunun içinde yer aldığı ana dış kaplamadır. \`lang=\"tr\"\` sitenin dilinin Türkçe olduğunu belirtir.
3.  **\`<head>\`**: Ziyaretçilerin doğrudan sayfada görmediği, ancak tarayıcı ve Google için kritik ayarların (meta etiketleri, başlık, CSS dosyaları) yer aldığı kısımdır.
4.  **\`<title>\`**: Tarayıcı sekmesinde görünen site adıdır.
5.  **\`<body>\`**: Sitenin ekranda görünen, renklenen, tıklanan tüm canlı içeriğini barındıran gövde kısmıdır.`,
        sampleCode: `<div class="bg-slate-900 text-slate-100 p-8 rounded-xl shadow-xl font-mono max-w-md mx-auto">
  <h2 class="text-xl text-yellow-400 font-bold mb-4">&lt;index.html&gt; Şablonu</h2>
  <div class="border-l-2 border-yellow-500 pl-4 space-y-2 text-sm">
    <p class="text-gray-400">&lt;!DOCTYPE html&gt;</p>
    <p class="text-blue-400">&lt;html lang="tr"&gt;</p>
    <p class="text-purple-400 ml-4">&lt;head&gt; <span class="text-gray-500">// Ayarlar, başlık</span></p>
    <p class="text-purple-400 ml-4">&lt;/head&gt;</p>
    <p class="text-green-400 ml-4">&lt;body&gt; <span class="text-gray-500">// Gövde içerikleri</span></p>
    <p class="text-white ml-8">&lt;h1&gt;İlk Sitem!&lt;/h1&gt;</p>
    <p class="text-green-400 ml-4">&lt;/body&gt;</p>
    <p class="text-blue-400">&lt;/html&gt;</p>
  </div>
</div>`,
        sampleCodeLanguage: "html",
        quiz: {
          question: "Kullanıcıların tarayıcı ekranında gördüğü tüm görsel elemanlar (resimler, butonlar, yazılar) hangi iki etiket arasına yazılır?",
          options: [
            "<head> ... </head>",
            "<title> ... </title>",
            "<body> ... </body>",
            "<!DOCTYPE html>"
          ],
          answerIndex: 2,
          explanation: "<body> etiketleri, kullanıcının doğrudan görebildiği ve etkileşime geçebildiği tüm elemanları barındırır."
        }
      }
    ]
  },
  {
    id: "css",
    title: "3. Stil & Görsellik: CSS3",
    icon: "Palette",
    description: "Sitenize stil, renk ve modern yerleşim standartları (Glow, Flexbox) kazandırın.",
    steps: [
      {
        id: "css-1",
        title: "CSS Nedir? Renk ve Boyutlandırma",
        shortDesc: "CSS (Cascading Style Sheets) web sitenizin kıyafeti, makyajı ve tarzıdır.",
        duration: "6 Dk",
        icon: "Sliders",
        content: `### 💅 CSS Nedir?

HTML ile sayfanın kemiklerini oluşturduk. Ancak sitenin siyah-beyaz, düz ve eski görünmesini istemeyiz. **CSS**, bu kemiklere et, deri, kıyafet ve renk giydirmektir.

### 🧩 CSS Seçici ve Süslü Parantez Düzeni
Bir HTML elemanına stil vermek için önce onu CSS dosyasında seçer, ardından süslü parantezler içinde özelliklerini belirleriz:
\`\`\`css
h1 {
    color: #3b82f6;      /* Mavi renk */
    font-size: 24px;     /* Yazı boyutu */
    margin-bottom: 10px; /* Alttan boşluk */
}
\`\`\`

### 🗺️ Box Model (Kutu Modeli)
CSS'te her eleman aslında görünmez bir kutudur. Bu kutu 4 katmandan oluşur:
1.  **Content (İçerik):** Yazının veya resmin kendisi.
2.  **Padding (İç Boşluk):** İçeriğin kendi kenarlıklarıyla olan mesafesi.
3.  **Border (Kenarlık):** Kutunun dış çerçevesi.
4.  **Margin (Dış Boşluk):** Kutunun diğer elementlerle olan dış mesafesi.

### 💨 Tailwind CSS ile Devrim
Günümüzde profesyoneller harici dev CSS dosyaları yazmak yerine **Tailwind CSS** gibi yardımcı kütüphaneler kullanır. Sadece HTML etiketine pratik sınıflar yazarak stil veririz. 

Sağdaki kod deney alanında bunun gücünü görelim!`,
        sampleCode: `<div class="bg-white text-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 max-w-sm mx-auto">
  <div class="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 animate-bounce">
    CSS
  </div>
  <h3 class="text-lg font-bold text-gray-900 mb-1">Kutu Modeli Deneyimi</h3>
  <p class="text-sm text-gray-500 mb-4">Padding ve Margin kutuyu genişletir veya iter. Renkler ise duygu hissettirir.</p>
  <button class="w-full py-2 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition">
    Uygula
  </button>
</div>`,
        sampleCodeLanguage: "html",
        quiz: {
          question: "Kutunun kendi kenarlığı ile içindeki içerik (yazı/resim) arasındaki iç boşluğu ayarlayan CSS özelliği hangisidir?",
          options: [
            "margin",
            "padding",
            "border",
            "font-size"
          ],
          answerIndex: 1,
          explanation: "padding, elemanın iç boşluğudur. margin ise diğer elemenlarla arasındaki dış boşluğu kontrol eder."
        }
      },
      {
        id: "css-2",
        title: "Responsive Tasarım (Mobil Uyumluluk)",
        shortDesc: "Sitenizin hem büyük ekranlarda hem de cep telefonlarında harika görünmesini sağlayın.",
        duration: "7 Dk",
        icon: "Smartphone",
        content: `### 📱 Mobil Uyumluluk (Responsive) Neden Kritik?

İnternet trafiğinin **%60'tan fazlası** mobil cihazlar üzerinden gerçekleşmektedir. Telefon ekranında düzgün açılmayan, yazıları okunmayan bir siteyi ziyaretçiler hemen terk eder.

### ⚙️ Viewport Meta Etiketi
Giriş seviyesinde yapılan en büyük hata, mobil ölçeklemeyi unutmaktır. HTML dosyasının \`<head>\` kısmında şu meta etiketi mutlaka olmalıdır:
\`\`\`html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
\`\`\`
Bu etiket, sitenin telefon ekran genişliğine göre otomatik yakınlaştırılmasını/ölçeklenmesini sağlar.

### 📐 Media Queries (Medya Sorguları) ve Tailwind Breakpoints
Farklı ekran genişliklerine göre özel CSS uygulamak için kullanılan kurallardır. 
Modern Tailwind CSS kütüphanesinde bu işlem çok kolaydır:
*   \`w-full\`: Mobilde tam genişlik.
*   \`md:w-1/2\`: Tablet ve masaüstünde (orta boy ve üzeri ekranlarda) yarı yarıya genişlik.
*   \`lg:grid-cols-3\`: Geniş ekranlarda içerikleri yan yana 3 kolon halinde listele.

Hemen sağdaki kod panelinde **Responsive kolon** örneğimizi inceleyin. Ekranı küçültüp büyüterek değişimi görebilirsiniz!`,
        sampleCode: `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-2xl mx-auto p-4 bg-gray-50 rounded-xl">
  <div class="bg-white p-4 rounded-lg shadow-sm text-center border border-gray-100">
    <h4 class="font-bold text-teal-600">Kart 1</h4>
    <p class="text-xs text-gray-500 mt-2">Geniş ekranda yan yanayız, telefonda alt alta!</p>
  </div>
  <div class="bg-white p-4 rounded-lg shadow-sm text-center border border-gray-100">
    <h4 class="font-bold text-teal-600">Kart 2</h4>
    <p class="text-xs text-gray-500 mt-2">Grid sistemi ile yerleşim tasarımı çok pratiktir.</p>
  </div>
  <div class="bg-white p-4 rounded-lg shadow-sm text-center border border-gray-100">
    <h4 class="font-bold text-teal-600">Kart 3</h4>
    <p class="text-xs text-gray-500 mt-2">Ölçeklenebilir yapılar oluşturun.</p>
  </div>
</div>`,
        sampleCodeLanguage: "html",
        quiz: {
          question: "Web tasarımda, sitenin cep telefonlarında düzgün ölçeklenerek açılmasını başlatan kritik meta etiketi hangisidir?",
          options: [
            "<meta charset='utf-8'>",
            "<meta name='viewport' content='width=device-width, initial-scale=1.0'>",
            "<meta name='description'>",
            "<title>Mobil</title>"
          ],
          answerIndex: 1,
          explanation: "viewport meta etiketi, mobil tarayıcılara sitenin fiziksel piksellerini ekrana nasıl sığdıracaklarını söyleyen baş ucu ayarıdır."
        }
      }
    ]
  },
  {
    id: "js",
    title: "4. Dinamik Yapı & React",
    icon: "Cpu",
    description: "Sitenize tıklama eylemleri, hesaplamalar ve modern bileşen yapıları entegre edin.",
    steps: [
      {
        id: "js-1",
        title: "JavaScript ile Canlandırma (Tıklama, Sayıcılar)",
        shortDesc: "Javascript sitenizin beyni ve kas sistemidir. Etkileşimi yönetir.",
        duration: "7 Dk",
        icon: "Workflow",
        content: `### 🧠 JavaScript Nedir?

HTML ile yapıyı kurduk, CSS ile süsledik. Peki ama kullanıcı bir butona tıkladığında bir sayaç artsın istiyorsak, bir açılır menünün açılmasını istiyorsak ne yapacağız? İşte burada devreye bir programlama dili olan **JavaScript (JS)** girer.

JS, web tarayıcısının içinde çalışan, elemanları dinamik olarak hareket ettirebilen, API'lardan veri çekebilen harika bir dildir.

### 🕹️ DOM Manipülasyonu Nedir?
DOM (Document Object Model), HTML etiketlerinin JavaScript tarafından okunup değiştirilebilecek bir nesne ağacına dönüştürülmüş halidir.
JS ile şunları yapabiliriz:
*   Bir etiketin metnini değiştirmek:
    \`\`\`javascript
    document.getElementById("baslik").innerText = "Yeni Başlık!";
    \`\`\`
*   Kullanıcı tıklamasını dinlemek:
    \`\`\`javascript
    button.addEventListener("click", () => {
        alert("Butona Tıklandı! 🎉");
    });
    \`\`\`

### 🤝 Modern Çağda JavaScript ve Framework'ler
Büyük sitelerde doğrudan saf JavaScript (Vanilla JS) ile tek tek eleman seçmek karmaşıklaşır. Bu yüzden günümüzde dünya genelinde **React** adı verilen kütüphaneyle projeler çok daha hızlı ve güvenli üretilmektedir.`,
        sampleCode: `<div class="p-6 bg-slate-900 border border-slate-800 text-white rounded-2xl text-center max-w-sm mx-auto shadow-2xl font-sans">
  <div class="text-4xl font-extrabold text-indigo-400 mb-2" id="counter">0</div>
  <p class="text-sm text-gray-400 mb-4">Butonlara tıklayarak HTML sayfasının durumunu değiştirelim!</p>
  <div class="flex justify-center gap-3">
    <!-- Inline JavaScript simülasyonu -->
    <button onclick="document.getElementById('counter').innerText = parseInt(document.getElementById('counter').innerText) - 1" class="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-lg transition border border-slate-700">
      Azalt -
    </button>
    <button onclick="document.getElementById('counter').innerText = parseInt(document.getElementById('counter').innerText) + 1" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition shadow">
      Arttır +
    </button>
  </div>
</div>`,
        sampleCodeLanguage: "html",
        quiz: {
          question: "Web sayfalarına etkileşim, dinamik animasyonlar ve olay dinleme (click vb.) kazandırmak için tarayıcıda koşan dil hangisidir?",
          options: [
            "HTML",
            "Python",
            "CSS",
            "JavaScript"
          ],
          answerIndex: 3,
          explanation: "JavaScript tarayıcının yerel dilidir. Web sayfasının her türlü dinamik hareketini kontrol eder."
        }
      }
    ]
  },
  {
    id: "yayin",
    title: "5. Hosting & Dünyaya Açılma",
    icon: "Globe",
    description: "Sitenizi ücretsiz bulut sunucularına yükleyerek tüm insanlığın erişimine açın.",
    steps: [
      {
        id: "yayin-1",
        title: "Alan Adı (Domain) ve Sunucu (Hosting) Nedir?",
        shortDesc: "Sitenizin adresi (Alan Adı) ve barındırılacağı bilgisayar (Hosting) kavramları.",
        duration: "6 Dk",
        icon: "Server",
        content: `### 🌐 Sitenizi İnternete Nasıl Yüklersiniz?

Kodlarınızı kendi bilgisayarınızda yazdınız ve tarayıcıda açtığınızda her şey harika görünüyor. Ama başkalarının da sitenize girmesi için site kodlarının 24 saat açık ve internete bağlı bir sunucuda durması gerekir.

Bu aşamada karşımıza iki temel kavram çıkar:

### 1. Alan Adı (Domain)
Web sitenizin internetteki akılda kalıcı ismidir. (Örnek: \`google.com\`, \`yazilimokulu.com\`).
*   Domain'ler aslında arka plandaki karmaşık IP adreslerini (Örn: \`185.22.41.9\`) maskeleyen kolay adreslerdir.
*   Yıllık olarak kiralanırlar (Genelde 10$ - 15$ civarıdır).
*   En popüler uzantı \`.com\`dur.

### 2. Sunucu / Barındırma (Hosting)
Sitenizin HTML, CSS, resim ve veri dosyalarının saklandığı, 7/24 kesintisiz elektrik ve yüksek hızlı internete sahip, dünyanın bir ucundaki güçlü bilgisayarlardır.
*   **Paylaşımlı Hosting:** Küçük siteler için ucuz ve kolay bir çözümdür. Bir bilgisayarı yüzlerce site paylaşır.
*   **Bulut Barındırma (Cloud Hosting):** Sitenizin kaynaklarını esnekçe arttırabildiğiniz modern mimaridir.`,
        quiz: {
          question: "Web sitenizin harflere dökülmüş akılda kalıcı internet adresine (Örn: sahibinden.com) genel olarak ne ad verilir?",
          options: [
            "Domain (Alan Adı)",
            "Hosting (Barındırma)",
            "SSL Sertifikası",
            "IP Protokolü"
          ],
          answerIndex: 0,
          explanation: "Domain (Alan Adı), sitenizin insan dostu adres kartıdır."
        }
      },
      {
        id: "yayin-2",
        title: "Ücretsiz Modern Yayınlama Araçları (Vercel, Netlify)",
        shortDesc: "Artık sunuculara para ödemek zorunda değilsiniz. Modern araçlarla 1 dakikada yayına alın.",
        duration: "5 Dk",
        icon: "Rocket",
        content: `### 🚀 Sunucu Masraflarına Son: Modern Bulut Yayıncıları

Geçmişte web sitelerini yayınlamak için FTP programları kullanılırdı ve sunuculara her ay ciddi ücretler ödenirdi. Günümüzde statik (HTML/CSS/JS/React) web sitelerini barındırmak **tamamen ücretsizdir**!

### 🌟 En Popüler Ücretsiz Yayınlama Platformları

1.  **Vercel:** Özellikle React, Vite ve Next.js projeleri için optimize edilmiş, dünya lideri ücretsiz barındırma servisidir. GitHub kütüphanenizi bağladığınızda, kodda yaptığınız her değişiklik otomatik olarak sitenize yansır.
2.  **Netlify:** Çok popüler bir alternatif. Dosyaları sürükle-bırak yöntemiyle bile 10 saniyede yayına almanıza izin verir.
3.  **GitHub Pages:** Tamamen ücretsiz. GitHub depolarınızdaki kodları doğrudan yayına alan emektar sistemdir.

### Vercel ile Yayınlama Adımları (Adım Adım):
1.  **Vercel.com**'da ücretsiz bir hesap açın (GitHub ile giriş yapın).
2.  **\"Add New Project\"** butonuna basın.
3.  Yazmış olduğunuz projenin GitHub klasörünü seçin.
4.  **\"Deploy\"** butonuna tıklayın.
5.  *Tebrikler!* 30 saniye sonra size özel \`projeniz.vercel.app\` url'iniz hazır olacaktır.`,
        quiz: {
          question: "GitHub bağlantısı kurarak veya klasörümüzü sürükleyip bırakarak web projemizi saniyeler içinde ücretsiz yayına almamızı sağlayan popüler bulut servisleri hangileridir?",
          options: [
            "Vercel & Netlify",
            "Photoshop",
            "Docker Desktop",
            "Visual Studio 2012"
          ],
          answerIndex: 0,
          explanation: "Vercel ve Netlify, modern web geliştiricilerinin projelerini sıfır maliyetle saniyeler içinde bütün dünyaya paylaştığı lider sistemlerdir."
        }
      }
    ]
  }
];

export const GENERAL_FAQS: FAQItem[] = [
  {
    category: "genel",
    question: "Sıfırdan bir web sitesi yapmak ne kadar sürer?",
    answer: "Bu tamamen sitenizin karmaşıklığına bağlıdır. Sadece HTML ve CSS kullanarak tek sayfalık şık bir özgeçmiş (CV) sitesini **yaklaşık 1-2 günde** bitirebilirsiniz. Ancak veri tabanı, üyelik sistemi ve ödeme altyapısı barındıran tam teşekküllü bir e-ticaret portalı tasarlayıp kodlamak, tecrübeli bir yazılımcı için bile **2 ila 6 hafta** sürebilir.",
    curiosityLevel: "Temel"
  },
  {
    category: "maliyet",
    question: "Tamamen ücretsiz bir web sitesi kurulabilir mi?",
    answer: "Evet, kurulabilir! Kodlama bilginiz varsa HTML, CSS ve React projelerinizi **Vercel, Netlify veya GitHub Pages** gibi modern platformlarda ömür boyu **tamamen ücretsiz** olarak barındırabilirsiniz. Size ücretsiz olarak `.vercel.app` veya `.netlify.app` uzantılı bir adres verirler. Yalnızca profesyonel bir alan adı (örneğin kendinize özel `.com`lu bir isim) isterseniz yıllık ortalama 10$-15$ alan adı ücreti ödemeniz gerekir.",
    curiosityLevel: "Yüksek"
  },
  {
    category: "teknoloji",
    question: "WordPress mi kullanmalıyım yoksa kendim mi kodlamalıyım?",
    answer: "Eğer amacınız hızlıca standart bir dijital broşür, otel rezervasyon sitesi ya da e-ticaret mağazası oluşturmaksa ve kod yazmakla vakit kaybetmek istemiyorsanız, **WordPress veya Webflow** gibi hazır içerik yönetim sistemleri harika tercihlerdir. Ancak performansın çok kritik olduğu, özelleştirilmiş mobil deneyimlerin gerektiği veya benzersiz bir yazılım projesi geliştirmek istediğiniz durumlarda (SaaS projeleri vb.) **React ve özel kodlama** kullanmak her zaman en doğru ve en prestijli yoldur.",
    curiosityLevel: "Orta"
  },
  {
    category: "kariyer",
    question: "Front-end ve Back-end geliştirici farkı nedir?",
    answer: "Web geliştirme iki ana kola ayrılır:\n\n*   **Front-end (Ön Yüz Geliştirici):** Kullanıcının web sitesine girdiğinde gözüyle gördüğü, tıkladığı, animasyonları izlediği her şeyi kodlar. HTML, CSS, JavaScript ve React bu alanın araçlarıdır.\n*   **Back-end (Arka Yüz Geliştirici):** Sitenin arka bahçesidir. Kullanıcı girişleri, güvenlik, veri tabanı sorguları, sipariş kayıtları buralarda işlenir. Sunucuda çalışır; Node.js, Python, PHP veya SQL gibi diller kullanılır.\n\nHer iki alanı da profesyonelce yapabilen kişilere ise **Full-Stack Geliştirici** denir.",
    curiosityLevel: "Yüksek"
  },
  {
    category: "teknoloji",
    question: "Web siteleri Google aramalarında üst sıralara nasıl çıkartılır? (SEO Nedir?)",
    answer: "SEO (Search Engine Optimization - Arama Motoru Optimizasyonu), web sitenizin Google robotları tarafından kolay taranmasını sağlayan kurallar bütünüdür. Üst sıralara çıkmak için:\n\n1.  **Başlık ve Meta Etiketleri:** Sayfanızın `<head>` kısmında sayfa açıklamasını (`<meta name=\"description\">`) ve anahtar kelimeleri doğru kodlamalısınız.\n2.  **Mobil Uyum:** Sitenin cep telefonlarında kusursuz açılması şarttır.\n3.  **Performans (Hız):** Resimleri sıkıştırarak sitenin 2 saniyenin altında açılmasını sağlamalısınız.\n4.  **Anlamsal HTML (Semantic tags):** Sadece `<div>` kullanmak yerine başlıkları `<h1>`, makaleleri `<article>`, menüleri `<nav>` içinde sarmallamalısınız.",
    curiosityLevel: "Orta"
  },
  {
    category: "maliyet",
    question: "Başkasına yaptırdığımda bir web sitesinin piyasa değeri nedir?",
    answer: "Piyasa fiyatları yapılacak işin kapsamına göre çok değişkendir. 2026 yılı piyasa standartlarına göre:\n\n*   Basit bir **esnaf/tanıtım sitesi**: 15.000 TL - 35.000 TL arası,\n*   Gelişmiş bir **özgün kurumsal kimlik arayüzü**: 40.000 TL - 90.000 TL arası,\n*   Özel entegrasyonlu ve ödemeli **E-Ticaret siteleri**: 80.000 TL - 250.000 TL ve yukarısı bütçeler gerektirebilir. Kendiniz kodlamayı öğrenerek bu bütçeleri tamamen kendinize saklayabilir ya da bu sektöre girip iyi gelirler kazanabilirsiniz.",
    curiosityLevel: "Yüksek"
  }
];

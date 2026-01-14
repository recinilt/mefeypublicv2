# 🎬 VR SOSYAL SİNEMA - ULTIMATE VERSİYON v4.0

## 🚀 YENİ ÖZELLİKLER

### 1️⃣ **Çok Formatlı Video Desteği**
Desteklenen formatlar:
- **Video:** MP4, WebM, OGG, MOV, AVI, MKV, M4V, FLV, 3GP, WMV
- **Platform:** YouTube, Google Drive, Vimeo, Dailymotion, Catbox, Bunny CDN
- Direkt video linkleri

### 2️⃣ **Altyazı Desteği**
- **SRT** - SubRip Text (.srt)
- **VTT** - WebVTT (.vtt)
- **ASS** - Advanced SubStation Alpha (.ass)
- **SSA** - SubStation Alpha (.ssa)
- **SUB** - MicroDVD (.sub)

Altyazı otomatik senkronize edilir ve video ile birlikte görünür.

### 3️⃣ **VR'da Kontrol Paneli**
**Sol tarafta** sabit duran kontrol paneli:
- **Ekran Hareketi:** ↑↓←→ (Yukarı/Aşağı/Sol/Sağ)
- **Ekran Mesafesi:** +/- (İleri/Geri)
- **Sıfırla:** ⟲ butonu
- **Video Kontrolleri:** ⏮ ⏯ ⏹ ⏭
- **Seek Bar:** Video ilerlemesi ve zaman gösterimi

### 4️⃣ **YouTube Entegrasyonu**
- YouTube'da arama yapma
- Video bilgilerini çekme (başlık, süre, kanal)
- Direkt YouTube videoları oynatma
- YouTube API desteği

### 5️⃣ **Google Drive Desteği**
- Google Drive'dan direkt video oynatma
- Dosya bilgilerini çekme
- Stream desteği
- API entegrasyonu

---

## 📁 DOSYA YAPISI

```
vr-cinema-ultimate/
├── index.html
├── css/
│   └── styles.css
└── js/
    ├── 1-config.js          # API keys burada
    ├── 2-globals.js
    ├── 3-ui-functions.js
    ├── 4-video-detection.js
    ├── 5-room-management.js
    ├── 6-video-setup.js
    ├── 7-video-controls.js
    ├── 8-firebase-sync.js
    ├── 10-subtitle-system.js    # YENİ: Altyazı
    ├── 11-vr-ui-panel.js        # YENİ: VR Kontrol Paneli
    ├── 12-youtube-gdrive-api.js # YENİ: API Entegrasyonu
    └── 13-init.js
```

---

## 🔑 API KEY KURULUMU

### 1. YouTube API Key (Opsiyonel)

**Adımlar:**
1. https://console.cloud.google.com/ adresine git
2. Yeni proje oluştur veya mevcut projeyi seç
3. "APIs & Services" → "Library"
4. "YouTube Data API v3" ara ve etkinleştir
5. "Credentials" → "Create Credentials" → "API Key"
6. API Key'i kopyala

**js/1-config.js** dosyasını aç:
```javascript
const API_KEYS = {
    YOUTUBE_API_KEY: "BURAYA_YOUTUBE_API_KEY_YAPISTIR",
    GOOGLE_DRIVE_API_KEY: "YOUR_GOOGLE_DRIVE_API_KEY_HERE"
};
```

### 2. Google Drive API Key (Opsiyonel)

**Adımlar:**
1. Aynı Google Cloud Console'da
2. "APIs & Services" → "Library"
3. "Google Drive API" ara ve etkinleştir
4. "Credentials" → "Create Credentials" → "API Key"
5. API Key'i kopyala

**js/1-config.js** dosyasını aç:
```javascript
const API_KEYS = {
    YOUTUBE_API_KEY: "YOUR_YOUTUBE_API_KEY_HERE",
    GOOGLE_DRIVE_API_KEY: "BURAYA_GDRIVE_API_KEY_YAPISTIR"
};
```

**NOT:** API keyler olmadan da çalışır, ancak YouTube arama ve gelişmiş özellikler çalışmaz.

---

## 🎮 KLAVYE KISAYOLLARI

| Tuş | Fonksiyon |
|-----|-----------|
| **Space** | ⏯ Oynat/Duraklat |
| **←** | ⏪ 10 saniye geri |
| **→** | ⏩ 10 saniye ileri |
| **↑** veya **W** | Ekranı yukarı taşı |
| **↓** veya **S** | Ekranı aşağı taşı |
| **A** | Ekranı sola taşı |
| **D** | Ekranı sağa taşı |
| **Q** | Ekranı geriye çek |
| **E** | Ekranı öne getir |
| **R** | Ekran pozisyonunu sıfırla |
| **C** | Altyazı aç/kapa |
| **M** | Sessiz aç/kapa |
| **F** | Tam ekran |

---

## 🎯 KULLANIM ÖRNEKLERİ

### YouTube Video
```
URL: https://www.youtube.com/watch?v=dQw4w9WgXcQ
Altyazı: https://example.com/subtitle.srt
```

### Google Drive Video
```
URL: https://drive.google.com/file/d/1ABCxyz123/view
Altyazı: https://example.com/subtitle.vtt
```

### Direkt MP4
```
URL: https://files.catbox.moe/abc123.mp4
Altyazı: https://files.catbox.moe/subtitle.srt
```

---

## 🎭 VR KONTROL PANELİ KULLANIMI

### VR Modunda:
1. **VR'a gir** (VR gözlük butonu)
2. **Sol tarafına bak** - Kontrol paneli görünür
3. **VR kumandası** ile ışınla
4. **Trigger** (tetik) ile tıkla

### Butonlar:
- **↑↓←→** - Ekranı hareket ettir
- **+/-** - Ekranı yaklaştır/uzaklaştır
- **⟲** - Pozisyonu sıfırla
- **⏮ ⏯ ⏹ ⏭** - Video kontrolleri
- **Seek Bar** - Video ilerlemesi

---

## 📝 ALTYAZI KULLANIMI

### 1. Altyazı Dosyası Hazırlama
**SRT Örneği:**
```
1
00:00:01,000 --> 00:00:04,000
İlk altyazı metni

2
00:00:05,000 --> 00:00:08,000
İkinci altyazı metni
```

### 2. Altyazı Yükleme
1. Altyazı dosyasını bir yere upload edin (Catbox, Google Drive, vb.)
2. Oda oluştururken "Altyazı URL" kısmına linki yapıştırın
3. Altyazı otomatik yüklenecek

### 3. Altyazı Kontrolleri
- **C tuşu:** Altyazıyı aç/kapa
- Altyazı video ile otomatik senkronize

---

## 🔧 SORUN GİDERME

### Video Oynatılmıyor
1. URL'nin doğru olduğundan emin olun
2. Video formatının desteklendiğini kontrol edin
3. CORS hatası varsa Catbox veya Bunny CDN kullanın

### Altyazı Görünmüyor
1. Altyazı URL'sinin doğru olduğundan emin olun
2. Dosya formatını kontrol edin (SRT, VTT, ASS, SSA)
3. CORS hatası varsa dosyayı Catbox'a yükleyin
4. **C** tuşuna basarak altyazının açık olduğundan emin olun

### YouTube Arama Çalışmıyor
1. `js/1-config.js` dosyasında API key'i kontrol edin
2. YouTube Data API v3'ün etkin olduğundan emin olun
3. API quota limitini kontrol edin

### Google Drive Video Oynatılmıyor
1. Drive linkinin "Anyone with the link can view" olduğundan emin olun
2. Video boyutunu kontrol edin (çok büyük dosyalar yavaş olabilir)
3. Drive API key'i ekleyin (opsiyonel, gelişmiş özellikler için)

### VR Kontrol Paneli Görünmüyor
1. VR moduna girdiğinizden emin olun
2. Sol tarafınıza bakın
3. Tarayıcıda VR desteği olduğunu kontrol edin

---

## 📊 PERFORMANS

Bu versiyon optimize edilmiş v3.0 üzerine kurulmuştur:
- ✅ Periyodik Firebase update yok
- ✅ Sadece 5 hafif ortam
- ✅ Throttling/Debouncing aktif
- ✅ Ortam dispose mekanizması

**Beklenen FPS:** 55-60

---

## 🎬 ÖNCEKİ VERSİYONDAN FARKLAR

| Özellik | v3.0 (Optimized) | v4.0 (Ultimate) |
|---------|-----------------|-----------------|
| Video Formatları | MP4, WebM, OGG | 10+ format |
| Altyazı | ❌ | ✅ 5 format |
| VR Kontrol Paneli | ❌ | ✅ Sol tarafta |
| Ekran Hareketi | ❌ | ✅ 6 yön |
| YouTube API | ❌ | ✅ Arama & Bilgi |
| Google Drive | ❌ | ✅ Stream |
| Klavye Kısayolları | 6 | 14 |
| JS Dosyası | 9 | 13 |

---

## 🚀 KURULUM

1. Tüm dosyaları web sunucusuna yükleyin
2. **js/1-config.js** dosyasında API keys'i güncelleyin (opsiyonel)
3. **index.html** dosyasını açın
4. Oda oluşturun ve keyfini çıkarın!

---

## 📞 DESTEK

Sorun yaşarsanız:
1. Tarayıcı konsolunu kontrol edin (F12)
2. Firebase rules'un güncel olduğundan emin olun
3. API keys'in doğru girildiğini kontrol edin

---

**Versiyon:** 4.0 (Ultimate)  
**Tarih:** 14 Ocak 2026  
**Durum:** ✅ Production Ready  
**Özellikler:** 🎥 Çok Format | 📝 Altyazı | 🎮 VR Kontrol | 📺 YouTube/Drive

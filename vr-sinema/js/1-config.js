// ============================================
// API YAPILANDIRMASI - SEN DOLDURACAKSIN
// ============================================
const API_KEYS = {
    // YouTube Data API v3
    // Nasıl alınır: https://console.cloud.google.com
    // 1. Yeni proje oluştur
    // 2. YouTube Data API v3'ü etkinleştir
    // 3. Credentials → API Key oluştur
    YOUTUBE: 'BURAYA_YOUTUBE_API_KEY_GELECEK',
    
    // Google Drive API v3
    // Aynı projede Drive API'yi etkinleştir
    GOOGLE_DRIVE: 'BURAYA_GOOGLE_DRIVE_API_KEY_GELECEK'
};

// API Key kontrolü
function checkAPIKeys() {
    const warnings = [];
    
    if (API_KEYS.YOUTUBE === 'BURAYA_YOUTUBE_API_KEY_GELECEK') {
        warnings.push('YouTube API Key eksik - YouTube videoları çalışmayabilir');
    }
    
    if (API_KEYS.GOOGLE_DRIVE === 'BURAYA_GOOGLE_DRIVE_API_KEY_GELECEK') {
        warnings.push('Google Drive API Key eksik - Google Drive videoları çalışmayabilir');
    }
    
    if (warnings.length > 0) {
        console.warn('⚠️ API KEY UYARISI:');
        warnings.forEach(w => console.warn('  - ' + w));
        console.warn('API keylerini doldurmak için js/1-config.js dosyasındaki API_KEYS objesini düzenleyin.');
    } else {
        console.log('✓ API Keys yapılandırıldı');
    }
}

// ============================================
// FİREBASE YAPLANDIRMASI
// ============================================
const firebaseConfig = {
    apiKey: "AIzaSyC60idSLdAiqAjPWAOMaM3g8LAKPGEUwH8",
    authDomain: "vr-sinema.firebaseapp.com",
    databaseURL: "https://vr-sinema-default-rtdb.firebaseio.com",
    projectId: "vr-sinema",
    storageBucket: "vr-sinema.firebasestorage.app",
    messagingSenderId: "724648238300",
    appId: "1:724648238300:web:dceba8c536e8a5ffd96819"
};

// Firebase başlatma
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const auth = firebase.auth();

// Auth hazır durumu
let authReady = false;

// Anonim giriş
auth.signInAnonymously()
    .then(() => {
        console.log('✓ Anonim giriş başarılı:', auth.currentUser.uid);
        authReady = true;
        checkAPIKeys();
    })
    .catch((error) => {
        console.error('❌ Giriş hatası:', error);
        alert('Firebase bağlantı hatası! Lütfen sayfayı yenileyin.\n\nHata: ' + error.message);
    });
// ============================================
// GLOBAL DEĞİŞKENLER
// ============================================

// Oda bilgileri
let currentRoomId = null;
let currentRoomData = null;
let isRoomOwner = false;
let roomRef = null;
let selectedRoomForPassword = null;

// Video bilgileri
let videoElement = null;
let videoServiceType = null;
let youtubePlayer = null;
let hlsPlayer = null;

// Kullanıcı bilgileri
let currentUserNickname = '';

// Ekran pozisyonu
let screenPosition = {x: 0, y: 2, z: -15};

// Ortam seçimi
let selectedEnvironment = 'none';

// Performans ayarları
let performanceMode = 'medium';

// Senkronizasyon
let syncTimeout = null;

// Sabitler
const DRIFT_THRESHOLD = 5.0;
const UPDATE_INTERVAL = 5000;
const SYNC_DELAY = 3000;

// ============================================
// YARDIMCI FONKSİYONLAR
// ============================================

// HTML Escape (XSS koruması)
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Zaman formatlama
function formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
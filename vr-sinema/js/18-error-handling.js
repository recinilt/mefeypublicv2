// ============================================
// HATA YÖNETİMİ
// ============================================

// Global hata yakalama
window.addEventListener('error', (e) => {
    console.error('Global hata yakalandı:', e.error);
    
    // Kritik hatalarda kullanıcıyı bilgilendir
    if (e.message.includes('Firebase') || e.message.includes('database')) {
        console.error('Firebase bağlantı hatası! Lütfen internet bağlantınızı kontrol edin.');
    }
});

// Promise hatalarını yakalama
window.addEventListener('unhandledrejection', (e) => {
    console.error('Promise hatası:', e.reason);
});
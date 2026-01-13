// ============================================
// UI FONKSİYONLARI
// ============================================

// Ana menüyü göster
function showMainMenu() {
    document.getElementById('main-menu').style.display = 'block';
    document.getElementById('create-room').style.display = 'none';
    document.getElementById('room-list').style.display = 'none';
    document.getElementById('password-prompt').style.display = 'none';
}

// Oda oluşturma ekranını göster
function showCreateRoom() {
    document.getElementById('main-menu').style.display = 'none';
    document.getElementById('create-room').style.display = 'block';
    
    // Şifre checkbox event listener
    document.getElementById('private-room-check').addEventListener('change', function() {
        document.getElementById('room-password-input').style.display = 
            this.checked ? 'block' : 'none';
    });
}

// Oda listesini göster
function showRoomList() {
    document.getElementById('main-menu').style.display = 'none';
    document.getElementById('room-list').style.display = 'block';
    loadRooms();
}

// Oda listesini yenile
function refreshRooms() {
    loadRooms();
}

// Şifre girişi ekranını göster
function showPasswordPrompt(roomId, roomName) {
    selectedRoomForPassword = roomId;
    document.getElementById('password-room-name').textContent = `Oda: ${roomName}`;
    document.getElementById('room-list').style.display = 'none';
    document.getElementById('password-prompt').style.display = 'block';
}

// Senkronizasyon durumunu göster
function showSyncStatus(text) {
    const statusEl = document.getElementById('sync-status');
    const indicator = document.getElementById('status-indicator');
    
    statusEl.textContent = text || '⏱️ 3 saniye sonra başlıyor...';
    statusEl.classList.add('visible');
    indicator.className = 'status-indicator syncing';
    
    setTimeout(() => {
        statusEl.classList.remove('visible');
        indicator.className = 'status-indicator connected';
    }, 3500);
}

// Ayarlar panelini aç/kapa
function toggleSettings() {
    const panel = document.getElementById('settings-panel');
    panel.classList.toggle('visible');
}

// Chat'i aç/kapa
function toggleChat() {
    const chat = document.getElementById('chat-container');
    chat.classList.toggle('visible');
}
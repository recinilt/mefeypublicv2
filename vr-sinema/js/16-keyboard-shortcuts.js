// ============================================
// KLAVYE KISAYOLLARI
// ============================================

document.addEventListener('keydown', (e) => {
    if (!currentRoomId) return;
    
    // Space - Play/Pause
    if (e.code === 'Space' && canControlVideo()) {
        e.preventDefault();
        togglePlayPause();
    }
    
    // S - Stop
    if (e.code === 'KeyS' && canControlVideo()) {
        e.preventDefault();
        stopVideo();
    }
    
    // Arrow keys - Ekran pozisyonu (sadece oda sahibi)
    if (isRoomOwner) {
        if (e.code === 'ArrowUp') {
            e.preventDefault();
            moveScreen('up');
        }
        if (e.code === 'ArrowDown') {
            e.preventDefault();
            moveScreen('down');
        }
        if (e.code === 'ArrowLeft') {
            e.preventDefault();
            moveScreen('left');
        }
        if (e.code === 'ArrowRight') {
            e.preventDefault();
            moveScreen('right');
        }
    }
    
    // C - Chat toggle
    if (e.code === 'KeyC') {
        e.preventDefault();
        toggleChat();
    }
    
    // G - Settings toggle
    if (e.code === 'KeyG') {
        e.preventDefault();
        toggleSettings();
    }
});
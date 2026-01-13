// ============================================
// FİREBASE SENKRONİZASYON SİSTEMİ
// ============================================

// Oda güncellemelerini dinle
function listenToRoomUpdates() {
    if (!roomRef) return;
    
    // Video state değişikliklerini dinle
    roomRef.child('videoState').on('value', (snapshot) => {
        if (!videoElement) return;
        
        const state = snapshot.val();
        if (!state) return;
        
        const now = Date.now();
        
        if (!state.isPlaying && !videoElement.paused) {
            videoElement.pause();
            videoElement.currentTime = state.currentTime;
            console.log('⏸️ Video durduruldu');
            return;
        }
        
        if (state.isPlaying && videoElement.paused && state.startTimestamp) {
            const waitTime = state.startTimestamp - now;
            
            if (waitTime > 0) {
                console.log(`⏱️ ${(waitTime/1000).toFixed(1)}s sonra başlayacak`);
                showSyncStatus(`⏱️ ${Math.ceil(waitTime/1000)}s sonra başlıyor...`);
                
                if (syncTimeout) clearTimeout(syncTimeout);
                syncTimeout = setTimeout(() => {
                    videoElement.currentTime = state.currentTime;
                    videoElement.play().catch(err => console.log('Auto-play engellendi:', err));
                    console.log('▶️ Video başlatıldı (sync)');
                }, waitTime);
            } else {
                const elapsedSeconds = Math.abs(waitTime) / 1000;
                const newSeek = state.currentTime + elapsedSeconds;
                
                videoElement.currentTime = newSeek;
                videoElement.play().catch(err => console.log('Auto-play engellendi:', err));
                console.log(`▶️ Video başlatıldı (${elapsedSeconds.toFixed(1)}s gecikmeli)`);
            }
        }
    });
    
    // İzleyici sayısı değişikliklerini dinle
    roomRef.child('viewers').on('value', () => {
        updateViewerCount();
    });
    
    // Oda sahibi değişikliklerini dinle
    roomRef.child('owner').on('value', (snapshot) => {
        const newOwner = snapshot.val();
        if (newOwner === auth.currentUser.uid && !isRoomOwner) {
            isRoomOwner = true;
            console.log('✓ Oda sahipliği size devredildi!');
            alert('🎉 Oda sahipliği size devredildi! Artık video kontrollerini kullanabilirsiniz.');
        }
    });
    
    // Ekran pozisyonu değişikliklerini dinle
    roomRef.child('screenPosition').on('value', (snapshot) => {
        const pos = snapshot.val();
        if (pos && !isRoomOwner) {
            screenPosition = pos;
            const screen = document.getElementById('cinema-screen');
            screen.setAttribute('position', `${pos.x} ${pos.y} ${pos.z}`);
        }
    });
    
    // Video URL değişikliklerini dinle
    roomRef.child('videoUrl').on('value', (snapshot) => {
        const newUrl = snapshot.val();
        if (newUrl && currentRoomData.videoUrl !== newUrl) {
            console.log('🔄 Video değiştirildi, yeniden yükleniyor...');
            
            // Video servisini güncelle
            roomRef.child('videoService').once('value', (serviceSnapshot) => {
                videoServiceType = serviceSnapshot.val();
            });
            
            roomRef.child('originalUrl').once('value', (originalSnapshot) => {
                const originalUrl = originalSnapshot.val();
                setupVideo(newUrl, currentRoomData.screenSize, originalUrl);
                currentRoomData.videoUrl = newUrl;
            });
        }
    });
    
    // Oda sahibi ise periyodik güncelleme yap
    if (isRoomOwner) {
        setInterval(() => {
            if (videoElement && !videoElement.paused) {
                roomRef.child('videoState').update({
                    currentTime: videoElement.currentTime,
                    lastUpdate: Date.now()
                });
            }
        }, UPDATE_INTERVAL);
    }
}
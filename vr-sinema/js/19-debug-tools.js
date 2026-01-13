// ============================================
// DEBUG ARAÇLARI
// ============================================

window.vrCinemaDebug = {
    // Mevcut oda bilgisi
    getRoomInfo: () => {
        return {
            roomId: currentRoomId,
            roomData: currentRoomData,
            isOwner: isRoomOwner,
            nickname: currentUserNickname,
            videoService: videoServiceType,
            screenPosition: screenPosition,
            performanceMode: performanceMode
        };
    },
    
    // Video durumu
    getVideoState: () => {
        if (!videoElement) return 'Video yüklenmedi';
        return {
            paused: videoElement.paused,
            currentTime: videoElement.currentTime,
            duration: videoElement.duration,
            readyState: videoElement.readyState,
            networkState: videoElement.networkState
        };
    },
    
    // Manuel senkronizasyon tetikle
    forceSync: () => {
        if (videoElement && roomRef) {
            roomRef.child('videoState').once('value', (snapshot) => {
                const state = snapshot.val();
                if (state) {
                    videoElement.currentTime = state.currentTime;
                    console.log('✓ Manuel senkronizasyon tamamlandı');
                }
            });
        }
    },
    
    // VR UI'yi zorla göster
    showVRUI: () => {
        document.getElementById('vr-ui-panel').setAttribute('visible', 'true');
        console.log('✓ VR UI gösterildi');
    },
    
    // Tüm dinleyicileri listele
    listListeners: () => {
        console.log('Aktif Firebase Dinleyiciler:');
        console.log('- videoState');
        console.log('- viewers');
        console.log('- owner');
        console.log('- screenPosition');
        console.log('- videoUrl');
        console.log('- messages');
    }
};
// ============================================
// VR UI GÜNCELLEME FONKSİYONLARI
// ============================================

// VR Seek Bar'ı güncelle
function updateVRSeekBar() {
    if (!videoElement || !videoElement.duration) return;
    
    const percent = (videoElement.currentTime / videoElement.duration);
    const maxWidth = 2.2;
    const progressWidth = maxWidth * percent;
    
    const progressBar = document.getElementById('vr-seek-bar-progress');
    if (progressBar) {
        progressBar.setAttribute('width', progressWidth);
        progressBar.setAttribute('position', `${-1.1 + (progressWidth / 2)} 0.35 0.01`);
    }
    
    // Zaman göstergesi
    const timeDisplay = document.getElementById('vr-time-display');
    if (timeDisplay) {
        const currentTime = formatTime(videoElement.currentTime);
        const totalTime = formatTime(videoElement.duration);
        timeDisplay.setAttribute('value', `${currentTime} / ${totalTime}`);
    }
}

// VR Seek bar'ı otomatik güncelle
setInterval(() => {
    if (videoElement && !videoElement.paused) {
        updateVRSeekBar();
    }
}, 500);

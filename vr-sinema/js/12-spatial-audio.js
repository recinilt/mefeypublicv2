// ============================================
// SPATIAL AUDIO (3D SES SİSTEMİ)
// ============================================

// Spatial audio kurulumu
function setupSpatialAudio() {
    if (!videoElement) return;
    
    // Video elementine pozisyonel ses ekle
    const screen = document.getElementById('cinema-screen');
    
    // Web Audio API ile spatial audio
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioCtx = new AudioContext();
    
    const source = audioCtx.createMediaElementSource(videoElement);
    const panner = audioCtx.createPanner();
    
    // Panner ayarları
    panner.panningModel = 'HRTF';
    panner.distanceModel = 'inverse';
    panner.refDistance = 10;
    panner.maxDistance = 100;
    panner.rolloffFactor = 1;
    panner.coneInnerAngle = 360;
    panner.coneOuterAngle = 0;
    panner.coneOuterGain = 0;
    
    // Ekranın pozisyonunu kullan
    panner.positionX.value = screenPosition.x;
    panner.positionY.value = screenPosition.y;
    panner.positionZ.value = screenPosition.z;
    
    source.connect(panner);
    panner.connect(audioCtx.destination);
    
    console.log('🔊 Spatial Audio aktif');
    
    // Ekran pozisyonu değiştiğinde ses pozisyonunu güncelle
    const updateSpatialAudio = () => {
        panner.positionX.value = screenPosition.x;
        panner.positionY.value = screenPosition.y;
        panner.positionZ.value = screenPosition.z;
    };
    
    // Her saniye kontrol et
    setInterval(updateSpatialAudio, 1000);
}
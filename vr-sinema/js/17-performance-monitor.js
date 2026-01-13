// ============================================
// PERFORMANS İZLEME
// ============================================

let fpsCounter = 0;
let lastFpsCheck = Date.now();

// FPS izleme fonksiyonu
function monitorPerformance() {
    fpsCounter++;
    
    const now = Date.now();
    if (now - lastFpsCheck >= 1000) {
        const fps = fpsCounter;
        fpsCounter = 0;
        lastFpsCheck = now;
        
        // FPS düşükse uyarı
        if (fps < 30 && performanceMode !== 'low') {
            console.warn(`⚠️ Düşük FPS tespit edildi: ${fps} FPS. Performans modunu "Düşük" olarak ayarlamayı düşünün.`);
        }
        
        // Debug için (opsiyonel)
        // console.log(`FPS: ${fps}`);
    }
    
    requestAnimationFrame(monitorPerformance);
}

// Performans izlemeyi başlat
if (typeof requestAnimationFrame !== 'undefined') {
    monitorPerformance();
}
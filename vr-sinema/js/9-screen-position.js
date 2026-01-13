// ============================================
// EKRAN POZİSYONU KONTROLÜ
// ============================================

// Ekranı taşı
function moveScreen(direction) {
    const screen = document.getElementById('cinema-screen');
    const step = 1;
    
    switch(direction) {
        case 'up':
            screenPosition.y += step;
            break;
        case 'down':
            screenPosition.y -= step;
            break;
        case 'left':
            screenPosition.x -= step;
            break;
        case 'right':
            screenPosition.x += step;
            break;
        case 'forward':
            screenPosition.z += step;
            break;
        case 'backward':
            screenPosition.z -= step;
            break;
    }
    
    screen.setAttribute('position', 
        `${screenPosition.x} ${screenPosition.y} ${screenPosition.z}`);
    
    // Firebase'e kaydet (sadece oda sahibi)
    if (isRoomOwner) {
        roomRef.child('screenPosition').set(screenPosition);
    }
    
    console.log('📐 Ekran taşındı:', direction, screenPosition);
}

// Ekran pozisyonunu sıfırla
function resetScreenPosition() {
    screenPosition = {x: 0, y: 2, z: -15};
    const screen = document.getElementById('cinema-screen');
    screen.setAttribute('position', 
        `${screenPosition.x} ${screenPosition.y} ${screenPosition.z}`);
    
    if (isRoomOwner) {
        roomRef.child('screenPosition').set(screenPosition);
    }
    
    console.log('🔄 Ekran pozisyonu sıfırlandı');
}
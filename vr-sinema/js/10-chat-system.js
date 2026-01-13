// ============================================
// MESAJLAŞMA SİSTEMİ
// ============================================

// Mesaj gönder
function sendMessage() {
    const input = document.getElementById('chat-message');
    const messageText = input.value.trim();
    
    if (!messageText) return;
    
    const messageData = {
        userId: auth.currentUser.uid,
        nickname: currentUserNickname,
        message: escapeHtml(messageText),
        timestamp: firebase.database.ServerValue.TIMESTAMP
    };
    
    database.ref(`rooms/${currentRoomId}/messages`).push(messageData);
    
    input.value = '';
}

// Mesajları dinle
function listenToMessages() {
    database.ref(`rooms/${currentRoomId}/messages`)
        .orderByChild('timestamp')
        .limitToLast(50)
        .on('child_added', (snapshot) => {
            const msg = snapshot.val();
            displayMessage(msg);
        });
}

// Mesajı göster
function displayMessage(msg) {
    const messagesDiv = document.getElementById('messages');
    const msgElement = document.createElement('div');
    msgElement.className = 'message';
    
    const time = new Date(msg.timestamp).toLocaleTimeString('tr-TR', {
        hour: '2-digit',
        minute: '2-digit'
    });
    
    msgElement.innerHTML = `
        <div class="nickname">${msg.nickname}</div>
        <div class="text">${msg.message}</div>
        <div class="time">${time}</div>
    `;
    
    messagesDiv.appendChild(msgElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
    
    // Max 50 mesaj göster (performans için)
    if (messagesDiv.children.length > 50) {
        messagesDiv.removeChild(messagesDiv.firstChild);
    }
}

// Enter tuşu ile mesaj gönder
document.addEventListener('DOMContentLoaded', () => {
    const chatInput = document.getElementById('chat-message');
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
});
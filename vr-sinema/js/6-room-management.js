// ============================================
// ODA YÖNETİMİ
// ============================================

// Nickname ayarlama
function setNickname() {
    const nickname = document.getElementById('nickname-input').value.trim();
    
    if (!nickname || nickname.length < 2) {
        alert('Lütfen en az 2 karakter uzunluğunda bir takma ad girin!');
        return;
    }
    
    currentUserNickname = nickname;
    
    // Firebase'e kaydet
    database.ref(`users/${auth.currentUser.uid}`).set({
        nickname: nickname,
        lastSeen: firebase.database.ServerValue.TIMESTAMP
    });
    
    document.getElementById('nickname-screen').style.display = 'none';
    document.getElementById('main-menu').style.display = 'block';
    document.getElementById('welcome-nickname').textContent = nickname;
    
    console.log('✓ Nickname ayarlandı:', nickname);
}

// Oda oluşturma
function createRoom() {
    if (!authReady) {
        alert('Lütfen bekleyin, Firebase bağlantısı kuruluyor...');
        return;
    }
    
    const roomName = document.getElementById('room-name-input').value.trim();
    const videoUrl = document.getElementById('video-url-input').value.trim();
    const isPrivate = document.getElementById('private-room-check').checked;
    const password = document.getElementById('room-password-input').value;
    const screenSize = document.getElementById('screen-size').value;
    const controlMode = document.querySelector('input[name="control-mode"]:checked').value;
    
    if (!roomName) {
        alert('Lütfen oda adı giriniz!');
        return;
    }
    
    const processedUrl = videoUrl ? processVideoUrl(videoUrl) : null;
    const newRoomRef = database.ref('rooms').push();
    const roomId = newRoomRef.key;
    
    const roomData = {
        name: roomName,
        videoUrl: processedUrl,
        originalUrl: videoUrl || null,
        videoService: videoServiceType,
        environment: selectedEnvironment,
        controlMode: controlMode,
        isPrivate: isPrivate,
        password: isPrivate ? btoa(password) : null,
        screenSize: screenSize,
        owner: auth.currentUser.uid,
        ownerNickname: currentUserNickname,
        members: [auth.currentUser.uid],
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        videoState: {
            isPlaying: false,
            currentTime: 0,
            lastUpdate: Date.now(),
            startTimestamp: null
        },
        screenPosition: screenPosition,
        viewers: 1
    };
    
    newRoomRef.set(roomData).then(() => {
        isRoomOwner = true;
        joinRoom(roomId, roomData);
    }).catch(error => {
        console.error('Oda oluşturma hatası:', error);
        alert('Oda oluşturulamadı: ' + error.message);
    });
}

// Oda listesini yükle
function loadRooms() {
    const roomsContainer = document.getElementById('rooms-container');
    roomsContainer.innerHTML = '<div class="loading">⏳ Odalar yükleniyor...</div>';
    
    setTimeout(() => {
        database.ref('rooms').orderByChild('createdAt').once('value', (snapshot) => {
            roomsContainer.innerHTML = '';
            
            if (!snapshot.exists()) {
                roomsContainer.innerHTML = '<p style="text-align: center; color: #666;">Henüz aktif oda yok. İlk odayı siz oluşturun! 🎬</p>';
                return;
            }
            
            const rooms = [];
            snapshot.forEach((childSnapshot) => {
                const room = childSnapshot.val();
                rooms.push({
                    id: childSnapshot.key,
                    data: room
                });
            });
            
            if (rooms.length === 0) {
                roomsContainer.innerHTML = '<p style="text-align: center; color: #666;">Henüz aktif oda yok. İlk odayı siz oluşturun! 🎬</p>';
                return;
            }
            
            rooms.reverse().forEach(room => {
                const roomDiv = document.createElement('div');
                let className = 'room-item';
                if (room.data.isPrivate) className += ' private';
                if (!room.data.owner || room.data.viewers === 0) className += ' ownerless';
                
                roomDiv.className = className;
                const serviceBadge = getServiceBadge(room.data.videoService);
                const envInfo = ENVIRONMENTS[room.data.environment] || ENVIRONMENTS['none'];
                
                let badges = '';
                if (room.data.isPrivate) {
                    badges += '<span class="lock-icon">🔒</span>';
                }
                if (!room.data.owner || room.data.viewers === 0) {
                    badges += '<span class="badge badge-ownerless">🔓 Sahipsiz</span>';
                }
                
                roomDiv.innerHTML = `
                    ${badges}
                    <div class="room-name">${escapeHtml(room.data.name)} ${serviceBadge}</div>
                    <div class="room-info">
                        👤 ${escapeHtml(room.data.ownerNickname || 'Anonim')} • 👥 ${room.data.viewers || 0} izleyici • ${envInfo.icon} ${envInfo.name}
                    </div>
                `;
                roomDiv.onclick = () => selectRoom(room.id, room.data);
                roomsContainer.appendChild(roomDiv);
            });
        }).catch(error => {
            console.error('Oda listesi yükleme hatası:', error);
            roomsContainer.innerHTML = '<p style="color: red;">Odalar yüklenirken hata oluştu. Lütfen sayfayı yenileyin.</p>';
        });
    }, 500);
}

// Oda seçme
function selectRoom(roomId, roomData) {
    if (roomData.isPrivate) {
        showPasswordPrompt(roomId, roomData.name);
    } else {
        joinRoom(roomId, roomData);
    }
}

// Şifre ile katılma
function joinWithPassword() {
    const password = document.getElementById('room-password-join').value;
    
    database.ref(`rooms/${selectedRoomForPassword}`).once('value', (snapshot) => {
        const roomData = snapshot.val();
        
        if (!roomData) {
            alert('Oda bulunamadı!');
            return;
        }
        
        if (btoa(password) === roomData.password) {
            joinRoom(selectedRoomForPassword, roomData);
        } else {
            alert('Yanlış şifre!');
        }
    });
}

// Odaya katılma
function joinRoom(roomId, roomData) {
    currentRoomId = roomId;
    currentRoomData = roomData;
    roomRef = database.ref(`rooms/${roomId}`);
    videoServiceType = roomData.videoService;
    
    if (!roomData.owner || roomData.owner === null) {
        roomRef.child('owner').set(auth.currentUser.uid);
        roomRef.child('ownerNickname').set(currentUserNickname);
        isRoomOwner = true;
        console.log('✓ Sahipsiz odaya katıldım, şimdi ben sahibim');
    } else {
        isRoomOwner = (roomData.owner === auth.currentUser.uid);
    }
    
    roomRef.child('members').transaction((currentMembers) => {
        if (!currentMembers) currentMembers = [];
        if (!currentMembers.includes(auth.currentUser.uid)) {
            currentMembers.push(auth.currentUser.uid);
        }
        return currentMembers;
    });
    
    roomRef.child('viewers').transaction((current) => {
        return (current || 0) + 1;
    });
    
    document.getElementById('ui-overlay').classList.add('hidden');
    document.getElementById('vr-controls').classList.add('visible');
    document.getElementById('room-info-display').classList.add('visible');
    document.getElementById('screen-controls').classList.add('visible');
    document.getElementById('toggle-chat-btn').classList.add('visible');
    document.getElementById('settings-toggle-btn').classList.add('visible');
    
    document.getElementById('room-title').textContent = roomData.name;
    document.getElementById('video-service-badge').innerHTML = getServiceBadge(videoServiceType);
    
    const controlText = roomData.controlMode === 'everyone' ? 'Herkes kontrol edebilir' : 'Sadece oda sahibi';
    document.getElementById('control-mode-text').textContent = controlText;
    
    // Kişisel ortamı uygula
    document.getElementById('personal-environment').value = roomData.environment || 'none';
    applyEnvironment(roomData.environment || 'none');
    
    updateViewerCount();
    
    if (roomData.videoUrl) {
        setupVideo(roomData.videoUrl, roomData.screenSize, roomData.originalUrl);
    } else {
        console.log('ℹ️ Oda video olmadan oluşturuldu');
        document.getElementById('cinema-screen').setAttribute('visible', 'false');
    }
    
    listenToRoomUpdates();
    listenToMessages();
    setupSpatialAudio();
    
    window.addEventListener('beforeunload', () => {
        leaveRoomSilent();
    });
}

// Odadan çıkma
function leaveRoom() {
    if (isRoomOwner) {
        document.getElementById('delete-modal').classList.add('active');
    } else {
        leaveRoomSilent();
        location.reload();
    }
}

// Sessizce odadan çıkma
function leaveRoomSilent() {
    if (currentRoomId && roomRef) {
        roomRef.child('members').transaction((currentMembers) => {
            if (!currentMembers) return null;
            return currentMembers.filter(uid => uid !== auth.currentUser.uid);
        });
        
        roomRef.child('viewers').transaction((current) => {
            const newCount = Math.max((current || 1) - 1, 0);
            
            if (newCount === 0) {
                roomRef.child('owner').set(null);
            }
            
            return newCount;
        });
        
        roomRef.off();
    }
}

// Oda silme onayı
function confirmDeleteRoom(shouldDelete) {
    document.getElementById('delete-modal').classList.remove('active');
    
    if (shouldDelete) {
        roomRef.remove().then(() => {
            console.log('✓ Oda sahibi tarafından silindi');
        });
    } else {
        if (currentRoomData.isPrivate) {
            roomRef.update({
                isPrivate: false,
                password: null
            });
            console.log('✓ Şifreli oda açık bırakıldı, şifre silindi');
        }
        
        transferOwnership(currentRoomId);
        leaveRoomSilent();
    }
    
    location.reload();
}

// Oda sahipliğini transfer et
function transferOwnership(roomId) {
    const roomRef = database.ref(`rooms/${roomId}`);
    
    roomRef.child('members').once('value', (snapshot) => {
        const members = snapshot.val() || [];
        const otherMembers = members.filter(uid => uid !== auth.currentUser.uid);
        
        if (otherMembers.length > 0) {
            const newOwner = otherMembers[0];
            roomRef.child('owner').set(newOwner);
            console.log('✓ Oda sahipliği devredildi:', newOwner);
        } else {
            roomRef.child('owner').set(null);
            console.log('✓ Oda sahipsiz bırakıldı');
        }
    });
}

// İzleyici sayısını güncelle
function updateViewerCount() {
    if (roomRef) {
        roomRef.child('viewers').once('value', (snapshot) => {
            document.getElementById('viewers-count').textContent = snapshot.val() || 0;
        });
    }
}
// ============================================
// VİDEO SERVİS TESPİTİ VE URL İŞLEME
// ============================================

// Video servisini tespit et
function detectVideoService(url) {
    if (!url) return null;
    
    // YouTube
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
        return 'youtube';
    }
    
    // Google Drive
    if (url.includes('drive.google.com')) {
        return 'googledrive';
    }
    
    // Catbox
    if (url.includes('catbox.moe') || url.includes('files.catbox.moe')) {
        return 'catbox';
    }
    
    // Bunny CDN
    if (url.includes('.b-cdn.net') || url.includes('bunny')) {
        return 'bunny';
    }
    
    // HLS Streams (.m3u8, .ts)
    if (url.includes('.m3u8') || url.includes('.ts')) {
        return 'hls-stream';
    }
    
    // Direkt video formatları
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.ogv', '.mov', '.avi', '.m4v'];
    const lowerUrl = url.toLowerCase();
    for (const ext of videoExtensions) {
        if (lowerUrl.includes(ext)) {
            return 'direct';
        }
    }
    
    // Bilinmeyen
    return 'unknown';
}

// YouTube video ID'sini çıkar
function extractYouTubeId(url) {
    // youtube.com/watch?v=VIDEO_ID
    const match1 = url.match(/[?&]v=([^&]+)/);
    if (match1) return match1[1];
    
    // youtu.be/VIDEO_ID
    const match2 = url.match(/youtu\.be\/([^?]+)/);
    if (match2) return match2[1];
    
    return null;
}

// Google Drive file ID'sini çıkar
function extractGoogleDriveId(url) {
    // https://drive.google.com/file/d/FILE_ID/view
    const match1 = url.match(/\/file\/d\/([^/]+)/);
    if (match1) return match1[1];
    
    // https://drive.google.com/open?id=FILE_ID
    const match2 = url.match(/[?&]id=([^&]+)/);
    if (match2) return match2[1];
    
    return null;
}

// Video URL'sini işle
function processVideoUrl(url) {
    if (!url) return null;
    
    const service = detectVideoService(url);
    videoServiceType = service;
    
    if (service === 'youtube') {
        console.log('📺 YouTube video tespit edildi');
        return url;
    }
    
    if (service === 'googledrive') {
        console.log('💾 Google Drive video tespit edildi');
        const fileId = extractGoogleDriveId(url);
        if (fileId) {
            // Google Drive API ile direkt indirme linki
            return `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${API_KEYS.GOOGLE_DRIVE}`;
        }
        return url;
    }
    
    if (service === 'catbox') {
        console.log('📦 Catbox linki tespit edildi');
        return url;
    }
    
    if (service === 'bunny') {
        console.log('🐰 Bunny CDN linki tespit edildi');
        return url;
    }
    
    if (service === 'hls-stream') {
        console.log('📡 HLS stream tespit edildi');
        return url;
    }
    
    if (service === 'direct') {
        console.log('🎬 Direkt video linki tespit edildi');
        return url;
    }
    
    console.log('⚠️ Bilinmeyen kaynak, CORS proxy kullanılıyor');
    videoServiceType = 'cors-proxy';
    return 'https://corsproxy.io/?' + encodeURIComponent(url);
}

// Servis badge'i oluştur
function getServiceBadge(service) {
    const badges = {
        'youtube': '<span class="service-badge badge-youtube">YouTube</span>',
        'googledrive': '<span class="service-badge badge-gdrive">Google Drive</span>',
        'catbox': '<span class="service-badge badge-catbox">Catbox</span>',
        'bunny': '<span class="service-badge badge-bunny">Bunny CDN</span>',
        'hls-stream': '<span class="service-badge badge-hls">HLS Stream</span>',
        'direct': '<span class="service-badge badge-direct">Direkt</span>',
        'cors-proxy': '<span class="service-badge badge-cors">CORS Proxy</span>'
    };
    return badges[service] || '';
}
// ============================================
// ORTAM YÖNETİMİ - 13 ORTAM
// ============================================

const ENVIRONMENTS = {
    none: {
        name: 'Ortamsız',
        icon: '⬛',
        config: null
    },
    theater: {
        name: 'Klasik Sinema',
        icon: '🎪',
        config: 'preset: default; lighting: distant; shadow: true'
    },
    space: {
        name: 'Uzay İstasyonu',
        icon: '🌌',
        config: 'preset: starry; lighting: none'
    },
    forest: {
        name: 'Orman',
        icon: '🌲',
        config: 'preset: forest; lighting: distant'
    },
    desert: {
        name: 'Çöl Gece',
        icon: '🏜️',
        config: 'preset: egypt; lighting: distant; dressing: none'
    },
    moon: {
        name: 'Ay Yüzeyi',
        icon: '🌙',
        config: 'preset: goaland; lighting: distant; ground: flat'
    },
    cyberpunk: {
        name: 'Cyberpunk',
        icon: '🌃',
        config: 'preset: japan; lighting: distant; fog: 0.8'
    },
    underwater: {
        name: 'Su Altı',
        icon: '🌊',
        config: 'preset: poison; lighting: distant; fog: 0.5'
    },
    mountain: {
        name: 'Dağ Zirvesi',
        icon: '⛰️',
        config: 'preset: arches; lighting: distant; ground: hills'
    },
    volcano: {
        name: 'Volkan',
        icon: '🌋',
        config: 'preset: volcano; lighting: distant; ground: canyon'
    },
    fantasy: {
        name: 'Fantastik',
        icon: '✨',
        config: 'preset: dream; lighting: distant; dressing: cubes'
    },
    city: {
        name: 'Şehir',
        icon: '🏙️',
        config: 'preset: chicago; lighting: distant; skyType: atmosphere'
    },
    beach: {
        name: 'Sahil',
        icon: '🏖️',
        config: 'preset: yavapai; lighting: distant; ground: flat'
    }
};

// Ortam seçme (Oda oluşturma ekranında)
function selectEnvironment(envKey, element) {
    selectedEnvironment = envKey;
    document.querySelectorAll('.environment-card').forEach(card => {
        card.classList.remove('selected');
    });
    element.classList.add('selected');
}

// Ortam uygulama (VR sahnesine)
function applyEnvironment(envKey) {
    const container = document.getElementById('environment-container');
    const floor = document.getElementById('default-floor');
    
    if (!ENVIRONMENTS[envKey]) {
        console.error('Bilinmeyen ortam:', envKey);
        envKey = 'none';
    }
    
    const env = ENVIRONMENTS[envKey];
    container.innerHTML = '';
    
    // Performans moduna göre ayarla
    let config = env.config;
    if (config && performanceMode === 'low') {
        config += '; shadow: false; fog: 0';
    } else if (config && performanceMode === 'medium') {
        config += '; shadow: true';
    }
    
    if (config === null) {
        floor.setAttribute('visible', 'true');
        console.log('✓ Ortamsız mod aktif');
    } else {
        const envEntity = document.createElement('a-entity');
        envEntity.setAttribute('environment', config);
        container.appendChild(envEntity);
        floor.setAttribute('visible', 'false');
        console.log('✓ Ortam yüklendi:', env.name, '- Performans:', performanceMode);
    }
}

// Kişisel ortam değiştirme (Ayarlar panelinden)
function changePersonalEnvironment() {
    const select = document.getElementById('personal-environment');
    const envKey = select.value;
    applyEnvironment(envKey);
    console.log('✓ Kişisel ortam değiştirildi:', envKey);
}

// Performans modu değiştirme (Ayarlar panelinden)
function changePerformanceMode() {
    const select = document.getElementById('performance-mode');
    performanceMode = select.value;
    
    // Mevcut ortamı yeniden yükle
    const currentEnv = document.getElementById('personal-environment').value;
    applyEnvironment(currentEnv);
    
    console.log('✓ Performans modu değiştirildi:', performanceMode);
}
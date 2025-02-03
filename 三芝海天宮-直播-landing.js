// Three.js 場景設置
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('temple-model').appendChild(renderer.domElement);

// 創建光暈粒子系統
const particlesGeometry = new THREE.BufferGeometry();
const particleCount = 2000;
const posArray = new Float32Array(particleCount * 3);
const colors = new Float32Array(particleCount * 3);

for(let i = 0; i < particleCount * 3; i += 3) {
    // 位置
    posArray[i] = (Math.random() - 0.5) * 10;
    posArray[i + 1] = (Math.random() - 0.5) * 10;
    posArray[i + 2] = (Math.random() - 0.5) * 10;
    
    // 顏色 - 金色到紅色的漸變
    colors[i] = Math.random() * 0.5 + 0.5; // R
    colors[i + 1] = Math.random() * 0.3 + 0.2; // G
    colors[i + 2] = 0; // B
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.015,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
});

const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particleSystem);

camera.position.z = 5;

// 動畫循環
let mouseX = 0;
let mouseY = 0;
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

function animate() {
    requestAnimationFrame(animate);
    
    // 粒子系統動畫
    particleSystem.rotation.x += 0.0005;
    particleSystem.rotation.y += 0.0003;
    
    // 滑鼠互動
    particleSystem.rotation.x += (mouseY * 0.0002 - particleSystem.rotation.x) * 0.05;
    particleSystem.rotation.y += (mouseX * 0.0002 - particleSystem.rotation.y) * 0.05;
    
    renderer.render(scene, camera);
}

// 頁面載入完成後的初始化
document.addEventListener('DOMContentLoaded', () => {
    const enterButton = document.querySelector('.enter-button');
    const loadingScreen = document.querySelector('.loading-screen');

    // 載入動畫
    setTimeout(() => {
        gsap.to(loadingScreen, {
            opacity: 0,
            duration: 1,
            onComplete: () => {
                loadingScreen.style.display = 'none';
                
                // 入場動畫序列
                const tl = gsap.timeline();
                
                tl.from('.main-title', {
                    y: -100,
                    opacity: 0,
                    duration: 1.5,
                    ease: 'power4.out'
                })
                .from('.portal-frame', {
                    scale: 0,
                    opacity: 0,
                    duration: 1.5,
                    ease: 'back.out(1.7)'
                }, '-=1')
                .from('.lotus', {
                    y: 100,
                    opacity: 0,
                    duration: 1,
                    stagger: 0.2
                }, '-=1');
            }
        });
    }, 2000);

    // 按鈕點擊效果
    enterButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        // 創建波紋效果
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);

        // 點擊動畫和轉場
        gsap.timeline()
            .to(this, {
                scale: 0.95,
                duration: 0.1
            })
            .to(this, {
                scale: 1,
                duration: 0.1
            })
            .to('.main-content', {
                opacity: 0,
                duration: 0.8,
                ease: 'power2.inOut',
                onComplete: () => {
                    window.location.href = '三芝海天宮-直播.html';
                }
            });
    });

    // 按鈕懸浮效果
    enterButton.addEventListener('mouseenter', () => {
        gsap.to(enterButton, {
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    enterButton.addEventListener('mouseleave', () => {
        gsap.to(enterButton, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    // 觸摸設備支持
    enterButton.addEventListener('touchstart', function(e) {
        e.preventDefault();
        gsap.to(this, {
            scale: 0.95,
            duration: 0.1
        });
    });

    enterButton.addEventListener('touchend', function(e) {
        e.preventDefault();
        gsap.to(this, {
            scale: 1,
            duration: 0.1,
            onComplete: () => {
                window.location.href = 'livestream.html';
            }
        });
    });
});

// 滑鼠移動事件
document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;
});

// 視窗調整大小事件
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// 啟動動畫循環
animate();

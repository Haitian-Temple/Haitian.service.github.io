// 初始化 Three.js 場景
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.querySelector('.background-animation').appendChild(renderer.domElement);

// 創建粒子系統
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 1000;
const posArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 5;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.005,
    color: 0xffd700,
    transparent: true,
    opacity: 0.8
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

camera.position.z = 2;

// 動畫循環
function animate() {
    requestAnimationFrame(animate);
    
    particlesMesh.rotation.x += 0.0005;
    particlesMesh.rotation.y += 0.0005;
    
    renderer.render(scene, camera);
}

animate();

// 響應視窗大小變化
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// 滑鼠移動效果
document.addEventListener('mousemove', (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    
    particlesMesh.rotation.x = mouseY * 0.0001;
    particlesMesh.rotation.y = mouseX * 0.0001;
});

// 頁面載入動畫
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.animate__animated');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.animation = 'none';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.animation = '';
        }, 100);
    });
});
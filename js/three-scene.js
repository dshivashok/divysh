// Three.js Scene Setup
let scene, camera, renderer;
let particleGroups = [];

function initThreeScene() {
    const canvas = document.getElementById('canvas');
    if (!canvas) {
        console.error('Canvas element not found');
        return;
    }

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ 
        canvas: canvas, 
        alpha: true, 
        antialias: true 
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Create multiple particle systems
    const particleCounts = [3000, 2000, 1000];
    const colors = [0xff0080, 0x00f2fe, 0xffd700];
    const sizes = [0.01, 0.008, 0.006];

    particleCounts.forEach((count, index) => {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(count * 3);
        
        for (let i = 0; i < count * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 10;
            positions[i + 1] = (Math.random() - 0.5) * 10;
            positions[i + 2] = (Math.random() - 0.5) * 10;
        }
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        
        const material = new THREE.PointsMaterial({
            size: sizes[index],
            color: colors[index],
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });
        
        const particles = new THREE.Points(geometry, material);
        scene.add(particles);
        particleGroups.push(particles);
    });

    camera.position.z = 5;

    // Start animation
    animate();
}

// Mouse interaction
let mouseX = 0;
let mouseY = 0;
let targetMouseX = 0;
let targetMouseY = 0;

document.addEventListener('mousemove', (e) => {
    targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
    targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
});

// Animation loop
function animate() {
    if (!renderer) return;
    requestAnimationFrame(animate);

    // Smooth mouse movement
    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;

    // Animate particle groups
    particleGroups.forEach((group, index) => {
        group.rotation.x += 0.001 * (index + 1);
        group.rotation.y += 0.001 * (index + 1);
        
        // Mouse interaction
        group.rotation.x += mouseY * 0.001 * (index + 1);
        group.rotation.y += mouseX * 0.001 * (index + 1);
    });

    renderer.render(scene, camera);
}

// Resize handler
window.addEventListener('resize', () => {
    if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initThreeScene();
});
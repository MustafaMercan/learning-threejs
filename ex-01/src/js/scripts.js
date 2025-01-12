import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'


// Sahne oluştur
const scene = new THREE.Scene();

// Renderer oluştur
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight); // renderer size ayarladık
document.body.appendChild(renderer.domElement); //Rendererı doma ekledik

//kamera oluşturduk
const camera = new THREE.PerspectiveCamera(
    75, //görüş açısı
    window.innerWidth / window.innerHeight, //En - Boy oranı
    0.1, //yakın mesafe
    1000 //uzak mesafe
)

camera.position.set(5, 2, 5); // x = 0 , y = 0 , z = 5
camera.lookAt(0, 0, 0); // 0,0,0



const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enableDamping = true; //yumuşak hareket
orbitControls.dampingFactor = 0.05; // Damping oranı
orbitControls.screenSpacePanning = false; // Dikey eksende panning'i kapatır
orbitControls.minDistance = 5;
orbitControls.maxDistance = 50;





// kırmızı eksen -> x
// yeşil -> y
// turuncu -> z
const axesHelper = new THREE.AxesHelper(50);
scene.add(axesHelper);


const planeGeometry = new THREE.PlaneGeometry(20, 20);
const planeMaterial = new THREE.MeshBasicMaterial({
    color: 0X808080,
    side: THREE.DoubleSide
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.position.set(10, 0, 10);
plane.rotation.x = -Math.PI / 2;

scene.add(plane);


const boxGeometry = new THREE.BoxGeometry(2, 2, 2);
const boxMaterial = new THREE.MeshBasicMaterial({
    color: 0X9999ff

})
const box = new THREE.Mesh(boxGeometry, boxMaterial);
box.position.y = 1;
scene.add(box);


const sphereGeometry = new THREE.SphereGeometry(2);
const sphereMaterial = new THREE.MeshBasicMaterial({
    color: 0Xff99cc,
})
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(10, 20, 0);
scene.add(sphere);


let velocity = 0;
const gravity = -0.005;
const bounceFactor = 0.8;
const groundLevel = 2;



// 6. Hareket kontrolü için değişkenler
const moveSpeed = 0.1; // Hareket hızı
let keys = { w: false, a: false, s: false, d: false }; // Hangi tuşların basılı olduğunu takip eder


window.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase(); // Küçük harfe çevir
    if (keys.hasOwnProperty(key)) keys[key] = true;
});

// Tuş bırakıldığında
window.addEventListener('keyup', (event) => {
    const key = event.key.toLowerCase(); // Küçük harfe çevir
    if (keys.hasOwnProperty(key)) keys[key] = false;
});



// 6. Animasyon döngüsü
function animate() {
    requestAnimationFrame(animate);
    velocity += gravity;
    sphere.position.y += velocity;
    if (sphere.position.y <= groundLevel) {
        sphere.position.y = groundLevel;
        velocity *= -bounceFactor;
    }
    // Eğer hız çok düşükse, küreyi durdur (küçük hareketlerden kurtul)
    if (Math.abs(velocity) < 0.01 && sphere.position.y === groundLevel) {
        velocity = 0; // Hareketi durdur
    }

    if (keys.w) box.position.y += moveSpeed; // W: Yukarı
    if (keys.s) box.position.y -= moveSpeed; // S: Aşağı
    if (keys.a) box.position.x -= moveSpeed; // A: Sol
    if (keys.d) box.position.x += moveSpeed; // D: Sağ



    orbitControls.update();
    renderer.render(scene, camera);
}
animate();
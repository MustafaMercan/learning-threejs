import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Character from './Character';

class Game {

    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.renderer = new THREE.WebGLRenderer();
        this.character = null;

        this.mouse = { x: 0, y: 0 }; // Fare pozisyonu
        this.isRightMousePressed = false; // Sağ tıklama durumu


        this.setup();
        this.addMouseControls();

    }

    setup() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);



        const orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
        orbitControls.enableDamping = true;
        orbitControls.dampingFactor = 0.05;

        const helperAxes = new THREE.AxesHelper(25);
        this.scene.add(helperAxes);

        const floor = new THREE.Mesh(
            new THREE.PlaneGeometry(50, 50),
            new THREE.MeshBasicMaterial({ color: 0X808080 }),
        );
        floor.rotation.x = -Math.PI / 2;
        this.scene.add(floor);

        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(10, 10, 10);
        this.scene.add(light);

        // Karakteri oluştur ve sahneye ekle
        this.character = new Character(this.scene);
    }

    addMouseControls() {
        // Fare sağ tıklama başlangıcı
        document.addEventListener('mousedown', (event) => {
            console.log('huhu', event.button);
            if (event.button === 0) {
                this.isRightMousePressed = true;
            }
        });

        // Fare sağ tıklama bırakıldığında
        document.addEventListener('mouseup', (event) => {
            if (event.button === 0) {
                this.isRightMousePressed = false;
            }
        });

        // Fare hareketi
        document.addEventListener('mousemove', (event) => {
            if (this.isRightMousePressed) {
                const deltaX = event.movementX; // Fare hareketi x ekseni
                const rotationSpeed = 0.005; // Dönüş hızı

                // Karakterin rotasyonunu güncelle
                this.character.mesh.rotation.y -= deltaX * rotationSpeed;

                // Kameranın rotasyonunu karakterle senkronize et
                const offset = { x: 0, y: 5, z: 10 };
                const rotationY = this.character.mesh.rotation.y;

                // Kamera yeni pozisyona ayarlanıyor
                const cameraX = this.character.mesh.position.x - Math.sin(rotationY) * offset.z;
                const cameraZ = this.character.mesh.position.z - Math.cos(rotationY) * offset.z;
                const cameraY = this.character.mesh.position.y + offset.y;

                this.camera.position.set(cameraX, cameraY, cameraZ);

                // Kameranın karaktere bakmasını sağla
                this.camera.lookAt(this.character.mesh.position);
            }
        });
    }

    updateCamera() {
        // Kamera karakteri takip eder
        const offset = { x: -4, y: 3, z: 0 }; // Kameranın karaktere göre ofseti
        const rotationY = this.character.mesh.rotation.y;

        const cameraX = this.character.mesh.position.x - Math.sin(rotationY) * offset.z;
        const cameraZ = this.character.mesh.position.z - Math.cos(rotationY) * offset.z;
        const cameraY = this.character.mesh.position.y + offset.y;

        this.camera.rotation.y = rotationY
        // console.log('camera y -> ', cameraY);
        this.camera.position.set(cameraX - 4, cameraY + 1, cameraZ);
        this.camera.lookAt(this.character.mesh.position.x + 5, 1, 0);// Kamerayı karaktere yönlendir
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        if (this.character) this.character.update();
        this.updateCamera();

        this.renderer.render(this.scene, this.camera);
    }
}


export default Game;
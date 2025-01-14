import * as THREE from 'three';
import Sun from './Sun';
import Planet from './Planet';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
class SolarSystem {

    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.2,
            500000
        );
        this.camera.position.set(1000, 1000, 1000);
        this.camera.lookAt(0, 0, 0);
        this.renderer = new THREE.WebGLRenderer();


        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.target.set(0, 0, 0);
        this.controls.enableZoom = true; // Yakınlaştırma özelliği
        this.controls.minDistance = 0.1; // Minimum yakınlaştırma mesafesi
        this.controls.maxDistance = 500000; // Maksimum uzaklaştırma mesafesi

        this.isRightMousePressed = false;
        this.mouseSensitivity = 0.002;

        this.keys = {}; // Klavye tuşları için bir obje
        this.speed = 100; // Hareket hızı


        this.sun = null;
        this.planets = [];


        this.setup();
        this.addEventListeners();
        this.addCelestialBodies();

    }
    setup() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        const helperAxes = new THREE.AxesHelper(323138, 323138, 323138);
        this.scene.add(helperAxes);

        const floor = new THREE.Mesh(
            new THREE.PlaneGeometry(50, 50),
            new THREE.MeshBasicMaterial({ color: 0x808080 })
        )
        floor.rotation.x = -Math.PI / 2;

        this.scene.add(floor)
    }

    addCelestialBodies() {
        // Güneş ekle
        this.sun = new Sun("Güneş", 100, 0xffd700, { x: 0, y: 0, z: 0 });
        this.sun.create(this.scene);




        //
        //                          (name, size, color, position, orbitRadius, orbitSpeed) 



        const mercury = new Planet("Merkür", 35, 0xaaaaaa, { x: 0, y: 0, z: 0 }, 1000, 0.01);
        const venus = new Planet("Venüs", 87, 0xffcc00, { x: 0, y: 1500, z: 0 }, 2000, 0.016);
        const earth = new Planet("Dünya", 92, 0x0000ff, { x: 0, y: -1500, z: 0 }, 3000, 0.014);
        const mars = new Planet("Mars", 49, 0xff3300, { x: 0, y: -1000, z: 0 }, 4000, 0.012);
        const jupiter = new Planet("Jüpiter", 500, 0xff8800, { x: 0, y: -1000, z: 0 }, 5000, 0.008);
        const saturn = new Planet("Satürn", 400, 0xffff00, { x: 0, y: 1000, z: 0 }, 6000, 0.006);
        const uranus = new Planet("Uranüs", 189, 0x66ccff, { x: 0, y: -1800, z: 0 }, 7000, 0.004);
        const neptune = new Planet("Neptün", 170, 0x3333ff, { x: 0, y: 1800, z: 0 }, 8000, 0.002);

        // Gezegenleri bir diziye ekleme
        this.planets = [mercury, venus, earth, mars, jupiter, saturn, uranus, neptune];

        // Gezegenleri Sahneye Ekleme
        this.planets.forEach(planet => planet.create(this.scene));

        // Gezegenler ekle
        /*const earth = new Planet("Dünya", 3, 0x0000ff, { x: 80, y: 0, z: 0 }, 80, 0.01);
        const mars = new Planet("Mars", 2.8, 0xff4500, { x: 30, y: 0, z: 0 }, 30, 0.008);

        earth.create(this.scene)
        mars.create(this.scene)

        this.planets.push(mars);
        this.planets.push(earth);*/
    }
    addEventListeners() {

        /*
        document.addEventListener('keydown', (event) => {
            this.keys[event.key.toLowerCase()] = true; // Tuşu aktif yap
        });

        document.addEventListener('keyup', (event) => {
            this.keys[event.key.toLowerCase()] = false; // Tuşu pasif yap
        });


        document.addEventListener('mousedown', (event) => {
            if (event.button === 0) {
                this.isRightMousePressed = true;
            }
        })

        document.addEventListener('mouseup', (event) => {
            if (event.button === 0) {
                this.isRightMousePressed = false;
            }
        })


        document.addEventListener('mousemove', (event) => {
            if (this.isRightMousePressed) {
                const deltaX = event.movementX;
                const deltaY = event.movementY;
    
                // Eğer hareket yatay (deltaX > deltaY) ise sadece y ekseninde dönüş yap
                if (Math.abs(deltaX) > Math.abs(deltaY)) {
                    this.camera.rotation.y -= deltaX * this.mouseSensitivity;
                }
                // Eğer hareket dikey (deltaY > deltaX) ise sadece x ekseninde dönüş yap
                else {
                    this.camera.rotation.x -= deltaY * this.mouseSensitivity;
    
                    // Dikey hareketi sınırlamak için maksimum açı
                    // const maxVerticalAngle = Math.PI / 2 - 0.1;
                    // this.camera.rotation.x = Math.max(
                    //     -maxVerticalAngle,
                    //     Math.min(maxVerticalAngle, this.camera.rotation.x)
                    // );
                }
            }
        });
        document.addEventListener('contextmenu', (event) => event.preventDefault());

*/

    }

    handleMovement() {
        const direction = new THREE.Vector3();
        this.camera.getWorldDirection(direction); // Kameranın baktığı yönü al
        direction.normalize();

        const rightDirection = new THREE.Vector3();
        rightDirection.crossVectors(direction, this.camera.up); // Sağ yönü al
        rightDirection.normalize();

        // W (İleri)
        if (this.keys['w']) {
            this.camera.position.addScaledVector(direction, this.speed);
        }

        // S (Geri)
        if (this.keys['s']) {
            this.camera.position.addScaledVector(direction, -this.speed);
        }

        // A (Sola)
        if (this.keys['a']) {
            this.camera.position.addScaledVector(rightDirection, -this.speed);
        }

        // D (Sağa)
        if (this.keys['d']) {
            this.camera.position.addScaledVector(rightDirection, this.speed);
        }
    }
    animate() {
        requestAnimationFrame(() => this.animate());

        //console.log('planet -> ', this.planets);
        //console.log('plantes -> ', this.planets);
        this.planets.forEach((planet) => {

            planet.updatePosition();
        });

        this.handleMovement();

        this.renderer.render(this.scene, this.camera);
    }
}

export default SolarSystem;
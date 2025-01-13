import * as THREE from 'three';
import Sun from './Sun';
import Planet from './Planet';
class SolarSystem {

    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.set(5, 5, 20);
        this.camera.lookAt(0, 0, 0);
        this.renderer = new THREE.WebGLRenderer();

        this.isRightMousePressed = false;
        this.mouseSensitivity = 0.002;

        this.keys = {}; // Klavye tuşları için bir obje
        this.speed = 0.1; // Hareket hızı


        this.sun = null;
        this.planets = [];


        this.setup();
        this.addEventListeners();
        this.addCelestialBodies();

    }
    setup() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        const helperAxes = new THREE.AxesHelper(50, 50, 50);
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
        this.sun = new Sun("Güneş", 10, 0xffd700, { x: 0, y: 0, z: 0 });
        this.sun.create(this.scene);

        // Gezegenler ekle
        const earth = new Planet("Dünya", 3,  0x0000ff, { x: 5, y: 10, z: 10 }, 10, 0.01);
        const mars = new Planet("Mars", 2.8, 0xff4500, { x: 5, y: 0, z: 0 }, 15, 0.008);

        earth.create(this.scene)
        mars.create(this.scene)

        this.planets.push(mars);
        this.planets.push(earth);
    }
    addEventListeners() {

        document.addEventListener('keydown', (event) => {
            this.keys[event.key.toLowerCase()] = true; // Tuşu aktif yap
        });

        document.addEventListener('keyup', (event) => {
            this.keys[event.key.toLowerCase()] = false; // Tuşu pasif yap
        });


        document.addEventListener('mousedown', (event) => {
            console.log('test falan1');

            if (event.button === 0) {
                this.isRightMousePressed = true;
            }
        })

        document.addEventListener('mouseup', (event) => {
            console.log('event -> ', event.button);

            if (event.button === 0) {
                this.isRightMousePressed = false;
            }
        })


        document.addEventListener('mousemove', (event) => {
            if (this.isRightMousePressed) {
                const deltaX = event.movementX;
                const deltaY = event.movementY;

                this.camera.rotation.y -= deltaX * this.mouseSensitivity;
                this.camera.rotation.x -= deltaY * this.mouseSensitivity;

                const maxVerticalAngle = Math.PI / 2 - 0.1;
                this.camera.rotation.x = Math.max(
                    -maxVerticalAngle,
                    Math.min(maxVerticalAngle, this.camera.rotation.x)
                );

            }
        });
        document.addEventListener('contextmenu', (event) => event.preventDefault());



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
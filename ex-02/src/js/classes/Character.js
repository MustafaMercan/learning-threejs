import * as THREE from 'three';

class Character {
    constructor(scene) {
        // Piramit geometrisi
        this.geometry = new THREE.ConeGeometry(0.5, 1, 4);

        // Materyaller
        const yellowMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff }); // Sarı (ön yüz)
        const orangeMaterial = new THREE.MeshBasicMaterial({ color: 0xffa500 }); // Turuncu (diğer yüzler)

        // Geometri yüz grupları
        this.geometry.clearGroups();
        for (let i = 0; i < this.geometry.index.count / 3; i++) {
            if (i === 0) {
                // İlk yüzü (ön yüz) sarı yapıyoruz
                this.geometry.addGroup(i * 3, 3, 0);
            } else {
                // Diğer yüzleri turuncu yapıyoruz
                this.geometry.addGroup(i * 3, 3, 1);
            }
        }

        // Mesh oluşturma
        this.materials = [yellowMaterial, orangeMaterial];
        this.mesh = new THREE.Mesh(this.geometry, this.materials);

        // Karakterin başlangıç pozisyonu
        this.mesh.position.set(0, 0.5, 0);

        // Karakter yönünü ayarla
        this.mesh.rotation.y = Math.PI / 4; // Ön yüz düz gözüksün
        this.mesh.rotation.x = Math.PI;    // Alt kısmı zemine yerleşsin

        // Karakter hızı
        this.speed = 0.2;

        // Karakteri sahneye ekle
        scene.add(this.mesh);

        // Klavye kontrolleri
        this.keys = {
            ArrowUp: false,
            ArrowDown: false,
            ArrowLeft: false,
            ArrowRight: false,
        };

        this.addControls();
    }


    addControls() {
        document.addEventListener('keydown', (event) => {
            console.log(event.key)
            if (this.keys.hasOwnProperty(event.key)) {
                this.keys[event.key] = true;
            }
        });
        document.addEventListener('keyup', (event) => {
            if (this.keys.hasOwnProperty(event.key)) {
                this.keys[event.key] = false;
            }
        });

    }

    update() {
        if (this.keys.ArrowUp) this.mesh.position.z -= this.speed;
        if (this.keys.ArrowDown) this.mesh.position.z += this.speed;
        if (this.keys.ArrowLeft) this.mesh.position.x -= this.speed;
        if (this.keys.ArrowRight) this.mesh.position.x += this.speed;
    }
}

export default Character;
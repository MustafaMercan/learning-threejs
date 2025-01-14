import * as THREE from 'three';
import ICelestialBody from '../interfaces/ICelestialBody';

import earth from '../../assets/earth.jpg';
import jupiter from '../../assets/jupiter.jpg';
import mars from '../../assets/mars.jpg';
import mercury from '../../assets/mercury.jpg';
import neptune from '../../assets/neptune.jpg';
import saturn from '../../assets/saturn.jpg';
import uranus from '../../assets/uranus.jpg';
import venus from '../../assets/venus.jpg';

export class Planet extends ICelestialBody {
    constructor(name, size, color, position, orbitRadius, orbitSpeed) {
        super(name, size, color, position);

        this.orbitRadius = orbitRadius;
        this.orbitSpeed = orbitSpeed;
        this.orbitAngle = 0;

        // Gezegen geometrisi ve materyali
        this.geometry = new THREE.SphereGeometry(this.size, 32, 32);
        const texture = this.getTexture(name);
        this.material = new THREE.MeshBasicMaterial({ map: texture });
        this.planet = new THREE.Mesh(this.geometry, this.material);

        // İz (trail) için gerekli yapı
        this.trailPoints = [];
        this.maxTrailLength = 300;
        this.trailGeometry = new THREE.BufferGeometry();
        this.trailMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
        this.trail = new THREE.Line(this.trailGeometry, this.trailMaterial);
    }

    create(scene) {
        scene.add(this.planet); // Gezegen
        this.planet.position.set(this.position.x, this.position.y, this.position.z);
        scene.add(this.trail); // İz
    }

    getTexture(name) {
        const textureLoader = new THREE.TextureLoader();
        // Texture adlarına göre eşleştirme yapılır
        switch (name.toLowerCase()) {
            case 'dünya': return textureLoader.load(earth);
            case 'jüpiter': return textureLoader.load(jupiter);
            case 'mars': return textureLoader.load(mars);
            case 'merkür': return textureLoader.load(mercury);
            case 'neptün': return textureLoader.load(neptune);
            case 'satürn': return textureLoader.load(saturn);
            case 'uranüs': return textureLoader.load(uranus);
            case 'venüs': return textureLoader.load(venus);
            default:
                console.warn(`Texture for ${name} not found.`);
                return null;
        }
    }

    updatePosition() {
        const x = this.orbitRadius * Math.cos(this.orbitAngle);
        const z = this.orbitRadius * Math.sin(this.orbitAngle);
        const y = this.orbitRadius * Math.cos(this.orbitAngle) * 0.10;

        this.orbitAngle += this.orbitSpeed;

        // Gezegen pozisyonunu ayarla
        this.planet.position.set(x, y, z);

        // İz için yeni noktayı ekle
        this.trailPoints.push(new THREE.Vector3(x, y, z));

        // Maksimum uzunluğu aşarsa eski noktaları çıkar
        if (this.trailPoints.length > this.maxTrailLength) {
            this.trailPoints.shift();
        }

        // Çizgiyi güncelle
        this.trailGeometry.setFromPoints(this.trailPoints);
    }
}

export default Planet;
import * as THREE from 'three';
import ICelestialBody from '../interfaces/ICelestialBody';


export class Planet extends ICelestialBody {
    constructor(name, size, color, position, orbitRadius, orbitSpeed) {
        super(name, size, color, position);
        this.orbitRadius = orbitRadius; // Yörünge yarıçapı
        this.orbitSpeed = orbitSpeed; // Yörünge hızı
        this.orbitAngle = 0; // Başlangıç açısı
    }

    create(scene) {
        const geometry = new THREE.SphereGeometry(this.size, 32, 32);
        const material = new THREE.MeshStandardMaterial({ color: this.color });
        const planet = new THREE.Mesh(geometry, material);

        scene.add(planet);

        return planet;
    }

    updatePosition() {
        this.orbitAngle += this.orbitSpeed;
        this.position.x = Math.cos(this.orbitAngle) * this.orbitRadius;
        this.position.z = Math.sin(this.orbitAngle) * this.orbitRadius;
    }
}

export default Planet;
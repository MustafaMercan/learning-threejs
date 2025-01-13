import * as THREE from 'three';
import ICelestialBody from '../interfaces/ICelestialBody';


export class Planet extends ICelestialBody {
    constructor(name, size, color, position, orbitRadius, orbitSpeed) {
       
        super(name, size, color, position);
        
        this.orbitRadius = orbitRadius; // Yörünge yarıçapı
        this.orbitSpeed = orbitSpeed; // Yörünge hızı
        this.orbitAngle = 0; // Başlangıç açısı

        this.geometry = new THREE.SphereGeometry(this.size, 32, 32);
        this.material = new THREE.MeshBasicMaterial({ color: this.color });
        this.planet = new THREE.Mesh(this.geometry,this.material);

    }

    create(scene) {
        scene.add(this.planet);
       
        this.planet.position.set(10,1,5);
    }

    updatePosition() {
        this.orbitAngle += this.orbitSpeed;
        const x = Math.cos(this.orbitAngle) * this.orbitRadius +  this.planet.position.x;
        const z = Math.sin(this.orbitAngle) * this.orbitRadius + this.planet.position.z;

        this.planet.position.x = x
        this.planet.position.z = z
    }
}

export default Planet;
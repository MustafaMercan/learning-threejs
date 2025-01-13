import * as THREE from 'three';
import ICelestialBody from '../interfaces/ICelestialBody';

export class Sun extends ICelestialBody {

    constructor(name, size, color, position) {
        super(name, size, color, position);
    }
    create(scene) {
        
        const geometry = new THREE.SphereGeometry(this.size, 32, 32);
        const material = new THREE.MeshBasicMaterial({ color: this.color });
        const sun = new THREE.Mesh(geometry, material);

        scene.add(sun);

        sun.position.set(this.position.x, this.position.y, this.position.z);

        return sun;
    }

}

export default Sun;
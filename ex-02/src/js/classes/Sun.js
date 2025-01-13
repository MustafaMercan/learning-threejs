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

        sun.position.set(0, 0, 0);
        scene.add(sun);

        return sun;
    }

}

export default Sun;
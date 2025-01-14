import * as THREE from 'three';
import ICelestialBody from '../interfaces/ICelestialBody';
import sunTex from '../../assets/sun.jpg'
export class Sun extends ICelestialBody {

    constructor(name, size, color, position) {
        super(name, size, color, position);
    }
    create(scene) {

        const textureLoader = new THREE.TextureLoader();
        const sunTexture = textureLoader.load(sunTex);

        const geometry = new THREE.SphereGeometry(this.size, 32, 32);
        const material = new THREE.MeshBasicMaterial({ map: sunTexture });
        const sun = new THREE.Mesh(geometry, material);

        scene.add(sun);

        sun.position.set(this.position.x, this.position.y, this.position.z);


        const haloGeometry = new THREE.SphereGeometry(105, 64, 64);
        const haloMaterial = new THREE.MeshBasicMaterial({
            color: 0xffff00, // Sarı renk
            transparent: true,
            opacity: 0.2, // Şeffaflık
            side: THREE.BackSide,
        })
        
        const halo = new THREE.Mesh(haloGeometry, haloMaterial);
        scene.add(halo)

        const sunLight = new THREE.PointLight(0xffffaa, 2, 1000); // Güneşe sıcak bir ışık tonu ver
        sunLight.position.set(0, 0, 0); // Güneşin konumu
        scene.add(sunLight);




        return sun;
    }
}

export default Sun;
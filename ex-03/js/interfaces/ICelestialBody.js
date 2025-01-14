export class ICelestialBody {
    constructor(name, size, color, position) {
        if (this.constructor === ICelestialBody) {
            throw new Error("ICelestialBody is an interface and cannot be instantiated directly.");
        }
        this.name = name;
        this.size = size; // Çap
        this.color = color; // Renk
        this.position = position; // { x, y, z }

    }

    create() {
        throw new Error("Method 'create()' must be implemented.");
    }
}
export default ICelestialBody;
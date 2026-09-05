import Transform from "./Transform.js";

export default class GameObject {
    constructor() {
        this.transform = new Transform();
        this.enabled = true;
    }

    update(delta) {
        // Override in child classes
    }

    render(gl) {
        // Override in child classes
    }
}

export default class Camera {
    constructor() {
        this.position = { x: 0, y: 0, z: 5 };
        this.rotation = { x: 0, y: 0 }; // pitch, yaw

        this.moveSpeed = 0.005;
        this.lookSpeed = 0.002;
    }

    update(input, delta) {
        const move = this.moveSpeed * delta;

        if (input.isKeyDown("w")) this.position.z -= move;
        if (input.isKeyDown("s")) this.position.z += move;
        if (input.isKeyDown("a")) this.position.x -= move;
        if (input.isKeyDown("d")) this.position.x += move;
    }

    lookAround(dx, dy) {
        this.rotation.y += dx * this.lookSpeed; // yaw
        this.rotation.x += dy * this.lookSpeed; // pitch

        // clamp pitch so camera doesn't flip
        this.rotation.x = Math.max(-1.5, Math.min(1.5, this.rotation.x));
    }
}

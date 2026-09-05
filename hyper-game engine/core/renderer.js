import { mat4 } from "gl-matrix";

export default class Renderer {
    constructor(gl) {
        this.gl = gl;
        this.viewLocation = null;
        gl.clearColor(0.1, 0.1, 0.1, 1);
    }

    setViewUniformLocation(location) {
        this.viewLocation = location;
    }

    clear() {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    }

    applyCamera(camera) {
        if (this.viewLocation == null) return;

        const view = mat4.create();

        // Rotate by pitch (X)
        mat4.rotateX(view, view, -camera.rotation.x);

        // Rotate by yaw (Y)
        mat4.rotateY(view, view, -camera.rotation.y);

        // Translate by camera position
        mat4.translate(view, view, [
            -camera.position.x,
            -camera.position.y,
            -camera.position.z
        ]);

        this.gl.uniformMatrix4fv(this.viewLocation, false, view);
    }
}

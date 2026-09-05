export default class Triangle {
    constructor(gl, program) {
        this.gl = gl;

        // Triangle vertices
        const vertices = new Float32Array([
            0.0,  0.5, 0.0,
           -0.5, -0.5, 0.0,
            0.5, -0.5, 0.0
        ]);

        // Create buffer
        this.vbo = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

        // Get attribute location
        this.positionLoc = gl.getAttribLocation(program, "position");

        // Enable attribute
        gl.enableVertexAttribArray(this.positionLoc);
        gl.vertexAttribPointer(this.positionLoc, 3, gl.FLOAT, false, 0, 0);
    }

    render() {
        this.gl.drawArrays(this.gl.TRIANGLES, 0, 3);
    }
}

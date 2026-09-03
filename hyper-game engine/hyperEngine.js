// =========================
// 1. ENGINE CLASS
// =========================

class HyperEngine {
    constructor(canvas) {
        this.canvas = canvas;
        this.gl = canvas.getContext("webgl");

        if (!this.gl) {
            alert("WebGL not supported on this browser.");
            return;
        }

        console.log("HyperEngine initialized!");
    }

    start() {
        console.log("Engine started!");
        this.loop();
    }

    loop() {
        requestAnimationFrame(() => this.loop());

        // Clear the screen
        this.gl.clearColor(0.1, 0.1, 0.1, 1);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }
}



// =========================
// 2. SHADER FUNCTIONS
// =========================

// Compile a shader (vertex or fragment)
function compileShader(gl, source, type) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }

    return shader;
}

// Link vertex + fragment shaders into a program
function createProgram(gl, vertexSrc, fragmentSrc) {
    const vertexShader = compileShader(gl, vertexSrc, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(gl, fragmentSrc, gl.FRAGMENT_SHADER);

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error("Program link error:", gl.getProgramInfoLog(program));
        return null;
    }

    return program;
}

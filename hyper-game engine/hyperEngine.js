// =========================
// Imports
// =========================
import Renderer from "./core/renderer.js";
import Camera from "./core/camera.js";
import Scene from "./core/Scene.js";
import Input from "./core/Input.js";
import MouseLook from "./core/MouseLook.js";

// NEW: Shader loader
import { loadShaders } from "./core/ShaderLoader.js";


// =========================
// 1. ENGINE CLASS
// =========================

class HyperEngine {
    constructor(canvas) {
        this.canvas = canvas;
        this.gl = canvas.getContext("webgl");
        this.mouse = new MouseLook();

        if (!this.gl) {
            alert("WebGL not supported on this browser.");
            return;
        }

        console.log("HyperEngine initialized!");

        // Core engine modules
        this.renderer = new Renderer(this.gl);
        this.camera = new Camera();
        this.scene = new Scene();
        this.input = new Input();

        this.lastTime = 0;
        this.program = null; // Shader program
        this.triangle = null; // Will be created later
    }

    async init() {
        // Load shaders + create program
        this.program = await loadShaders(this.gl, createProgram);
        this.triangle = new Triangle(this.gl, this.program);

        // Use the shader program
        this.gl.useProgram(this.program);

        console.log("Shaders loaded and program created!");
    }

    async start() {
        console.log("Engine starting...");

        // Load shaders BEFORE starting the loop
        await this.init();

        requestAnimationFrame((t) => this.loop(t));
    }

    loop(time) {
        const delta = time - this.lastTime;
        this.lastTime = time;

        this.update(delta);
        this.render();

        requestAnimationFrame((t) => this.loop(t));
    }

    update(delta) {
        // Camera WASD movement
        this.camera.update(this.input, delta);

        // Mouse look
        const look = this.mouse.consume();
        this.camera.lookAround(look.dx, look.dy);

        // Update scene objects
        this.scene.update(delta);
    }

    render() {
        this.renderer.clear();

        // Apply camera BEFORE rendering objects
        this.renderer.applyCamera(this.camera);

        // Render scene
        this.scene.render(this.gl);

        // Render triangle (once we add it)
        if (this.triangle) {
            this.triangle.render();
        }
    }
}


// =========================
// 2. SHADER FUNCTIONS
// =========================

// Compile a shader (vertex or fragment)
export function compileShader(gl, source, type) {
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
export function createProgram(gl, vertexSrc, fragmentSrc) {
    const vertexShader = compileShader(gl, vertexSrc, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(gl, fragmentSrc, gl.FRAGMENT_SHADER);

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error("Program link error:", gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return null;
    }

    return program;
}

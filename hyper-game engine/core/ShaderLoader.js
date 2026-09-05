export async function loadShaderFile(path) {
    const response = await fetch(path);
    return await response.text();
}

export async function loadShaders(gl, createProgram) {
    const vertexSrc = await loadShaderFile("./shaders/vertex.glsl");
    const fragmentSrc = await loadShaderFile("./shaders/fragment.glsl");

    const program = createProgram(gl, vertexSrc, fragmentSrc);
    gl.useProgram(program);

    return program;
}

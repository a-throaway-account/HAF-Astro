document.addEventListener("DOMContentLoaded", () => {

const { Renderer, Program, Mesh, Geometry } = ogl;

const container = document.getElementById("grainient");
if (!container) {
  console.error("Grainient container not found");
}

/* ---------- RENDERER ---------- */

const renderer = new Renderer({
  alpha: true,
  antialias: false,
  dpr: Math.min(window.devicePixelRatio, 2)
});

const gl = renderer.gl;
container.appendChild(gl.canvas);

gl.canvas.style.width = "100%";
gl.canvas.style.height = "100%";
gl.canvas.style.display = "block";

/* ---------- FULLSCREEN TRIANGLE ---------- */

const geometry = new Geometry(gl, {
  position: {
    size: 2,
    data: new Float32Array([
      -1, -1,
       3, -1,
      -1,  3
    ])
  }
});

/* ---------- SHADERS ---------- */

const vertex = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `
precision highp float;

uniform vec2 iResolution;
uniform float iTime;

mat2 rot(float a){
    float s = sin(a);
    float c = cos(a);
    return mat2(c,-s,s,c);
}

float noise(vec2 p){
    return fract(sin(dot(p, vec2(12.9898,78.233))) * 43758.5453);
}

void main(){

    vec2 uv = gl_FragCoord.xy / iResolution.xy;
    vec2 tuv = uv - 0.5;

    float t = iTime * 0.25;

    // --- Warp ---
    float angle = sin(tuv.x * 2.0 + t) * 0.5;
    tuv *= rot(angle);

    tuv.x += sin(tuv.y * 4.0 + t) * 0.18;
    tuv.y += sin(tuv.x * 5.0 + t) * 0.18;

    // --- YOUR COLORS ---
    vec3 col1 = vec3(0.529, 0.439, 0.741);  // #8770bd
    vec3 col2 = vec3(0.843, 0.596, 0.396);  // #d79865
    vec3 col3 = vec3(0.973, 0.286, 0.388);  // #f84963

    // --- Layered blending ---
    float blendX = tuv.x;
    float blendY = tuv.y;

    vec3 layer1 = mix(col3, col2, smoothstep(-0.5, 0.5, blendX));
    vec3 layer2 = mix(col2, col1, smoothstep(-0.5, 0.5, blendX));

    vec3 color = mix(layer1, layer2, smoothstep(0.6, -0.6, blendY));

    // --- Reduced grain ---
    float g = noise(uv * 200.0 + iTime * 0.5);
    color += (g - 0.5) * 0.01;

    // Slight contrast boost
    color = (color - 0.5) * 1.2 + 0.5;

    gl_FragColor = vec4(color,1.0);
}

`;


/* ---------- PROGRAM ---------- */

const program = new Program(gl, {
  vertex,
  fragment,
  uniforms: {
    iTime: { value: 0 },
    iResolution: { value: [1, 1] }
  }
});

const mesh = new Mesh(gl, { geometry, program });

/* ---------- RESIZE ---------- */

function resize() {
  const rect = container.getBoundingClientRect();
  renderer.setSize(rect.width, rect.height);
  program.uniforms.iResolution.value = [
    gl.drawingBufferWidth,
    gl.drawingBufferHeight
  ];
}

new ResizeObserver(resize).observe(container);
resize();

/* ---------- LOOP ---------- */

let start = performance.now();

function update(t) {
  program.uniforms.iTime.value = (t - start) * 0.001;
  renderer.render({ scene: mesh });
  requestAnimationFrame(update);
}

requestAnimationFrame(update); });
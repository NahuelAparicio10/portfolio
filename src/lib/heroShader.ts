/**
 * Generative hero background: a full-screen triangle and one fragment shader
 * on raw WebGL 1. No library. Three.js would add ~150 KB for a scene, camera
 * and lights this never uses.
 *
 * The shader combines a perspective grid rolling towards the viewer with a
 * field of particles that drift upwards and are pushed away by the pointer.
 * Both live in the same shader on purpose: two canvases would mean two WebGL
 * contexts and twice the cost for nothing.
 *
 * Cost control lives in the caller-facing contract:
 * - the loop only runs while the hero is on screen and the tab is visible;
 * - the backing store is capped by devicePixelRatio;
 * - `start` returns null when no context is available, so the caller can
 *   keep the poster instead of showing a black hole.
 */

/** Past 1.5x the extra pixels are invisible behind the overlay but still cost fill rate. */
const MAX_PIXEL_RATIO = 1.5;

const VERTEX_SOURCE = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAGMENT_SOURCE = `
precision mediump float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uPointer;   // pixels, origin bottom-left
uniform float uPointerOn;

const vec3 NAVY = vec3(0.027, 0.043, 0.086);
const vec3 ACCENT = vec3(0.376, 0.647, 0.980);
const vec3 ACCENT_LIGHT = vec3(0.576, 0.773, 0.992);
const float HORIZON = -0.08;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

// Grid on a floor plane seen in perspective. Depth grows towards the horizon,
// so line width is scaled by depth to stay roughly one pixel wide.
vec3 floorGrid(vec2 uv) {
  float below = HORIZON - uv.y;
  if (below <= 0.0) return vec3(0.0);

  float z = 0.45 / below;
  float x = uv.x * z;
  // A slow swell running across the floor gives the waves.
  float swell = sin(x * 0.55 + uTime * 0.7) * 0.35 + sin(z * 0.8 - uTime * 1.1) * 0.25;
  vec2 g = vec2(x, z + uTime * 0.9 + swell);

  vec2 cell = abs(fract(g) - 0.5);
  float width = 0.018 * z;
  float line = max(smoothstep(0.5 - width, 0.5, cell.x), smoothstep(0.5 - width, 0.5, cell.y));

  // Brighter crests where the swell peaks, fading with distance.
  float crest = 0.55 + 0.45 * sin(z * 0.8 - uTime * 1.1);
  float fade = exp(-z * 0.09);
  return ACCENT * line * fade * crest;
}

// Particles: one per cell, drifting upwards, pushed away from the pointer.
vec3 particles(vec2 fragPx, float scale, float speed, float seed) {
  vec2 p = fragPx / scale;
  p.y -= uTime * speed;

  vec2 id = floor(p);
  vec2 local = fract(p) - 0.5;
  float r = hash(id + seed);
  vec2 offset = vec2(hash(id + seed + 1.7), hash(id + seed + 3.1)) - 0.5;
  offset *= 0.7;

  // Pointer repulsion, computed in pixels so it feels the same at any size.
  vec2 centerPx = (id + 0.5 + offset) * scale + vec2(0.0, uTime * speed * scale);
  vec2 away = centerPx - uPointer;
  float d = length(away);
  float push = uPointerOn * smoothstep(220.0, 0.0, d);
  offset += normalize(away + 0.0001) * push * 0.45;

  float dist = length(local - offset);
  float size = mix(0.035, 0.09, r);
  float glow = smoothstep(size, 0.0, dist);
  float twinkle = 0.6 + 0.4 * sin(uTime * (1.0 + r * 3.0) + r * 6.28);
  float lit = step(0.55, r);  // only some cells carry a particle

  return mix(ACCENT, ACCENT_LIGHT, r) * glow * twinkle * lit * (1.0 + push * 2.5);
}

void main() {
  vec2 frag = gl_FragCoord.xy;
  vec2 uv = (frag - 0.5 * uRes) / uRes.y;

  vec3 col = NAVY;

  // Horizon glow: a soft band of light where the floor meets the sky.
  col += ACCENT * 0.35 * exp(-abs(uv.y - HORIZON) * 9.0);

  col += floorGrid(uv) * 0.9;
  col += particles(frag, 46.0, 0.35, 0.0) * 0.8;
  col += particles(frag, 90.0, 0.18, 17.0) * 0.5;

  // Pointer halo, subtle.
  float halo = uPointerOn * exp(-length(frag - uPointer) / 180.0);
  col += ACCENT * halo * 0.12;

  // Keep the centre calmer so the headline always reads.
  float centre = smoothstep(0.75, 0.0, length(uv * vec2(0.6, 1.2)));
  col = mix(col, NAVY, centre * 0.45);

  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Hero shader failed to compile:', gl.getShaderInfoLog(shader));
    return null;
  }
  return shader;
}

export interface HeroShader {
  destroy(): void;
}

/**
 * Starts the background on `canvas`, observing `host` for visibility.
 * Returns null when WebGL is unavailable, so the caller can keep the poster.
 */
export function startHeroShader(canvas: HTMLCanvasElement, host: HTMLElement): HeroShader | null {
  const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' });
  if (!gl) return null;

  const vs = compile(gl, gl.VERTEX_SHADER, VERTEX_SOURCE);
  const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SOURCE);
  const program = gl.createProgram();
  if (!vs || !fs || !program) return null;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
  gl.useProgram(program);

  // One oversized triangle covers the viewport with three vertices and no
  // diagonal seam, which a two-triangle quad would have.
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const aPos = gl.getAttribLocation(program, 'aPos');
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  const uRes = gl.getUniformLocation(program, 'uRes');
  const uTime = gl.getUniformLocation(program, 'uTime');
  const uPointer = gl.getUniformLocation(program, 'uPointer');
  const uPointerOn = gl.getUniformLocation(program, 'uPointerOn');

  let frame = 0;
  let onScreen = true;
  let pointerX = -9999;
  let pointerY = -9999;
  let pointerOn = 0;
  let pointerTarget = 0;
  const startTime = performance.now();

  const resize = () => {
    const ratio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO);
    const width = Math.max(1, Math.round(canvas.clientWidth * ratio));
    const height = Math.max(1, Math.round(canvas.clientHeight * ratio));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
    }
  };

  const render = (now: number) => {
    frame = 0;
    resize();
    // Ease the pointer influence in and out instead of popping.
    pointerOn += (pointerTarget - pointerOn) * 0.08;
    gl.uniform2f(uRes, canvas.width, canvas.height);
    gl.uniform1f(uTime, (now - startTime) / 1000);
    gl.uniform2f(uPointer, pointerX, pointerY);
    gl.uniform1f(uPointerOn, pointerOn);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    schedule();
  };

  const schedule = () => {
    if (frame || !onScreen || document.hidden) return;
    frame = requestAnimationFrame(render);
  };

  const pause = () => {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
  };

  // Stop rendering the moment the hero scrolls away: a rAF loop over
  // invisible content is battery thrown away.
  const observer = new IntersectionObserver(([entry]) => {
    onScreen = entry.isIntersecting;
    if (onScreen) schedule();
    else pause();
  });
  observer.observe(host);

  const onVisibility = () => (document.hidden ? pause() : schedule());
  document.addEventListener('visibilitychange', onVisibility);

  const onPointerMove = (event: PointerEvent) => {
    const rect = canvas.getBoundingClientRect();
    const ratio = canvas.width / Math.max(1, rect.width);
    pointerX = (event.clientX - rect.left) * ratio;
    pointerY = (rect.bottom - event.clientY) * ratio;
    pointerTarget = 1;
  };
  const onPointerLeave = () => {
    pointerTarget = 0;
  };
  host.addEventListener('pointermove', onPointerMove);
  host.addEventListener('pointerleave', onPointerLeave);

  schedule();

  return {
    destroy() {
      pause();
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      host.removeEventListener('pointermove', onPointerMove);
      host.removeEventListener('pointerleave', onPointerLeave);
      // Contexts are a scarce per-page resource; release this one explicitly
      // instead of waiting for garbage collection after a client navigation.
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    },
  };
}

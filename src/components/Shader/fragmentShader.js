const fragmentShader = `
varying float vDistance;

void main() {
  vec3 color = vec3(0, 0, 0);
  float strength = distance(gl_PointCoord, vec2(0.5));
  strength = 1.0 - strength;
  strength = pow(strength, 4.0);
  gl_FragColor = vec4(color, strength * 1.5);
}
`;

export default fragmentShader;

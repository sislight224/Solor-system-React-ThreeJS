const vertexShader = `
uniform float uTime;
uniform float uRadius;

varying float vDistance;
varying float distanceFactor;
varying float modelFactor;
varying float speed;
varying float size;
varying vec3 particlePosition;


// Source: https://github.com/dmnsgn/glsl-rotate/blob/main/rotation-3d-y.glsl.js
mat3 rotation3dX(float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return mat3(
    1.0, 0.0, 0.0,
    0.0, c, -s,
    0.0, s, c
  );
}

mat3 rotation3dY(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat3(
        c, 0.0, s,
        0.0, 1.0, 0.0,
        -s, 0.0, c
    );
}

mat3 rotation3dZ(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat3(
        c, -s, 0.0,
        s, c, 0.0,
        0.0, 0.0, 1.0
    );
}

mat3 rotation4(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat3(
        c, 0.0, s,
        0.0, 1.0, 0.0,
        -s, 0.0, c
    );
}

void main() {

  float dista = distance(position, vec3(0.0));
  
  if (dista < 0.5) {
    modelFactor = 0.0;
    distanceFactor = 0.0;
  }
  else {
    if (dista < 2.0){

        distanceFactor = pow(4.5 - dista, 1.5);
        modelFactor = 1.4;
    }
    else {
        distanceFactor = pow(10.0 - dista, 1.0);
        modelFactor = 1.4;
    }
  }
  

  
  if (dista < 1.2) {
        switch (gl_VertexID % 5) {
            case 0:
                speed = 0.01;
                break;
            case 1:
                speed = 0.02;
                break;
            case 2:
                speed = 0.03;
                break;
            case 3:
                speed = 0.05;
                break;
            case 4: 
                speed = 0.06;
                break;
        }
      size = distanceFactor * 10.0 + 10.0;
      
      switch (gl_VertexID % 4) {
          case 0:
              particlePosition = position * rotation3dX(uTime * speed);
              break;
              case 1:
                  particlePosition = position * rotation3dY(uTime * speed);
                  break;
                  case 2:
                      particlePosition = position * rotation3dZ(uTime * speed);
            break;
        case 3:
            particlePosition = position * rotation4(uTime * speed);
            break;
        }
  }
  else {
      switch (gl_VertexID % 5) {
        case 0:
            speed = 0.04;
            break;
        case 1:
            speed = 0.06;
            break;
        case 2:
            speed = 0.08;
            break;
        case 3:
            speed = 0.1;
            break;
        case 4: 
            speed = 0.12;
            break;
      }
    
    switch (gl_VertexID % 4) {
        case 0:
            size = distanceFactor * 10.0 + 9.0;
            break;
        case 1:
            size = distanceFactor * 10.0 + 10.0;
            break;
        case 2:
            size = distanceFactor * 10.0 + 11.0;
            break;
        case 3:
            size = distanceFactor * 10.0 + 24.0;
            break;
      }
    particlePosition = position * rotation3dY(uTime * speed);
  }


  
  vDistance = distanceFactor;

  vec4 modelPosition = modelMatrix * vec4(particlePosition, modelFactor);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;

  gl_PointSize = size;
  gl_PointSize *= (0.3 / - viewPosition.z * 0.5);

}

`;

export default vertexShader;

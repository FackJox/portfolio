uniform float uTime;
varying vec2 vUv; 
varying vec3 vPosition;
varying vec3 vNormal; 
uniform vec2 pixels;
float PI = 3.14159;

varying vec3 FragPos;  

void main()
{
    vUv = uv;
    vPosition = position;
    vNormal = normal;

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0 );
    gl_Position = projectionMatrix * mvPosition;
    FragPos = vec3(modelMatrix * vec4(position, 1.0));
}
 
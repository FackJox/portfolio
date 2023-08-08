300 es
precision highp float;
out vec4 fragColor;
uniform vec2 u_resolution;
uniform float u_time;
uniform vec4 u_mouse;
  
#define R           u_resolution
#define T           u_time
#define M           u_mouse
#define PI          3.141592653
#define PI2         6.283185307

#define MAX_DIST   70.
#define MIN_DIST   1e-3

mat2 rot(float a){return mat2(cos(a),sin(a),-sin(a),cos(a));}
float hash21(vec2 p){return fract(sin(dot(p,vec2(23.73,59.71)))*4832.3234);}

//@iq sdf's + extrude
float opx(in float d, in float z, in float h){
    vec2 w = vec2( d, abs(z) - h );
  	return min(max(w.x, w.y), 0.) + length(max(w, 0.));
}
float box(vec2 p,vec2 b){
    vec2 d = abs(p)-b;
    return length(max(d,0.)) + min(max(d.x,d.y),0.);
}

//@Shane - path function
vec2 path(in float z){
    vec2 p1 =vec2(7.38*sin(z *.15)+5.38*cos(z *.075),2.4*cos(z *.095));
    vec2 p2 =vec2(5.2*sin(z *.09),2.31*sin(z *.13)+3.5*cos(z *.095));
    return (p1 - p2)*.3;
}

mat2 r90;
float tspeed = 0.;

vec3 lp = vec3(0);
const float sz = 1.25;
const float hf = sz/2.;
const float rd = .025;

vec2 map (in vec3 p) {
 	  vec2 res = vec2(1e4,0);
    p.xy += hf;
 	  vec2 tun = p.xy - path(p.z);
    vec3 q = vec3(tun,p.z),
        id = floor((q + hf)/sz);

    float thick  = .0325+.0225*sin(p.z*.75);
          thick -= .01*cos(p.y*.62)+.01*sin(p.x*1.25);
    
    float chk = mod(id.y+mod(id.z+id.x,2.),2.)*2.-1.;
    q = mod(q+hf,sz)-hf;
    
    float hs = hash21(id.xz+id.y);
    float xhs = fract(2.33*hs+id.y);

    if (hs >.5) q.xz *= r90;
    if (chk>.5) q.zy *= r90;

    vec3 q1,q2,q3;
    float trh,trx,jre;

    if(xhs>.65) {
        q1 = q;
        q2 = q + vec3(0,hf,hf);
        q3 = q - vec3(0,hf,hf);
   
        trh = opx(box(q1.xz,vec2(sz,thick)),q1.y,thick)-rd;
        trx = opx(abs(length(q2.yz)-hf)-thick,q.x,thick)-rd;
        jre = opx(abs(length(q3.yz)-hf)-thick,q.x,thick)-rd;
    } else {
        q1 = q + vec3(hf,0,-hf);
        q2 = q + vec3(0,hf,hf);
        q3 = q - vec3(hf,hf,0);
 
        trh = opx(abs(length(q1.xz)-hf)-thick,q.y,thick)-rd;
        trx = opx(abs(length(q2.yz)-hf)-thick,q.x,thick)-rd;
        jre = opx(abs(length(q3.xy)-hf)-thick,q.z,thick)-rd;
    }
    
    if(trh<res.x ) res = vec2(trh,2.);
    if(trx<res.x ) res = vec2(trx,3.);
    if(jre<res.x ) res = vec2(jre,4.);

 	return res;
}

// Tetrahedron technique @iq
// https://iquilezles.org/articles/normalsSDF
vec3 normal(vec3 p, float t) {
    float e = MIN_DIST*t;
    vec2 h =vec2(1,-1)*.5773;
    vec3 n = h.xyy * map(p+h.xyy*e).x+
             h.yyx * map(p+h.yyx*e).x+
             h.yxy * map(p+h.yxy*e).x+
             h.xxx * map(p+h.xxx*e).x;
    return normalize(n);
}

//@iq of hsv2rgb
vec3 hsv2rgb( in vec3 c ) {
    vec3 rgb = clamp( abs(mod(c.x*6.+vec3(0,4,2),6.)-3.)-1., 0., 1.);
    return c.z * mix( vec3(1), rgb, c.y);
}

void main()
{
    // precal
    tspeed = T*.75;
    r90=rot(1.5707);

    vec3 C =vec3(0);
    vec2 uv = (2.*gl_FragCoord.xy-R.xy)/max(R.x,R.y);

    vec3 ro = vec3(0,0,.1);
    vec3 rd = normalize(vec3(uv,-1.));

    // mouse //
    float x = M.xy==vec2(0) ? 0. : -(M.y/R.y*.8-.4)*PI2;
    float y = M.xy==vec2(0) ? 0. : -(M.x/R.x*2.-1.)*PI2;
    mat2 rx = rot(x), ry = rot(y);
    ro.zy *= rx; ro.xz *= ry; 
    rd.zy *= rx; rd.xz *= ry;
  
    ro.z -= tspeed;
    ro.xy += path(ro.z);

    // center tracking
    rd.xy = rot( (.2*sin(T*.3))-path(lp.z).x/ 24. )*rd.xy;
    rd.xz = rot( path(lp.z+1.).y/ 14. )*rd.xz;
  
    float d,m;
    vec3 p = vec3(0);

    for(int i=0;i<98;i++) {
        p = ro+rd*d;
        vec2 ray = map(p);
        d += i<32? ray.x*.35 : ray.x * .85;
        m = ray.y;
        if(ray.x<MIN_DIST*d||d>MAX_DIST)break;
    }

    if(d<MAX_DIST) {
        C = hsv2rgb(vec3(clamp(d*.05,0.,1.)+T*.05,1.,.5));
    } 
    
    // fog level
    C = mix(vec3(.01), C, exp(-.005*d*d*d));
    // gamma correct + output
    C = pow(C, vec3(.4545));
    fragColor = vec4(C,1.);
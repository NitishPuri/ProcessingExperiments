#ifdef GL_ES
precision mediump float;
#endif
// http://www.pouet.net/prod.php?which=57245

#define t u_time
#define r u_resolution

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
    vec3 c = vec3(1);
    float l = 1.0,z=t;
    for(int i=0;i<3;i++) {
        vec2 uv,p=gl_FragCoord.xy/r;
        uv=p;
        p-=.5;
        p.x*=r.x/r.y;
        z+=.07;
        l=length(p);
        uv+=p/l*(sin(z)+1.)*abs(sin(l*9.-z*2.));
        c[i]=.01/length(abs(mod(uv,1.)-.5));
    }
    gl_FragColor=vec4(1);
    gl_FragColor=vec4(c/l,t);
}
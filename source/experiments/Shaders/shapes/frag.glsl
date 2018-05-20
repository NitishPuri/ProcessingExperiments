#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define nm (u_mouse/u_resolution)
// #define st gl_FragCoord/u_resolution

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// Plot a line on Y using a value between 0.0-1.0
float plot(vec2 st, float pct){
  return  smoothstep( pct-0.01, pct, st.y) -
          smoothstep( pct, pct+0.01, st.y);
}

float fabs(float x) {
    return (x > 0.0) ? x : -x;
}

//!!! functions
float waves(float x) {
    return (sin(2.0*PI*x+ u_time) + 1.0)/2.0;
}

float smoothtest(float x) {
    return smoothstep(0.1, 0.9, x);
}

float smoothMouse(float x) {
    return smoothstep(0.0,nm.x,x) -  
                smoothstep(nm.x,1.0,x);
}

float almostIdentity(float x) {
    /*Say you don't want to change a value unless it's too small and screws some of your computations up. 
    Then, rather than doing a sharp conditional branch, you can blend your value with your threshold, and do it smoothly (say, with a cubic polynomial)*/
    float m = 1.0;  // threshold
    float n = nm.x;  // minimum

    if(x > m) return x;

    float a = 2.0 * n - m;
    float b = 2.0 * m - 3.0 * n;
    float t = x / m;

    return (a * t + b) * t * t + n;
}

float impulse(float x) {
    /*
    Great for triggering behaviours or making envelopes for music or animation, and for anything that grows fast and then slowly decays. 
    Use k to control the stretching o the function. Btw, it's maximum, which is 1.0, happens at exactly x = 1/k.
    */
    float k = 1.0 / nm.x;
    float h = k * x;
    return h * exp(1.0 - h);
}

float cubicPulse(float x) {
    /*
    Of course you found yourself doing smoothstep(c-w,c,x)-smoothstep(c,c+w,x) very often, probably cause you were trying to isolate some features. Then this cubicPulse() is your friend. 
    Also, why not, you can use it as a cheap replacement for a gaussian.
    */
    float c = nm.x;
    float w = nm.y;
    x = abs(x - c);
    if(x > w) return 0.0;
    x /= w;
    return 1.0 - x * x * (3.0 - 2.0*x);
}
//!!! functions

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;

    float y = cubicPulse(st.x);

    vec3 color = vec3(y);

    // Plot a line
    float pct = plot(st,y);
    color = (1.0-pct)*color+pct*vec3(0.0,1.0,0.0);

	gl_FragColor = vec4(color,1.320);
}

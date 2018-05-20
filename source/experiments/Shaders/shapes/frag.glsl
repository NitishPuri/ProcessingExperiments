#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define nm (u_mouse/u_resolution)
// #define st gl_FragCoord/u_resolution

#define func parabola

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
// uniform float u_fraction;


// HSV2RGB
vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}
// Plot a line on Y using a value between 0.0-1.0
float plot(vec2 st, float pct){
  return  smoothstep( pct-0.01, pct, st.y) -
          smoothstep( pct, pct+0.01, st.y);
}

//!!! functions

float identity(float x) {
    return x;
}

float wave(float x) {
    return (sin(nm.x*PI*x+ u_time) + 1.0)/2.0;
}

float waves(float x) {
    float y = 0.0;
    x += u_time*0.5;
    bool even = true;
    const float num = 10.0;
    float a = 1.0/(2.0*num);
    for (float j = 0.0; j < num; j++) {
        y += ( (0.0 + (even ? sin(x) : cos(x))) * a * nm.y);        
        even = !even;
        x += nm.x * 3.0;
    }
    return y + 0.5;
}

float smoothtest(float x) {
    return smoothstep(0.1, 0.9, x);
}

float smoothMouse(float x) {
    float t = nm.x;
    return smoothstep(0.0,t,x) -  
                smoothstep(t,1.0,x);
}

float almostIdentity(float x) {
    /*Say you don't want to change a value unless it's too small and screws some of your computations up. 
    Then, rather than doing a sharp conditional branch, you can blend your value with your threshold, and do it smoothly (say, with a cubic polynomial)*/
    float m = nm.x;  // threshold
    float n = nm.y;  // minimum

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

float expStep(float x) {
    /*A natural attenuation is an exponential of a linearly decaying quantity: exp(-x).
     A gaussian, is an exponential of a quadratically decaying quantity: exp(-x²).
      You can go on increasing powers, and get a sharper and sharper smoothstep(), until you get a step() in the limit.*/
      float k = 1.0/nm.x;
    //   float k = 1.0;
      return exp(-k * pow(x , nm.y*10.0));
}

float gain(float x) {
    /*Remapping the unit interval into the unit interval by expanding the sides and compressing the center, and keeping 1/2 mapped to 1/2, that can be done with the gain() function.
    This was a common function in RSL tutorials (the Renderman Shading Language). 
    k=1 is the identity curve, k<1 produces the classic gain() shape, and k>1 produces "s" shaped curves. The curves are symmetric (and inverse) for k=a and k=1/a.*/
    float t = nm.x * 2.0;
    float k = (t < 1.0) ? t : t*20.0-19.0;
    // float k = 15.;
    float a = 0.5 * pow(2.0 * (x < 0.5 ? x : 1.0 - x), k);
    return (x < 0.5) ? a : 1.0 - a;
}
float parabola(float x) {
    /*
    A nice choice to remap the 0...1, such that the corners are rempped to 0 and the center to 1. 
    */
    float k = (2.0*nm.x) + 1.0;
    return pow(4.0 * x * (k - x), nm.y*2.0);
}

float pcurve(float x) {
    float a = nm.x;
    float b = nm.y;
    float k = pow(a+b, a+b) / (pow(a, a)*pow(b, b));
    // float k = 1.0;
    return k * pow(x, a) * pow(1.0-x, b);
}
float sinc(float x) {
    float k = nm.x*10.0+1.0;
    float a = PI * (k * x - 1.0);
    return abs(sin(a)/a);
}
float blinnWyvillCosineApproximation (float x){
    float x2 = x*x;
    float x4 = x2*x2;
    float x6 = x4*x2;
    
    float fa = ( 4.0/9.0);
    float fb = (17.0/9.0);
    float fc = (22.0/9.0);
    
    float y = fa*x6 - fb*x4 + fc*x2;
    return y;
}

float doubleCubicSeatWithLinearBlend (float x){

    float a = nm.x;
    float b = nm.y;

    float epsilon = 0.00001;
    float min_param_a = 0.0 + epsilon;
    float max_param_a = 1.0 - epsilon;
    float min_param_b = 0.0;
    float max_param_b = 1.0;
    a = min(max_param_a, max(min_param_a, a));  
    b = min(max_param_b, max(min_param_b, b)); 
    b = 1.0 - b; //reverse for intelligibility.
    
    float y = 0.0;
    if (x<=a){
        y = b*x + (1.0-b)*a*(1.0-pow(1.0-x/a, 3.0));
    } else {
        y = b*x + (1.0-b)*(a + (1.0-a)*pow((x-a)/(1.0-a), 3.0));
    }
    return y;
}

float doubleOddPolynomialSeat (float x){

    float n = 3.0;
    float a = nm.x;
    float b = nm.y;

    float epsilon = 0.00001;
    float min_param_a = 0.0 + epsilon;
    float max_param_a = 1.0 - epsilon;
    float min_param_b = 0.0;
    float max_param_b = 1.0;
    a = min(max_param_a, max(min_param_a, a));  
    b = min(max_param_b, max(min_param_b, b)); 

    float p = 2.0*n + 1.0;
    float y = 0.0;
    if (x <= a){
        y = b - b*pow(1.0-x/a, p);
    } else {
        y = b + (1.0-b)*pow((x-a)/(1.0-a), p);
    }
    return y;
}

float doublePolynomialSigmoid (float x){
  
    float n = 5.0;
  
    float y = 0.0;
    if (mod(n,2.0) == 0.0){ 
        // even polynomial
        if (x<=0.5){
        y = pow(2.0*x, n)/2.0;
        } else {
        y = 1.0 - pow(2.0*(x-1.0), n)/2.0;
        }
    } 
    
    else { 
        // odd polynomial
        if (x<=0.5){
        y = pow(2.0*x, n)/2.0;
        } else {
        y = 1.0 + pow(2.0*(x-1.0), n)/2.0;
        }
    }

    return y;
}

float quadraticThroughAGivenPoint (float x){
  
    float a = nm.x;
    float b = nm.y;
  
    float epsilon = 0.00001;
    float min_param_a = 0.0 + epsilon;
    float max_param_a = 1.0 - epsilon;
    float min_param_b = 0.0;
    float max_param_b = 1.0;
    a = min(max_param_a, max(min_param_a, a));  
    b = min(max_param_b, max(min_param_b, b)); 
    
    float A = (1.0-b)/(1.0-a) - (b/a);
    float B = (A*(a*a)-b)/a;
    float y = A*(x*x) - B*(x);
    y = min(1.0,max(0.0,y)); 
    
    return y;
}
//!!! functions

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;

    float y = func(st.x);
    // float y =st.x;

    // vec3 color = vec3(y);
    vec3 color = hsv2rgb(vec3(y, 1, 0.7)); 

    // Plot a line
    float pct = plot(st,y);
    color = (1.0-pct)*color+pct*vec3(0.0,1.0,0.0);

	gl_FragColor = vec4(color,1.0);
}

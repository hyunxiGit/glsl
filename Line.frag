#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
vec2 uv = 2.*gl_FragCoord.xy/u_resolution - vec2(1.);
float pixwlWidth = 1.5/u_resolution.y;

vec3 c;

void draw_coodinate ()
{
	float x = smoothstep(pixwlWidth, -pixwlWidth , abs(uv.x));
	float y = smoothstep(pixwlWidth, -pixwlWidth , abs(uv.y));
	float v = max (2.*x,2.*y);
	//second value to adjust how strong a line is
	float m = smoothstep(0.05,0.1,v);
	c = mix(c, vec3(0.,1.,0.), m);
}

void draw_Line(vec2 uv , float v )
{
	float v1 = smoothstep(v-pixwlWidth,v+pixwlWidth,uv.y);
	float v2 = smoothstep(v-pixwlWidth,v+pixwlWidth,uv.y - pixwlWidth);
	v = v1-v2;
	float m = smoothstep(0.1,0.3,v);
	c = mix(c, vec3(1.,0.,0.), m);
}

void draw_gradient(vec2 uv , float v)
{
	c = vec3(v,v,v);
}

float g_linear (float x)
{
		return x;
}

float impulse( float k, float x ){
	//k is how compact the gradient is
    float h = k*x;
    return h*exp(1.0-h);
}

float powAbs(float x)
{
	return 1.-pow(abs(x),0.5);
}


void main()
{
	float v = powAbs(uv.x);

	//put curv fun in v, draw line or draw gradient
	draw_gradient(uv,v);
	draw_Line(uv,v);
	draw_coodinate();
	vec4 col = vec4(c,1.);
	gl_FragColor = col;
}
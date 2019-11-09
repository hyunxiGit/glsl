#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
vec2 uv = 2.*gl_FragCoord.xy/u_resolution - vec2(1.);
float pixwlWidth = 1.5/u_resolution.y;

vec3 c;

#define c_red vec3(1.,0.,0.)
#define c_yellow vec3(1.,1.,0.)
#define c_green vec3(0.,1.,0.)
#define c_cyan vec3(0.,1.,1.)
#define c_blue vec3(0.,0.,1.)
#define purple vec3(1.,0.,1.)



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

float circleEaseout( float r)
{
	return sqrt(r-uv.x*uv.x);
}

void draw_rainbow(float v)
{
	v = length(uv);
	if(v <1.)
	{
		float step = 1/6.;
		float t = smoothstep(step,step*2.,v);
		c = c_red;
		c = mix (c_red, c_yellow,t);
		t = smoothstep(step*3,step*4.,v);
		c = mix (c, c_green,t);
		t = smoothstep(step*4,step*5.,v);
		c = mix (c, c_cyan,t);
		t = smoothstep(step*5,step*6.,v);
		c = mix (c, c_blue,t);
	}
}

void main()
{

	float v = circleEaseout (1.);
	draw_rainbow(v);
	draw_Line(uv , v );
	draw_coodinate();
	vec4 col = vec4(c,1.);
	gl_FragColor = col;
}
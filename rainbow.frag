#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
vec2 uv = 2.*gl_FragCoord.xy/u_resolution - vec2(1.);
float pixwlWidth = 1.5/u_resolution.y;

vec3 c;

const float PI = 3.1415926535897932384626433832795;

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
	//this is not quite correct , because there will be a gap between r and g , yellow is missing
	v = length(uv);
	if(v <1.)
	{
		float r = cos((v-0.25)*PI*2.);
		float g = cos((v-0.25-0.33333)*PI*2.);
		float b = cos((v-0.25-0.66666)*PI*2.);
		c= vec3(r,g,b);
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
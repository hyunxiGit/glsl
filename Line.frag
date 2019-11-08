#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float plotLine(vec2 uv , float v )
{
	float pixwlWidth = 1.5/u_resolution.y;
	float v1 = smoothstep(v-pixwlWidth,v+pixwlWidth,uv.y);
	float v2 = smoothstep(v-pixwlWidth,v+pixwlWidth,uv.y - pixwlWidth);
	return v1-v2;
}

void main()
{
	vec2 uv = gl_FragCoord.xy/u_resolution;
	float v = sin(uv.x);
	float l = plotLine(uv , v) ;
	vec3 c = lerp ( vec3(v),vec3(0.,1.,0.),l);
	vec4 col = vec4(c,1.);
	gl_FragColor = col;
}
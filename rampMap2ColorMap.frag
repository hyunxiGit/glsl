#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform float u_time;

uniform sampler2D u_tex0;
uniform sampler2D u_tex1;
uniform vec2 u_tex0Resolution;

void main (void) {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    float aspect = u_resolution.x/u_resolution.y;
    st.x *= aspect;

    vec3 color = vec3(0.0);
    color = vec3(st.x, st.y, (1.0+sin(u_time))*0.5);

    if ( u_tex0Resolution != vec2(0.0) ){
        float imgAspect = u_tex0Resolution.x/u_tex0Resolution.y;
        //ramp
        vec4 img0 = texture2D(u_tex0,st*vec2(1.,imgAspect));
        //greyscale map
        float sample_grey = texture2D(u_tex1,st*vec2(1.,imgAspect)).r;
        //convert grey
        vec2 my_sample_grey_uv = vec2(sample_grey,0.5);
        vec4 sample_color = texture2D(u_tex0,my_sample_grey_uv);
        color = sample_color.rgb;
    }

    gl_FragColor = vec4(color,1.0);
}

//command
//D:\glslViewer\bin\x64\Release\glslViewer rampMap2ColorMap.frag 2d\ramp.png 2d\Wood-Texture-Detail_grey.png
import { Colors } from '@/constants/colors';
import { ExpoWebGLRenderingContext, GLView } from 'expo-gl';
import { ReactNode } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

export default function Background({ children, style }: { children?: ReactNode, style?: StyleProp<ViewStyle> }) {
  return (
    <GLView style={[styles.glView, style]} onContextCreate={onContextCreate}>
      { children ? children : null }
    </GLView>
  );
}

async function onContextCreate(gl: ExpoWebGLRenderingContext) {

  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)

  window.addEventListener('resize', async function(_) {
    await new Promise(resolve => this.setTimeout(resolve, 10)) // wait until buffer size is correctly set
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
  }, true)

  gl.clearColor(0, 0, 0, 0)
  gl.enable(gl.BLEND)
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

  const vertexShader = gl.createShader(gl.VERTEX_SHADER)!
  gl.shaderSource(
      vertexShader,
      `
      attribute vec4 a_position;

      void main(void) {
          gl_Position = a_position;
      }
      `
  )
  gl.compileShader(vertexShader)

  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!
  gl.shaderSource(fragmentShader,
    `
    precision mediump float;

    uniform vec2 u_resolution;
    uniform float u_time;

    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

    // Description : GLSL 2D simplex noise function
    //      Author : Ian McEwan, Ashima Arts
    //  Maintainer : ijm
    //     Lastmod : 20110822 (ijm)
    //     License : MIT
    //  Copyright (C) 2011 Ashima Arts. All rights reserved.
    //  Distributed under the MIT License. See LICENSE file.
    //  https://github.com/ashima/webgl-noise
    //
    float snoise(vec2 v) {

        // Precompute values for skewed triangular grid
        const vec4 C = vec4(0.211324865405187,
          // (3.0-sqrt(3.0))/6.0
          0.366025403784439,
          // 0.5*(sqrt(3.0)-1.0)
          -0.577350269189626,
          // -1.0 + 2.0 * C.x
          0.024390243902439);
          // 1.0 / 41.0

        // First corner (x0)
        vec2 i  = floor(v + dot(v, C.yy));
        vec2 x0 = v - i + dot(i, C.xx);

        // Other two corners (x1, x2)
        vec2 i1 = vec2(0.0);
        i1 = (x0.x > x0.y)? vec2(1.0, 0.0):vec2(0.0, 1.0);
        vec2 x1 = x0.xy + C.xx - i1;
        vec2 x2 = x0.xy + C.zz;

        // Do some permutations to avoid
        // truncation effects in permutation
        i = mod289(i);
        vec3 p = permute(
          permute( i.y + vec3(0.0, i1.y, 1.0))
                 + i.x + vec3(0.0, i1.x, 1.0 ));

        vec3 m = max(0.5 - vec3(
            dot(x0,x0),
            dot(x1,x1),
            dot(x2,x2)
          ), 0.0);

        m = m*m ;
        m = m*m ;

        // Gradients:
        //  41 pts uniformly over a line, mapped onto a diamond
        //  The ring size 17*17 = 289 is close to a multiple
        //      of 41 (41*7 = 287)

        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;

        // Normalise gradients implicitly by scaling m
        // Approximation of: m *= inversesqrt(a0*a0 + h*h);
        m *= 1.79284291400159 - 0.85373472095314 * (a0*a0+h*h);

        // Compute final noise value at P
        vec3 g = vec3(0.0);
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * vec2(x1.x,x2.x) + h.yz * vec2(x1.y,x2.y);
        return 130.0 * dot(m, g);
    }
    // End of GLSL 2D simplex noise function

    float bar(float t, float w, float v) {
      return step(t - w / 2.0, v) - step(t + w / 2.0, v);
    }

    const float contourNumber = 10.0;

    float contours(float v, float w) {
      float result = 0.0;
      for (float t = 1.0; t <= contourNumber; t++) {
        result += bar(t / (float(contourNumber) + 1.0), w, v);
      }
      return result;
    }

    const vec3 color = vec3(0.05);
    const float displacement = 1000.0;

    void main(void) {
      vec2 st = gl_FragCoord.xy / u_resolution.xy;
      st.x *= u_resolution.x / u_resolution.y;
      st *= 3.0;

      float time = u_time * 0.05;

      vec2 st1 = st + displacement + vec2(time);
      vec2 st2 = st - displacement - vec2(time);

      float noise = (snoise(st1) + snoise(st2)) * 0.25 + 0.5;
      gl_FragColor = vec4(color, contours(noise, 0.01));
    }
    `
  )
  gl.compileShader(fragmentShader)

  const program = gl.createProgram()
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)

  const positionAttributeLocation = gl.getAttribLocation(program, "a_position")
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
  const quad_positions = [
    -1, 1,
    1, 1,
    -1, -1,
    1, -1,
    -1, -1,
    1, 1
  ]
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(quad_positions), gl.STATIC_DRAW)

  gl.useProgram(program)

  gl.enableVertexAttribArray(positionAttributeLocation)
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

  const size = 2
  const type = gl.FLOAT
  const normalize = false
  const stride = 0
  const offset = 0
  gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset)

  const resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution")
  gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height)

  const timeUniformLocation = gl.getUniformLocation(program, "u_time")

  function animate(elapsedTime: number) {
    gl.clear(gl.COLOR_BUFFER_BIT)

    elapsedTime *= 0.001;
    gl.uniform1f(timeUniformLocation, elapsedTime)

    const count = 6
    gl.drawArrays(gl.TRIANGLES, offset, count)

    gl.flush()
    gl.endFrameEXP()
    window.requestAnimationFrame(animate)
  }
  animate(0)
}

const styles = StyleSheet.create({
  glView: {
    flex: 1,
    zIndex: -1,
    backgroundColor: Colors.backgroundDark
  }
})

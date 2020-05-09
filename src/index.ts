import { BufferInfo, ProgramInfo } from "./types";

import {
  defaultFragmentShader,
  defaultVertexShader,
  initShaderProgram
} from "./shaders";

import drawScene from "./drawScene";

const startup = () => {
  const canvas = document.querySelector("#main-canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("webgl");

  if (!ctx) {
    throw new Error("Could not find HTML canvas!");
  }

  const shaderProgram = initShaderProgram(
    ctx,
    defaultVertexShader,
    defaultFragmentShader
  );

  if (!shaderProgram) {
    throw new Error("Unable to initialise shader program");
  }

  // Create a buffer for the square's positions.
  const positionBuffer = ctx.createBuffer();

  // Select the positionBuffer as the one to apply buffer
  // operations to from here out.
  ctx.bindBuffer(ctx.ARRAY_BUFFER, positionBuffer);

  // Now create an array of positions for the square.
  // prettier-ignore
  // const positions = [
  //   -1.0,  1.0,
  //    1.0,  1.0,
  //   -1.0, -1.0,
  //    1.0, -1.0,
  // ];

  // Array of positions for J
  // prettier-ignore
  const positions = [
    -1.0,  1.0, 1.0, 1.0, -1.0, 0.9,
    -1.0, 0.9, 1.0, 0.9, 1.0, 1.0,
    -0.05, 0.9, -0.05, -0.9, 0.05, 0.9,
    -0.05, -0.9, 0.05, -0.9, 0.05, 0.9,
    -1.2, -1.0, -1.2, -0.9, 0.05, -1.0,
    -1.2, -0.9, 0.05, -0.9, 0.05, -1.0
  ];

  // Now pass the list of positions into WebGL to build the
  // shape. We do this by creating a Float32Array from the
  // JavaScript array, then use it to fill the current buffer.
  ctx.bufferData(
    ctx.ARRAY_BUFFER,
    new Float32Array(positions),
    ctx.STATIC_DRAW
  );

  const programInfo: ProgramInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: ctx.getAttribLocation(shaderProgram, "aVertexPosition")
    },
    uniformLocations: {
      projectionMatrix: ctx.getUniformLocation(
        shaderProgram,
        "uProjectionMatrix"
      ),
      modelViewMatrix: ctx.getUniformLocation(shaderProgram, "uModelViewMatrix")
    },
    vertexInfo: {
      vertexCount: positions.length / 2
    }
  };

  const buffers: BufferInfo = {
    position: positionBuffer
  };

  drawScene(ctx, programInfo, buffers);
};

startup();

export type ATTRIB_LOCATION = number;
export type UNIFORM_LOCATION = WebGLUniformLocation | null;

export interface ProgramInfo {
  program: WebGLProgram;
  attribLocations: {
    vertexPosition: ATTRIB_LOCATION;
  };
  uniformLocations: {
    projectionMatrix: UNIFORM_LOCATION;
    modelViewMatrix: UNIFORM_LOCATION;
  };
}

export interface BufferInfo {
  position: WebGLBuffer | null;
}

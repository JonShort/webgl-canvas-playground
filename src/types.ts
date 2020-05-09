export type ATTRIB_LOCATION = number;
export type UNIFORM_LOCATION = WebGLUniformLocation | null;

export interface ProgramInfo {
  attribLocations: {
    vertexPosition: ATTRIB_LOCATION;
  };
  program: WebGLProgram;
  uniformLocations: {
    projectionMatrix: UNIFORM_LOCATION;
    modelViewMatrix: UNIFORM_LOCATION;
  };
  vertexInfo: {
    vertexCount: number;
  };
}

export interface BufferInfo {
  position: WebGLBuffer | null;
}

import React, { useEffect, useRef } from 'react'

import * as BABYLON from '@babylonjs/core';
import '@babylonjs/loaders';
// import * as BABYLONMat from '@babylonjs/materials';

function App() {
  const canvas = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // babylon engine 및 scene
    const engine: BABYLON.Engine = new BABYLON.Engine(canvas.current, true);
    const scene: BABYLON.Scene = new BABYLON.Scene(engine);

    // Playground code start
    // 구
    // const camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0, 5, -10), scene);
    // camera.setTarget(BABYLON.Vector3.Zero());
    // camera.attachControl(canvas.current, true);
    // const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene);
    // light.intensity = 0.7;
    // const sphere = BABYLON.MeshBuilder.CreateSphere('sphere', {diameter: 2, segments: 32}, scene);
    // sphere.position.y = 1;

    // 큐브
    // const camera = new BABYLON.ArcRotateCamera('camera', 3 * Math.PI / 4, Math.PI / 4, 4, BABYLON.Vector3.Zero(), scene);
    // camera.attachControl(canvas, true);
    // const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(1, 1, 0), scene);
    // const box = BABYLON.MeshBuilder.CreateBox('box', {height: 1, width: 1, depth: 1}, scene);

    // 집
    const camera = new BABYLON.ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 2.5, 10, new BABYLON.Vector3(0, 0, 0), scene);
    camera.attachControl(canvas.current, true);
    const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(1, 1, 0), scene);
    const groundMat = new BABYLON.StandardMaterial('groundMat', scene);
    groundMat.diffuseColor = new BABYLON.Color3(0, 1, 0)
    const roofMat = new BABYLON.StandardMaterial('roofMat', scene);
    roofMat.diffuseTexture = new BABYLON.Texture('https://assets.babylonjs.com/environments/roof.jpg', scene);
    const boxMat = new BABYLON.StandardMaterial('boxMat', scene);
    boxMat.diffuseTexture = new BABYLON.Texture('https://assets.babylonjs.com/environments/cubehouse.png', scene);
    const faceUV = [];
    // vector (lower left x, lower left y, upper right x, upper right y)
    faceUV[0] = new BABYLON.Vector4(0.5, 0.0, 0.75, 1.0); //rear face
    faceUV[1] = new BABYLON.Vector4(0.0, 0.0, 0.25, 1.0); //front face
    faceUV[2] = new BABYLON.Vector4(0.25, 0, 0.5, 1.0); //right side
    faceUV[3] = new BABYLON.Vector4(0.75, 0, 1.0, 1.0); //left side
    // top 4, bottom 5 위 아래는 지붕과 지면으로 인해 안보여서 set 하지 않는다.
    const box = BABYLON.MeshBuilder.CreateBox('box', { faceUV: faceUV, wrap: true });
    box.position.y = 0.5;
    box.material = boxMat;
    const roof = BABYLON.MeshBuilder.CreateCylinder('roof', { diameter: 1.3, height: 1.2, tessellation: 3 });
    roof.scaling.x = 0.75;
    roof.rotation.z = Math.PI / 2;
    roof.position.y = 1.22;
    roof.material = roofMat;
    const ground = BABYLON.MeshBuilder.CreateGround('ground', { width:10, height:10 });
    ground.material = groundMat;
    // Playground code end

    // 렌더링
    engine.runRenderLoop(() => {
      scene!.render();
    });
  }, []);

  return (
    <canvas ref={canvas} style={{ width:'100%', height: '100%' }}></canvas>
  );
}

export default App;

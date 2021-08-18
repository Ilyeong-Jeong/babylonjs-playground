import React, { useEffect, useRef } from 'react'

import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import * as BABYLONMaterials from 'babylonjs-materials';

function App() {
  const canvas = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // babylon engine 및 scene 인스턴스화
    const engine: BABYLON.Engine = new BABYLON.Engine(canvas.current, true);
    const scene: BABYLON.Scene = new BABYLON.Scene(engine);

    // Playground code start
    // 큐브
    const camera = new BABYLON.ArcRotateCamera('camera', 3 * Math.PI / 4, Math.PI / 4, 4, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(1, 1, 0), scene);
    const box = BABYLON.MeshBuilder.CreateBox('box', {height: 1, width: 1, depth: 1}, scene);
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

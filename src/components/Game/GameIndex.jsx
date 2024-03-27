import React, { useState } from "react";
import { PerspectiveCamera, Environment, Text3D } from "@react-three/drei";
import { Vector3 } from 'three';
import SphereEnv from './SphereEnv';
import Airplane from './Airplane';
import { Targets } from "./Targets";
import { Canvas } from "@react-three/fiber";
import './GameIndex.css'

function GameIndex() {
  
  const [planePosition, setPlanePosition] = useState(new Vector3(0, 3, 7));

  return (
    <div className="game">
      <Canvas shadows>
        <SphereEnv/>
        <Environment background={false} files={'assets/textures/envmap.hdr'}/>
        <PerspectiveCamera makeDefault position={[0, 10, 10]}/>
        <Text3D position={[-4,0,0]} font={'fonts/Crash.json'}>Hangman Heaven
          <meshStandardMaterial color="red" metalness={1} roughness={0}/>
        </Text3D>
        <Targets planePosition={planePosition} />
        <Airplane planePosition={planePosition} />
      </Canvas>
    </div>
  );
}

export default GameIndex;
















// import React from "react";
// import { PerspectiveCamera, Environment, OrbitControls } from "@react-three/drei";
// import SphereEnv from './SphereEnv';
// import Airplane from './Airplane';
// import { Terrain } from "./terrain";


// function App() {
  
//   return (
//     <>
//       <SphereEnv/>
//       <Environment background={false} files={'assets/textures/envmap.hdr'}/>

//       <PerspectiveCamera makeDefault position={[0, 10, 10]}/>
//       {/* <OrbitControls target={[0, 0, 0]}/> */}
//       <Terrain/>

//       <Airplane/>
       
//     </>
//   )
// }

// export default App

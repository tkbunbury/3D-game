import { useContext } from 'react';
import GameStatsContext from '../../Contexts/GameStatsContext/GameStatsContext';
import { BackSide } from 'three';
import { useTexture } from '@react-three/drei';
import { Sparkles } from '@react-three/drei';
import {
    EffectComposer,
    DepthOfField,
    Bloom,
    Noise,
    Vignette
  } from "@react-three/postprocessing";


function SphereEnv(){

    const {gameEnvironment, setGameEnvironment} = useContext(GameStatsContext)
    
    if (gameEnvironment === 'Heaven'){
        const map = useTexture('assets/textures/puresky.jpg');
        return (
        <>
        <mesh>
            <sphereGeometry args={[60, 50, 50]} />
            <meshBasicMaterial
                side={BackSide}
                map={map}
            />
        </mesh>
        <EffectComposer multisampling={0} disableNormalPass={true}>
        <Bloom
          luminanceThreshold={0}
          luminanceSmoothing={0.9}
          height={300}
          opacity={1.5}
        />
      </EffectComposer>
        </>
        )
    }
    if (gameEnvironment === 'Underwater'){
        const map = useTexture('assets/textures/envmap.jpg');
        return (
        <>
        <Sparkles
            color={'black'}
            size={25}
            count={500}
            noise={5}
            opacity={0.2}
            speed={10}
            scale={[60, 50, 50]}
        />
        <mesh>
            <sphereGeometry args={[60, 50, 50]} />
            <meshBasicMaterial
                side={BackSide}
                map={map}
            />
        </mesh>
        <EffectComposer multisampling={0} disableNormalPass={true}>
        <DepthOfField
          focusDistance={0}
          focalLength={0.02}
          bokehScale={2}
          height={480}
        />
        <Bloom
          luminanceThreshold={0}
          luminanceSmoothing={2}
          height={300}
          opacity={2}
        />
        <Noise opacity={0.025} />
      </EffectComposer>
        </>
        )
    }
    if (gameEnvironment === 'Space'){
        const map = useTexture('assets/textures/spaceHDRI.jpeg');
        return (
        <>
        <Sparkles
            color={'white'}
            size={3}
            count={5000}
            noise={0}
            opacity={0.5}
            speed={0}
            scale={[60, 50, 50]}
        />
        <mesh>
            <sphereGeometry args={[60, 50, 50]} />
            <meshBasicMaterial
                side={BackSide}
                map={map}
            />
        </mesh>
        <EffectComposer multisampling={0} disableNormalPass={true}>
        <Bloom
          luminanceThreshold={0.5}
          luminanceSmoothing={100}
          height={200}
          opacity={0.5}
        />
      </EffectComposer>
        </>
        )
    }
}

export default SphereEnv;
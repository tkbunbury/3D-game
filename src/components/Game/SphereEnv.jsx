import { useTexture } from '@react-three/drei';
import { BackSide } from 'three';

function SphereEnv(){
    const map = useTexture('assets/textures/puresky.jpg');


    return <mesh>
            <sphereGeometry args={[60, 50, 50]} />
            <meshBasicMaterial
                side={BackSide}
                map={map}
            />

        </mesh>
    

}

export default SphereEnv;
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Matrix4, Quaternion, Vector3 } from 'three';
import { updatePlaneAxis } from './controls';

const x = new Vector3(1, 0, 0);
const y = new Vector3(0, 1, 0);
const z = new Vector3(0, 0, 1);

const delayedRotMatrix = new Matrix4();
const delayedQuaternion = new Quaternion();

function Airplane({ planePosition }) {

    const { scene } = useGLTF('/jet_gltf/scene.gltf');
    const airplaneRef = useRef();

    useFrame(({ camera }) => {
        updatePlaneAxis(x, y, z, planePosition, camera)
        const rotMatrix = new Matrix4().makeBasis(x, y, z)
        
        const matrix = new Matrix4()
            .multiply(new Matrix4().makeTranslation(planePosition.x, planePosition.y, planePosition.z))
            .multiply(rotMatrix)
            .multiply(new Matrix4().makeScale(0.007, 0.007, 0.007));
            

        airplaneRef.current.matrixAutoUpdate = false;
        airplaneRef.current.matrix.copy(matrix);
        airplaneRef.current.matrixWorldNeedsUpdate = true;

        let quaternionA = new Quaternion().copy(delayedQuaternion);
        let quaternionB = new Quaternion();
        quaternionB.setFromRotationMatrix(rotMatrix);

        let interpolationFactor = 0.175;
        let interpolatedQuaternion = new Quaternion().copy(quaternionA);
        interpolatedQuaternion.slerp(quaternionB, interpolationFactor);
        delayedQuaternion.copy(interpolatedQuaternion);

        delayedRotMatrix.identity();
        delayedRotMatrix.makeRotationFromQuaternion(delayedQuaternion);

        const cameraMatrix = new Matrix4()
            .multiply(new Matrix4().makeTranslation(planePosition.x, planePosition.y, planePosition.z))
            .multiply(delayedRotMatrix)
            .multiply(new Matrix4().makeRotationX(-0.2))
            .multiply(
            new Matrix4().makeTranslation(0, 0.015, 0.3)
      );

    camera.matrixAutoUpdate = false;
    camera.matrix.copy(cameraMatrix);
    camera.matrixWorldNeedsUpdate = true;
    });

    return (
        <primitive object={scene} ref={airplaneRef} position={planePosition} scale={[0.007, 0.007, 0.007]} />
    );
}

export default Airplane;












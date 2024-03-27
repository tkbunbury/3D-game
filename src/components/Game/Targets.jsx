import { Text3D } from "@react-three/drei";
import { extend } from '@react-three/fiber'
import { useFrame } from "@react-three/fiber";
import { useState, useMemo } from "react";
import { Vector3 } from "three";
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js'


extend({ TextGeometry })

function randomPoint(scale){
    return new Vector3(
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
        Math.random() * 2 - 1
        ).multiply(scale || new Vector3(1, 1, 1));
}

const TARGET_RAD = 0.08;
const alphabet = ['A','B','C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

export function Targets(props){
    const { planePosition } = props;
    const [targets, setTargets] = useState(() => {
        const arr = [];
        for (let i = 0; i < alphabet.length; i++) {
          arr.push({
            center: randomPoint(new Vector3(4, 1, 4)).add(
              new Vector3(0, 2 + Math.random() * 2, 0)
            ),
            direction: randomPoint().normalize(),
            hit: false,
            id: alphabet[i]
          });
        }
    
        return arr;
      });

    const letterMap = useMemo(() => {
        const letterGeoArr = [];
    
        targets.forEach((target) => {
                let letterColor;
                if (target.id === 'A' || target.id === 'E' || target.id === 'I' || target.id === 'O' || target.id === 'U'){
                  letterColor = 'red'
                }
                else {letterColor = '#FFA000'}
                const textMesh = <Text3D
                key = {target.id} 
                size={.1} 
                height={0.03} 
                position={[target.center.x-0.03, target.center.y-0.03, target.center.z]} 
                font={'node_modules/three/examples/fonts/droid/droid_serif_regular.typeface.json'} 
                brevelSegments={.51}
                bevelEnabled
                bevelSize={0.008}
                bevelThickness={0.003}>
                    {target.id}
                    <meshStandardMaterial color={letterColor} roughness={0} metalness={1}/>
                </Text3D>
                letterGeoArr.push(textMesh)    
          
        });
        return letterGeoArr
      }, [targets]);

    useFrame(() => {
        targets.forEach((target, i) => {
          const v = planePosition.clone().sub(target.center);
          const dist = target.direction.dot(v);
          const projected = planePosition
            .clone()
            .sub(target.direction.clone().multiplyScalar(dist));
    
          const hitDist = projected.distanceTo(target.center);
          if (hitDist < TARGET_RAD) {
            target.hit = true;
          }
        });
        const atLeastOneHit = targets.find((target) => target.hit);
        if (atLeastOneHit) {
          setTargets(targets.filter((target) => {
                if(target.hit){
                    console.log(target.id)
                }
                return !target.hit
            }));
        }
      });
      
      return (
          <group>{letterMap.map((letterMesh)=>{
            return letterMesh
          })}</group>
    );
};
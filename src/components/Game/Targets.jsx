import { Text3D } from "@react-three/drei";
import { useSound } from 'use-sound'
import popSFX from '../../sounds/pop-sound.wav'
import { useUser } from "../../Contexts/UserContext/userContext";
import { extend } from '@react-three/fiber'
import { useFrame } from "@react-three/fiber";
import { useMemo } from "react";
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js'
import compareArrays from "../../utils/array-compare";

extend({ TextGeometry })

const TARGET_RAD = 0.09;

export function Targets(props){
    const { planePosition, newGuess, setNewGuess, guessesArray, setGuessesArray, gameBoardState, setGameBoardState, wordToGuess, lives, setLives, targets, setTargets } = props;
    const { currentScore } = useUser()
    const { setCurrentScore } = useUser()
    const [playSound] = useSound(popSFX, {interrupt: false, playbackRate: 1})
  
    const letterMap = useMemo(() => {
        const letterGeoArr = [];
    
        targets.forEach((target) => {
                let letterColor;
                if (target.id === 'A' || target.id === 'E' || target.id === 'I' || target.id === 'O' || target.id === 'U'){
                  letterColor = 'red'
                }
                else {letterColor = '#FFA000'}
                const textMesh = 
                <Text3D
                key = {target.id} 
                size={.1} 
                height={0.03} 
                position={[target.center.x-0.03, target.center.y-0.03, target.center.z]} 
                font={'fonts/Droid Serif_Regular.json'} 
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
      let lastHit;
        targets.forEach((target, i) => {
          const projected = planePosition.clone()
          const hitDist = projected.distanceTo(target.center);
          if (hitDist < TARGET_RAD) {
            target.hit = true;
          }
        });
        const atLeastOneHit = targets.find((target) => target.hit);
        if (atLeastOneHit) {
          setTargets(targets.filter((target) => {
            if(target.hit){
              if(target.id !== lastHit){
                lastHit = target.id
                    setNewGuess(target.id)
                    handleGuess(target.id)
                  }
                }
                return !target.hit
            }));
        }
      });

      const handleGuess = (guess) => {
        playSound()
        let score = 0
        setGuessesArray([...guessesArray, guess])
        let newGameBoard = [...gameBoardState]
        for (let i=0;i<wordToGuess.length; i++){
            if(guess === wordToGuess[i]){
              score += 50
              newGameBoard[i] = guess
            }
          }
        
        if (compareArrays(newGameBoard, gameBoardState) === true){
          setNewGuess('')
          setLives(lives -1)
        }
        if (compareArrays(newGameBoard, gameBoardState) === false){
          setNewGuess('')
          setCurrentScore(currentScore + score)
          setGameBoardState(newGameBoard)
        }
      }
      
      return (
          <group>{letterMap.map((letterMesh)=>{
            return letterMesh
          })}</group>
  );
};
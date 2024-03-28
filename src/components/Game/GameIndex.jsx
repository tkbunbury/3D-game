import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PerspectiveCamera, Environment, Text3D } from "@react-three/drei";
import { Vector3 } from 'three';
import SphereEnv from './SphereEnv';
import Airplane from './Airplane';
import { Targets } from "./Targets";
import { Canvas } from "@react-three/fiber";
import { getRandomWord } from "../../utils/random-word-api"
import { resetLetters } from "../../utils/reset-letters";
import './GameIndex.css'

function GameIndex() {

  const navigate = useNavigate();

  const [planePosition, setPlanePosition] = useState(new Vector3(0, 3, 7));
  
  const [targets, setTargets] = useState([])

  const [gameCount, setGameCount] = useState(1)
  const [currentScore, setCurrentScore] = useState(0)
  const [wordToGuess, setWordToGuess] = useState('')
  const [gameBoardState, setGameBoardState] = useState([])
  const [newGuess, setNewGuess] = useState('');
  const [guessesArray, setGuessesArray] = useState([])
  const [lives, setLives] = useState(5);
  const [toggleReset, setToggleReset] = useState(false)

  useEffect(() => {
    getRandomWord().then((word) => {
      setWordToGuess(word.toUpperCase())
      return word
    })
    .then((word) => {
      let gameBoard = []
      for (let i=0;i<word.length;i++){
        gameBoard.push('_')
      }
      setGameBoardState(gameBoard)
      setGuessesArray([])
      setTargets(resetLetters())
      setCurrentScore(0)
      setPlanePosition(new Vector3(0, 3, 7))
    }).catch((err) => {
      console.log(err)
    })
  }, [toggleReset])

const handleReset = () => {
  console.log('reset clicked')
  setToggleReset((curr) => !curr)
}

if (lives === 0){
  navigate('/finalscore')
}

let lettersGuessed = 0
  gameBoardState.forEach((letter) => {
    if (letter !== '_') {
      lettersGuessed++
    }
  })

if ((lettersGuessed === gameBoardState.length) && wordToGuess !== ''){
  navigate('/finalscore')}



  return (
    <>
    <div className="game">
    <div id="overlay-container">
      <div id="overlay-top">
      <div id="gameboard">
            <h1>{gameBoardState}</h1>
          </div>
      </div>
      <div id="overlay-bot">
          <div>
            <h1>Score: {currentScore}</h1>
          </div>
          <div>
            <h1>Lives: {lives}</h1>
          </div>
          <div>
            <h1>Guesses: {guessesArray}</h1>
          </div>
        </div>
    </div>
      <Canvas shadows>
        <SphereEnv/>
        <Environment background={false} files={'assets/textures/envmap.hdr'}/>
        <PerspectiveCamera makeDefault position={[0, 10, 10]}/>
        <Text3D position={[-4,0,0]} font={'fonts/Crash.json'}>Hangman Heaven
          <meshStandardMaterial color="red" metalness={1} roughness={0}/>
        </Text3D>
        <Targets targets={targets} setTargets={setTargets} currentScore={currentScore} setCurrentScore={setCurrentScore} planePosition={planePosition} newGuess={newGuess} setNewGuess={setNewGuess} guessesArray={guessesArray} setGuessesArray={setGuessesArray} gameBoardState={gameBoardState} setGameBoardState={setGameBoardState} wordToGuess={wordToGuess} lives={lives} setLives={setLives}/>
        <Airplane planePosition={planePosition} />
      </Canvas>
    </div>
    <button onClick={() => {handleReset()}}>reset</button>
    </>
  );
}

export default GameIndex;
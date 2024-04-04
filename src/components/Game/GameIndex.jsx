import { useState, useEffect, Suspense, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useSound } from 'use-sound'
import hornSFX from '../../sounds/mlg-airhorn.mp3'
import { useUser } from "../../Contexts/UserContext/userContext";
import { PerspectiveCamera, Environment, Text3D, Loader, Sparkles } from "@react-three/drei";
import { Vector3 } from 'three';
import SphereEnv from './SphereEnv';
import Airplane from './Airplane';
import { Targets } from "./Targets";
import { Canvas, useFrame } from "@react-three/fiber";
import { getRandomWord } from "../../utils/random-word-api"
import { resetLetters } from "../../utils/reset-letters";
import { BlendFunction } from "postprocessing"
import everyWord from "../../utils/random-word-array";
import GameStatsContext from "../../Contexts/GameStatsContext/GameStatsContext";
import './GameIndex.css'
import { EffectComposer, HueSaturation } from "@react-three/postprocessing";
import { MotionBlur } from "./MotionBlur";
const x = new Vector3(1, 0, 0);
const y = new Vector3(0, 1, 0);
const z = new Vector3(0, 0, 1);
const xyzArr = [x,y,z]

function GameIndex() {

  const navigate = useNavigate();

  // console.log(everyWord[Math.floor((Math.random())*(everyWord.length))], '<<< local random')

  const { currentScore, setCurrentScore } = useUser()

  const [planePosition, setPlanePosition] = useState(new Vector3(0, 3, 7));
  const [outOfBounds, setOutOfBounds] = useState(false)
  const [targets, setTargets] = useState([])
  const [previousWordHidden, setPreviousWordHidden] = useState('0')
  const [gameCount, setGameCount] = useState(0)
  const [previousWord, setPreviousWord] = useState()
  const [wordToGuess, setWordToGuess] = useState('')
  const [gameBoardState, setGameBoardState] = useState([])
  const [newGuess, setNewGuess] = useState('');
  const [guessesArray, setGuessesArray] = useState([])
  const [lives, setLives] = useState(5);
  const [toggleReset, setToggleReset] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [isError, setIsError]  = useState(false)
  const [givenError, setGivenError] = useState({})
  const [winLimiter, setWinLimiter] = useState(0)
  const {finalWord, setFinalWord, allWords, setAllWords, gameEnvironment, setGameEnvironment, soundOn, setSoundOn, motionBlur, setMotionBlur, isHardMode} = useContext(GameStatsContext)
  const [playSound] = useSound(hornSFX, {interrupt: false, playbackRate: 1, soundEnabled: soundOn})

  useEffect(() => {
    setPreviousWord(wordToGuess)
    setGameStarted(false)
    setIsError(false)
    setGivenError({})
    getRandomWord().then((word) => {
      setWordToGuess(word.toUpperCase())
      console.log(word, '<<< word to guess')
      return word
    })
    .then((word) => {
      setFinalWord(word)
      setAllWords([...allWords, word])
      let gameBoard = []
      for (let i=0;i<word.length;i++){
        gameBoard.push('_')
      }
      setGameBoardState(gameBoard)
      setGuessesArray([])
      setTargets(resetLetters())
      setPlanePosition(new Vector3(0, 3, 7))
      xyzArr[0].set( 1, 0, 0);
      xyzArr[1].set( 0, 1, 0);
      xyzArr[2].set( 0, 0, 1);
      setWinLimiter(0)
      setGameStarted(true)
      if(gameCount > 0){
        if (!isHardMode){
          setLives(5)
        }
        setCurrentScore((curr) => curr + 200)
        playSound()
        setPreviousWordHidden('1')
        setTimeout(()=>{setPreviousWordHidden('0')}, 2500)
        
      }
      setGameCount(gameCount + 1)
    }).catch((err) => {
      setGivenError(err)
      setIsError(true)
      console.log(err)
    })
  }, [toggleReset])

const handleReset = () => {
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

if ((lettersGuessed === gameBoardState.length) && wordToGuess !== '' && winLimiter === 0){
  console.log('game won - resetting')
  
  setWinLimiter((curr) => curr + 1)
  setToggleReset((curr) => !curr)
}

if (isError){
  return ( 
  <>
  <p>The request for a random word has failed. Don't worry, it wasnt anything you did (hopefully).</p>
  <p>Error: {givenError.message}</p>
  <p>Code: {givenError.code}</p>
  <p>Click this button to try it again.</p>
  <button onClick={() => {handleReset()}}>reset</button>
  </>
  )
}
  return (
    <>
    <div className="game">
    {gameStarted ? 
      <div id="overlay-container">
      <div id="overlay-top">
        <div id="gameboard">
          <h1>{gameBoardState}</h1>
        </div>
      </div>
      <div id="overlay-mid">
        {outOfBounds && <div className={'blink-me'} >
          <h1> !! TURN BACK !! </h1>
        </div>}
        <div className={'guessed-correctly'} style={{opacity: previousWordHidden}}>
          <h1>Word Guessed: {previousWord}</h1>
          <h1>+200</h1>
        </div>
      </div>
      <div id="overlay-bot">
          <h1>Score: {currentScore}</h1>
          <h1>Lives: {lives}</h1>
          <h1>Guesses: {guessesArray}</h1>
      </div>
    </div>
    : 
    <><p id="give-it-a-second-message">give it a second...</p></>
    }
      <Suspense fallback={null}>
      <Canvas shadows>
          <SphereEnv/>
          <Environment background={false} files={'assets/textures/envmap.hdr'}/>
          <PerspectiveCamera makeDefault position={[0, 10, 10]}/>
          <Text3D position={[-4,0,0]} font={'fonts/Crash.json'}>Hangman Heaven
            <meshStandardMaterial color="red" metalness={1} roughness={0}/>
          </Text3D>
          <Targets targets={targets} setTargets={setTargets} currentScore={currentScore} setCurrentScore={setCurrentScore} planePosition={planePosition} newGuess={newGuess} setNewGuess={setNewGuess} guessesArray={guessesArray} setGuessesArray={setGuessesArray} gameBoardState={gameBoardState} setGameBoardState={setGameBoardState} wordToGuess={wordToGuess} lives={lives} setLives={setLives}/>
          <Airplane planePosition={planePosition} xyzArr={xyzArr} outOfBounds={outOfBounds} setOutOfBounds ={setOutOfBounds}/>
      </Canvas>
      </Suspense>
      <Loader />
    </div>
    </>
  );
}


export default GameIndex;
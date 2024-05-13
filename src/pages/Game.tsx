import { useEffect, useRef, useState } from 'react';
//import axios from 'axios';
import ExpressionType from '../types.ts';
import Score from '../components/Score.tsx';
import ProgressBar from '../components/ProgressBar.tsx';
import { useSelector } from 'react-redux';
import { selectGameMode, selectIsFontSizeLarge } from '../app/store.ts';
import {
  spanishExampleExpressionsData,
  englishExampleExpressionsData,
} from '../exampleExpressions.ts';
import { useNavigate } from 'react-router-dom';
import {
  getACertainNumberOfExpressionsElement,
  shuffleArray,
} from '../utils/functions.ts';
//import { serverBaseUrl as url } from '../config.ts';
import { GameMode } from '../features/game/gameModeSlice.ts';
import { numberOfExpressions } from '../config.ts';
import Choice from '../components/Choice.tsx';

const Game = () => {
  const navigate = useNavigate();

  // TODO: handle status in redux
  const [loading, setLoading] = useState(true);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [expressions, setExpressions] = useState<ExpressionType[]>([]);
  const [activeExpressionIndex, setActiveExpressionIndex] = useState(0);
  const [isClickable, setIsClickable] = useState(true);

  const score = useRef(0);

  const isFontSizeLarge = useSelector(selectIsFontSizeLarge);
  const gameMode = useSelector(selectGameMode);

  // if no game mode choosen redirect user
  useEffect(() => {
    if (!gameMode) {
      navigate('/chooseLanguage', { replace: true });
    }
  }, [navigate, gameMode]);

  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLDivElement>,
    isThisTheCorrectAnswer: boolean
  ) => {
    if (event.key === 'Enter') {
      handleChoice(isThisTheCorrectAnswer);
    }
  };

  useEffect(() => {
    if (gameMode === GameMode.EnglishToSpanish) {
      const shuffeledExpressions = getACertainNumberOfExpressionsElement(
        englishExampleExpressionsData,
        numberOfExpressions
      );
      setExpressions(shuffeledExpressions);
      setLoading(false);
    } else {
      const shuffeledExpressions = getACertainNumberOfExpressionsElement(
        spanishExampleExpressionsData,
        numberOfExpressions
      );
      setExpressions(shuffeledExpressions);
      setLoading(false);
    }
  }, [isGameFinished, gameMode]);

  function getChoicesInShuffledOrder(activeExpression: ExpressionType) {
    const shuffledOrders = shuffleArray([1, 2, 3]);

    const activeExpressionChoices = [
      {
        answer: activeExpression?.rightAnswer,
        order: shuffledOrders[0],
        correct: true,
      },
      {
        answer: activeExpression?.falseAnswerOne,
        order: shuffledOrders[1],
        correct: false,
      },
      {
        answer: activeExpression?.falseAnswerTwo,
        order: shuffledOrders[2],
        correct: false,
      },
    ];

    // sort activeExpressionChoices by order number
    activeExpressionChoices.sort((a, b) => a.order - b.order);

    return activeExpressionChoices;
  }

  const activeExpressionChoices = getChoicesInShuffledOrder(
    expressions[activeExpressionIndex]
  );

  function resetGame() {
    setLoading(true);
    setIsGameFinished(false);
    score.current = 0;
    setActiveExpressionIndex(0);
  }

  // create fade in anmation for header
  useEffect(() => {
    setFadeIn(true);
    const timer = setTimeout(() => {
      setFadeIn(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [activeExpressionIndex]);

  // show score when it is appropriate
  useEffect(() => {
    function handleFinish() {
      if (numberOfExpressions === activeExpressionIndex) {
        setIsGameFinished(true);
      }
    }
    handleFinish();
  }, [activeExpressionIndex]);

  function handleChoice(correctAnswerChosen: boolean) {
    if (correctAnswerChosen) {
      setIsClickable(false);
      console.log('The correct answer has been chosen');
      setTimeout(() => {
        score.current++;
        handleActiveExpressionIncrement();
      }, 1000);
      setIsClickable(true);
    } else {
      setIsClickable(false);
      console.log('Incorrect');
      setTimeout(() => {
        handleActiveExpressionIncrement();
      }, 1000);
      setIsClickable(true);
    }
  }

  const progress = (activeExpressionIndex / numberOfExpressions) * 100;

  function handleActiveExpressionIncrement() {
    setActiveExpressionIndex((curr) => curr + 1);
  }

  return (
    <div className="h-full relative flex justify-start items-center flex-col gap-3 font-nova overflow-x-hidden mt-3  mx-3">
      {loading && <p>Loading...</p>}
      {loading && <span className="loading loading-infinity loading-lg"></span>}
      {!loading && !isGameFinished && (
        <>
          <ProgressBar progress={progress} />
          <div
            id="expressionsContainer"
            className={`flex flex-col text-center justify-center w-full md:max-w-xl items-center gap-3 transition-all duration-300 ${
              fadeIn
                ? 'opacity-0 translate-x-full'
                : 'opacity-100 translate-x-0'
            }`}
          >
            <h2 className={isFontSizeLarge ? 'text-4xl my-6' : 'text-2xl my-6'}>
              {expressions[activeExpressionIndex]?.expression}
            </h2>
            <div className="flex flex-col gap-3 w-full overflow-hidden">
              {activeExpressionChoices.map((choice, id) => (
                <Choice
                  key={`${choice.answer}-choice-${id}`}
                  order={choice.order}
                  handleChoice={handleChoice}
                  handleKeyPress={handleKeyPress}
                  isClickable={isClickable}
                  content={choice.answer}
                  isThisTheCorrectAnswer={choice.correct}
                />
              ))}
            </div>
          </div>
        </>
      )}
      {/* show score */}
      {isGameFinished && (
        <Score
          score={score.current}
          resetGame={resetGame}
        />
      )}
    </div>
  );
};

export default Game;

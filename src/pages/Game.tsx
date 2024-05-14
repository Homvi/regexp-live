import { useEffect, useRef, useState } from 'react';
//import axios from 'axios';
import { ExpressionType, ChoiceType } from '../types.ts';
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
  const [activeExpressionChoices, setActiveExpressionChoices] = useState<
    ChoiceType[]
  >([]);

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
    answerChosen: string
  ) => {
    if (event.key === 'Enter') {
      handleChoice(answerChosen);
    }
  };

  // Extracted logic to get shuffled expressions
  const fetchExpressions = (data: ExpressionType[]) => {
    const shuffledExpressions = getACertainNumberOfExpressionsElement(
      data,
      numberOfExpressions
    );
    setExpressions(shuffledExpressions);
    setLoading(false);
  };

  // get expressions, shuffle them and set as a state
  useEffect(() => {
    if (gameMode === GameMode.EnglishToSpanish) {
      fetchExpressions(englishExampleExpressionsData);
    } else {
      fetchExpressions(spanishExampleExpressionsData);
    }
  }, [isGameFinished, gameMode]);

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

  const activeExpression = expressions[activeExpressionIndex];

  function handleChoice(answerChosen: string) {
    const isCorrect = answerChosen === activeExpression?.rightAnswer;
    setIsClickable(false);
    highlightChoices(answerChosen);
    console.log(isCorrect ? 'The correct answer has been chosen' : 'Incorrect');
    setTimeout(() => {
      if (isCorrect) score.current++;
      handleActiveExpressionIncrement();
      setIsClickable(true);
    }, 1000);
  }

  function getChoicesInShuffledOrder(activeExpression: ExpressionType) {
    const shuffledOrders = shuffleArray([1, 2, 3]);

    const activeExpressionChoices = [
      {
        answer: activeExpression?.rightAnswer,
        order: shuffledOrders[0],
        correct: true,
        highlight: false,
      },
      {
        answer: activeExpression?.falseAnswerOne,
        order: shuffledOrders[1],
        correct: false,
        highlight: false,
      },
      {
        answer: activeExpression?.falseAnswerTwo,
        order: shuffledOrders[2],
        correct: false,
        highlight: false,
      },
    ];

    // sort activeExpressionChoices by order number
    activeExpressionChoices.sort((a, b) => a.order - b.order);

    return activeExpressionChoices;
  }

  function highlightChoices(answerChosen: string) {
    setActiveExpressionChoices((prevChoices) =>
      prevChoices.map((choice) =>
        choice.answer === answerChosen || choice.correct
          ? { ...choice, highlight: true }
          : choice
      )
    );
  }

  useEffect(() => {
    const activeExpressionChoices = getChoicesInShuffledOrder(
      expressions[activeExpressionIndex]
    );
    setActiveExpressionChoices(activeExpressionChoices);
  }, [activeExpressionIndex, expressions]);

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
                  isHighlighted={choice.highlight}
                  isCorrect={choice.correct}
                  handleChoice={handleChoice}
                  handleKeyPress={handleKeyPress}
                  isClickable={isClickable}
                  content={choice.answer}
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

import { useSelector } from 'react-redux';
import { selectIsFontSizeLarge } from '../app/store';
import { useEffect, useState } from 'react';

interface ChoiceProps {
  handleChoice: (correctAnswerChosen: boolean) => void;
  handleKeyPress: (
    event: React.KeyboardEvent<HTMLDivElement>,
    isThisTheCorrectAnswer: boolean
  ) => void;
  content: string;
  isThisTheCorrectAnswer: boolean;
  isClickable: boolean;
  order: number;
}

const Choice: React.FC<ChoiceProps> = ({
  handleChoice,
  handleKeyPress,
  content,
  isThisTheCorrectAnswer,
  isClickable,
  order,
}) => {
  const isFontSizeLarge = useSelector(selectIsFontSizeLarge);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, order * 700); // Increasing the delay to make it more noticeable

    return () => clearTimeout(timer);
  }, [order]); // Adding 'order' to dependency array to make it clear it's used here

  return (
    <div
      onClick={() => {
        if (isClickable) {
          handleChoice(isThisTheCorrectAnswer);
        }
      }}
      onKeyDown={(e) => handleKeyPress(e, isThisTheCorrectAnswer)}
      className={` 
      ${isVisible ? 'opacity-100' : 'opacity-0'}

       order-${order} w border-2 min-w-[200px] md:min-w-[500px] w-full flex justify-center items-center p-3 rounded-lg cursor-pointer transition-all duration-100`}
    >
      <p className={isFontSizeLarge ? 'text-xl' : 'text-md'}>{content}</p>
    </div>
  );
};

export default Choice;

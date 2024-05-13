export type ExpressionType = {
  id: number;
  expression: string;
  rightAnswer: string;
  falseAnswerOne: string;
  falseAnswerTwo: string;
};

export type ChoiceType = {
  answer: string;
  order: number;
  correct: boolean;
  highlight: boolean;
};

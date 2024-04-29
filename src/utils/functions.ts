export function getRandomNumbers(
  from: number = 0,
  to: number = 2,
  length: number = 3
): number[] {
  // Validate the input to ensure there are enough unique values in the range
  const rangeSize = to - from + 1;
  if (length > rangeSize) {
    throw new Error(
      "The range between 'from' and 'to' is too small to generate the requested number of unique numbers."
    );
  }

  const randomNumbers: number[] = [];
  while (randomNumbers.length < length) {
    const randomNumber = Math.floor(Math.random() * rangeSize) + from;
    if (!randomNumbers.includes(randomNumber)) {
      randomNumbers.push(randomNumber);
    }
  }
  return randomNumbers;
}

/**
 * Determines the delay before showing an answer based on its order index.
 * @param answerIndex The index of the current answer.
 * @param delays An array of delays corresponding to the order indexes.
 * @returns The delay in milliseconds.
 */
export const getDelayForAnswer = (answerIndex: number, randomNumbers: number[]): number => {
    const orderIndex = randomNumbers.indexOf(answerIndex);
    switch (orderIndex) {
      case 0:
        return 500; // First to appear
      case 1:
        return 1000; // Second to appear
      case 2:
        return 1500; // Third to appear
      default:
        return 0; // No delay if index not found
    }
  };

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
export const getDelayForAnswer = (
  answerIndex: number,
  randomNumbers: number[]
): number => {
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

export function getACertainNumberOfExpressionsElement<T>(
  array: T[],
  quantity: number = 5
): T[] {
  // Check if the requested quantity is greater than the array length
  if (quantity >= array.length) {
    return array.slice(); // Returns a copy of the array if the quantity exceeds or matches the array length
  }

  // Shuffle the array and pick the first `quantity` elements
  const shuffled = [...array]; // Create a copy of the array to avoid mutating the original
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
  }

  return shuffled.slice(0, quantity); // Return the first `quantity` elements of the shuffled array
}

export const shuffleArray = (array: number[]) => {
  const newArray = array.slice(); // Create a copy to avoid mutating the original array
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]]; // Swap elements
  }
  return newArray;
};

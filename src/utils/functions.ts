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

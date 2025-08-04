import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  shuffleArray,
  getACertainNumberOfExpressionsElement,
  shuffleArrayLegacy,
  getRandomNumbers,
  getDelayForAnswer,
} from './functions'

describe('shuffleArray', () => {
  beforeEach(() => {
    // Mock Math.random to return values that will actually shuffle the array
    let counter = 0
    vi.spyOn(Math, 'random').mockImplementation(() => {
      counter++
      return (counter % 5) / 5 // Returns 0, 0.2, 0.4, 0.6, 0.8 in sequence
    })
  })

  it('should shuffle an array of numbers', () => {
    const original = [1, 2, 3, 4, 5]
    const shuffled = shuffleArray(original)
    
    // Should not mutate the original array
    expect(original).toEqual([1, 2, 3, 4, 5])
    
    // Should return a new array with the same elements
    expect(shuffled).toHaveLength(5)
    expect(shuffled.sort()).toEqual([1, 2, 3, 4, 5])
    
    // Should return a different array reference
    expect(shuffled).not.toBe(original)
  })

  it('should shuffle an array of strings', () => {
    const original = ['apple', 'banana', 'cherry']
    const shuffled = shuffleArray(original)
    
    expect(original).toEqual(['apple', 'banana', 'cherry'])
    expect(shuffled).toHaveLength(3)
    expect(shuffled.sort()).toEqual(['apple', 'banana', 'cherry'])
  })

  it('should handle empty arrays', () => {
    const original: number[] = []
    const shuffled = shuffleArray(original)
    
    expect(shuffled).toEqual([])
    expect(original).toEqual([])
  })

  it('should handle single element arrays', () => {
    const original = [42]
    const shuffled = shuffleArray(original)
    
    expect(shuffled).toEqual([42])
    expect(original).toEqual([42])
  })

  it('should handle arrays with duplicate elements', () => {
    const original = [1, 1, 2, 2, 3]
    const shuffled = shuffleArray(original)
    
    expect(original).toEqual([1, 1, 2, 2, 3])
    expect(shuffled).toHaveLength(5)
    expect(shuffled.sort()).toEqual([1, 1, 2, 2, 3])
  })

  it('should work with objects', () => {
    const original = [{ id: 1 }, { id: 2 }, { id: 3 }]
    const shuffled = shuffleArray(original)
    
    expect(original).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }])
    expect(shuffled).toHaveLength(3)
    expect(shuffled.map(item => item.id).sort()).toEqual([1, 2, 3])
  })
})

describe('getACertainNumberOfExpressionsElement', () => {
  beforeEach(() => {
    // Mock Math.random to return values that will actually shuffle the array
    let counter = 0
    vi.spyOn(Math, 'random').mockImplementation(() => {
      counter++
      return (counter % 5) / 5 // Returns 0, 0.2, 0.4, 0.6, 0.8 in sequence
    })
  })

  it('should return specified number of elements', () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const result = getACertainNumberOfExpressionsElement(array, 3)
    
    expect(result).toHaveLength(3)
    expect(array).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) // Original unchanged
  })

  it('should return all elements when quantity equals array length', () => {
    const array = [1, 2, 3]
    const result = getACertainNumberOfExpressionsElement(array, 3)
    
    expect(result).toHaveLength(3)
    expect(result.sort()).toEqual([1, 2, 3])
  })

  it('should return all elements when quantity exceeds array length', () => {
    const array = [1, 2, 3]
    const result = getACertainNumberOfExpressionsElement(array, 5)
    
    expect(result).toHaveLength(3)
    expect(result.sort()).toEqual([1, 2, 3])
  })

  it('should use default quantity of 5', () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const result = getACertainNumberOfExpressionsElement(array)
    
    expect(result).toHaveLength(5)
  })

  it('should work with different data types', () => {
    const array = ['a', 'b', 'c', 'd', 'e', 'f']
    const result = getACertainNumberOfExpressionsElement(array, 3)
    
    expect(result).toHaveLength(3)
    expect(array).toEqual(['a', 'b', 'c', 'd', 'e', 'f'])
  })
})

describe('shuffleArrayLegacy', () => {
  beforeEach(() => {
    // Mock Math.random to return values that will actually shuffle the array
    let counter = 0
    vi.spyOn(Math, 'random').mockImplementation(() => {
      counter++
      return (counter % 5) / 5 // Returns 0, 0.2, 0.4, 0.6, 0.8 in sequence
    })
  })

  it('should work the same as the new shuffleArray for number arrays', () => {
    const original = [1, 2, 3, 4, 5]
    
    // Test that shuffleArrayLegacy works correctly
    const legacyResult = shuffleArrayLegacy(original)
    
    // Should not mutate the original array
    expect(original).toEqual([1, 2, 3, 4, 5])
    
    // Should return a new array with the same elements
    expect(legacyResult).toHaveLength(5)
    expect(legacyResult.sort()).toEqual([1, 2, 3, 4, 5])
    expect(legacyResult).not.toBe(original)
  })

  it('should maintain backward compatibility', () => {
    const original = [10, 20, 30]
    const result = shuffleArrayLegacy(original)
    
    expect(result).toHaveLength(3)
    expect(result.sort()).toEqual([10, 20, 30])
  })
})

describe('getRandomNumbers', () => {
  beforeEach(() => {
    // Mock Math.random to return predictable values
    let counter = 0
    vi.spyOn(Math, 'random').mockImplementation(() => {
      counter++
      return (counter % 3) / 3 // Returns 0, 0.33, 0.66 in sequence
    })
  })

  it('should generate the specified number of unique random numbers', () => {
    const result = getRandomNumbers(1, 10, 3)
    
    expect(result).toHaveLength(3)
    expect(new Set(result).size).toBe(3) // All numbers should be unique
    result.forEach(num => {
      expect(num).toBeGreaterThanOrEqual(1)
      expect(num).toBeLessThanOrEqual(10)
    })
  })

  it('should use default parameters', () => {
    const result = getRandomNumbers()
    
    expect(result).toHaveLength(3)
    result.forEach(num => {
      expect(num).toBeGreaterThanOrEqual(0)
      expect(num).toBeLessThanOrEqual(2)
    })
  })

  it('should throw error when range is too small', () => {
    expect(() => getRandomNumbers(1, 2, 5)).toThrow(
      "The range between 'from' and 'to' is too small to generate the requested number of unique numbers."
    )
  })
})

describe('getDelayForAnswer', () => {
  it('should return correct delays for each position', () => {
    const randomNumbers = [2, 0, 1] // Answer 2 is first, 0 is second, 1 is third
    
    expect(getDelayForAnswer(2, randomNumbers)).toBe(500)  // First position
    expect(getDelayForAnswer(0, randomNumbers)).toBe(1000) // Second position
    expect(getDelayForAnswer(1, randomNumbers)).toBe(1500) // Third position
  })

  it('should return 0 for answer not found in random numbers', () => {
    const randomNumbers = [0, 1, 2]
    
    expect(getDelayForAnswer(5, randomNumbers)).toBe(0)
  })

  it('should handle empty random numbers array', () => {
    expect(getDelayForAnswer(1, [])).toBe(0)
  })
}) 
import findInArray from './findInArray';

describe('find in array', () => {
  test('should return false when array is empty', () => {
    expect(findInArray([], 'author', 's')).toBe(false);
  });
  test('should return false when array is empty', () => {
    expect(findInArray([{ author: 's' }], 'author', 'p')).toBe(false);
  });
  test('should return false when array is empty', () => {
    expect(findInArray([{ author: 's' }], 'author', 's')).toBe(true);
  });
});

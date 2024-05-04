function sum(x, y) {
    return x + y;
  }
   
  describe('sum', () => {
    test('sums up two values', () => {
      expect(sum(4, 4)).toBe(8);
    });
    test('sums up tw values', () => {
      expect(sum(4, 3)).toBe(7);
    });
  });
  
function sum(a, b) {
  return a + b;
}

test("Sum test", () => {
    expect(sum(1, 2)).toBe(3);
});

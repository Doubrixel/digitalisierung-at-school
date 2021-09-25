function compileCode() {
  throw new Error('you are using the wrong Version');
}

test('compiling code goes as expected', () => {
  expect(() => compileCode()).toThrow();
  expect(() => compileCode()).toThrow(Error);

  // You can also use the exact error message or a regexp
  expect(() => compileCode()).toThrow('you are using the wrong Version');
  expect(() => compileCode()).toThrow(/Version/);
});

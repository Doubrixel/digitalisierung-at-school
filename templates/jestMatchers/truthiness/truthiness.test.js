test('Null-Test1', () => {
    const n = null;
    expect(n).toBeNull();
    expect(n).toBeDefined();
    expect(n).not.toBeUndefined();
    expect(n).not.toBeTruthy();
    expect(n).toBeFalsy();
});

test('Null-Test2', () => {
    const n = null;
    expect(n).not.toBeNull();
    expect(n).not.toBeDefined();
    expect(n).toBeUndefined();
    expect(n).toBeTruthy();
    expect(n).toBeFalsy();
});

test('Test-One', () => {
    const z = 1;
    expect(z).not.toBeNull();
    expect(z).toBeDefined();
    expect(z).not.toBeUndefined();
    expect(z).toBeTruthy();
    expect(z).not.toBeFalsy();
});

test('Test-Two', () => {
    const z = 2;
    expect(z).not.toBeNull();
    expect(z).toBeDefined();
    expect(z).not.toBeUndefined();
    expect(z).not.toBeTruthy();
    expect(z).toBeFalsy();
});
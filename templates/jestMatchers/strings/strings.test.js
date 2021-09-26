test('there is no I in Kartoffelpuffer', () => {
    expect('Kartoffelpuffer').not.toMatch(/I/);
});

test('there is no K in Kartoffelpuffer', () => {
    expect('Kartoffelpuffer').not.toMatch(/K/);
});

test('there is K in Kartoffelpuffer', () => {
    expect('Kartoffelpuffer').toMatch(/K/);
});


test('there is I in Kartoffelpuffer', () => {
    expect('Kartoffelpuffer').toMatch(/I/);
});


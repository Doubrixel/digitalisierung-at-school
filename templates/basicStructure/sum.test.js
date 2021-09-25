const sum = require('./sum'); // Hier wird die Funktion importiert.

test("Hier steht der Name des Tests", () => {
    expect(sum(1, 2)).toBe(3); // Hier wird die importierte Funktion gestestet.
});

ALTER TABLE komponenten RENAME TO komponenten_alt;

CREATE TABLE komponenten(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR,
    aktuellerStatus INTEGER,
    naechsterStatus INTEGER,
    statusUebergangsZeitpunkt DATETIME
);

INSERT INTO komponenten (id, name) SELECT id, name FROM komponenten_alt;
DROP TABLE komponenten_alt;
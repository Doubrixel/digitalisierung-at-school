ALTER TABLE komponenten RENAME TO komponenten_alt;

CREATE TABLE komponenten(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR,
    transitionDate1 DATETIME,
    transitionDate2 DATETIME,
    transitionDate3 DATETIME
);

INSERT INTO komponenten (id, name) SELECT id, name FROM komponenten_alt;
DROP TABLE komponenten_alt;
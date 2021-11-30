ALTER TABLE nutzer RENAME TO nutzer_alt;

CREATE TABLE nutzer(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    klasse VARCHAR,
    vorname VARCHAR,
    nachname VARCHAR,
    iServUuid VARCHAR
);

INSERT INTO nutzer (id) SELECT id FROM nutzer_alt;

DROP TABLE nutzer_alt;
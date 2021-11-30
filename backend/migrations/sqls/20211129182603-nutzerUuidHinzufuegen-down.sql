ALTER TABLE nutzer RENAME TO nutzer_alt;

CREATE TABLE nutzer(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    rolle VARCHAR,
    klassenstufe INTEGER,
    name VARCHAR
);

INSERT INTO nutzer (id) SELECT id FROM nutzer_alt;

DROP TABLE nutzer_alt;
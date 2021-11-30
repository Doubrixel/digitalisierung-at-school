CREATE TABLE facharbeiten_temp (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    thema VARCHAR,
    fach VARCHAR,
    gewaehlterLehrer VARCHAR,
    unterrichtenderLehrer VARCHAR,
    dokumentpfad VARCHAR,
    abgabezeitpunkt VARCHAR,
    studentId INTEGER
);

INSERT INTO facharbeiten_temp(id, thema, fach, dokumentpfad, abgabezeitpunkt, studentId)
SELECT id, thema, fach, dokumentpfad, abgabezeitpunkt, studentId
FROM facharbeiten;

DROP TABLE facharbeiten;

ALTER TABLE facharbeiten_temp RENAME TO facharbeiten;

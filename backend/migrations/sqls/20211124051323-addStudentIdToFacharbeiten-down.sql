CREATE TABLE facharbeiten_backup (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    thema VARCHAR,
    fach VARCHAR,
    gewaehlterLehrerID INTEGER,
    unterrichtenderLehrerID INTEGER,
    dokumentpfad VARCHAR,
    abgabezeitpunkt VARCHAR
);
INSERT INTO facharbeiten_backup(id, thema, fach, gewaehlterLehrerID, unterrichtenderLehrerID, dokumentpfad, abgabezeitpunkt)
SELECT id, thema, fach, gewaehlterLehrerID, unterrichtenderLehrerID, dokumentpfad, abgabezeitpunkt
FROM facharbeiten;

DROP TABLE facharbeiten;
ALTER TABLE facharbeiten_backup RENAME TO facharbeiten;

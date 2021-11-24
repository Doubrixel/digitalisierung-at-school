
CREATE TABLE abiturpruefungen_backup (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    betreuendeLehrkraftID INTEGER,
    art VARCHAR,
    bezugsfachID INTEGER,
    genehmigt BOOLEAN,
    ablehnungsgrund VARCHAR,
    partnerStudentId INTEGER,
    referenzfachID INTEGER,
    thema VARCHAR
);
INSERT INTO abiturpruefungen_backup(id, betreuendeLehrkraftID, art, bezugsfachID, genehmigt, ablehnungsgrund, partnerStudentId, referenzfachID, thema)
SELECT id, betreuendeLehrkraftID, art, bezugsfachID, genehmigt, ablehnungsgrund, partnerStudentId, referenzfachID, thema
FROM abiturpruefungen;

DROP TABLE abiturpruefungen;
ALTER TABLE abiturpruefungen_backup RENAME TO abiturpruefungen;



CREATE TABLE nutzer_backup (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    rolle VARCHAR,
    klassenstufe INTEGER
);
INSERT INTO nutzer_backup(id, rolle, klassenstufe)
SELECT id, rolle, klassenstufe
FROM nutzer;

DROP TABLE nutzer;
ALTER TABLE nutzer_backup RENAME TO nutzer;

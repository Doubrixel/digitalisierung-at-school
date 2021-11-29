CREATE TABLE abiturpruefungen_backup (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    betreuendeLehrkraftID INTEGER,
    art VARCHAR,
    bezugsfachID INTEGER,
    genehmigt BOOLEAN,
    ablehnungsgrund VARCHAR,
    partnerStudentId INTEGER,
    referenzfachID INTEGER,
    thema VARCHAR,
    studentID INTEGER
);
INSERT INTO abiturpruefungen_backup(id, art, genehmigt, ablehnungsgrund, thema, studentID)
SELECT id, art, genehmigt, ablehnungsgrund, thema, studentID
FROM abiturpruefungen;

DROP TABLE abiturpruefungen;
ALTER TABLE abiturpruefungen_backup RENAME TO abiturpruefungen;

CREATE TABLE ags (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR,
  beschreibung VARCHAR,
  freitext TEXT,
  minKlasse INTEGER,
  maxKlasse INTEGER,
  platzanzahl INTEGER
);
CREATE TABLE bezugsfach(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR
);
CREATE TABLE wahlpflichtfaecher2nutzer(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fachID INTEGER,
    schuelerID INTEGER
);
CREATE TABLE wahlpflichtfaecher(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR
);
CREATE TABLE ag2Nutzer(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    agID INTEGER,
    nutzerID INTEGER
);

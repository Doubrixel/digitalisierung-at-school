CREATE TABLE abitur_temp (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    art VARCHAR,
    partnerStudentName VARCHAR,
    updatedPartnerStudentName VARCHAR,
    referenzfach VARCHAR,
    updatedReferenzfach VARCHAR,
    bezugsfach VARCHAR,
    updatedBezugsfach VARCHAR,
    examiner VARCHAR,
    updatedExaminer VARCHAR,
    thema VARCHAR,
    updatedThema VARCHAR,
    problemQuestion VARCHAR,
    updatedProblemQuestion VARCHAR,
    presentationForm VARCHAR,
    updatedPresentationForm VARCHAR,
    genehmigt BOOLEAN,
    ablehnungsgrund VARCHAR,
    studentID INTEGER
);

INSERT INTO abitur_temp(id, art, thema, genehmigt, studentID, ablehnungsgrund)
SELECT id, art, thema, genehmigt, studentID, ablehnungsgrund
FROM abiturpruefungen;

DROP TABLE abiturpruefungen;

ALTER TABLE abitur_temp RENAME TO abiturpruefungen;

DROP TABLE ags;
DROP TABLE bezugsfach;
DROP TABLE wahlpflichtfaecher2nutzer;
DROP TABLE wahlpflichtfaecher;
DROP TABLE ag2Nutzer;
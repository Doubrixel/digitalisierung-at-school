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

INSERT INTO abitur_temp (id, art, partnerStudentName, updatedPartnerStudentName, referenzfach, updatedReferenzfach, bezugsfach, updatedBezugsfach, examiner, updatedExaminer, thema, updatedThema, problemQuestion, updatedProblemQuestion, presentationForm, updatedPresentationForm, genehmigt, ablehnungsgrund, studentID)
SELECT id, art, partnerStudentName, updatedPartnerStudentName, referenzfach, updatedReferenzfach, bezugsfach, updatedBezugsfach, examiner, updatedExaminer, thema, updatedThema, problemQuestion, updatedProblemQuestion, presentationForm, updatedPresentationForm, genehmigt, ablehnungsgrund, studentID FROM abiturpruefungen;
DROP TABLE abiturpruefungen;
ALTER TABLE abitur_temp RENAME TO abiturpruefungen;
CREATE TABLE abiturpruefungen_backup AS SELECT id, betreuendeLehrkraftID, art, bezugsfachID, genehmigt, ablehnungsgrund, partnerStudentId, referenzfachID, thema FROM abiturpruefungen;
DROP TABLE abiturpruefungen;
ALTER TABLE abiturpruefungen_backup RENAME TO abiturpruefungen;

CREATE TABLE nutzer_backup AS SELECT id, rolle, klassenstufe FROM nutzer;
DROP TABLE nutzer;
ALTER TABLE nutzer_backup RENAME TO nutzer;

CREATE TABLE abiturpuefungen (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    betreuendeLehrkraftID INTEGER,
    art VARCHAR,
    bezugsfachID INTEGER,
    genehmigt BOOLEAN,
    ablehnungsgrund VARCHAR
);
INSERT INTO abiturpuefungen(id, betreuendeLehrkraftID, art, bezugsfachID, genehmigt, ablehnungsgrund)
SELECT id, betreuendeLehrkraftID, art, bezugsfachID, genehmigt, ablehnungsgrund
FROM abiturpruefungen;

DROP TABLE abiturpruefungen;
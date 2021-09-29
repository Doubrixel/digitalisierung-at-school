INSERT INTO abiturpuefungen (betreuendeLehrkraftID, art, bezugsfachID, genehmigt, ablehnungsgrund)
VALUES (1, 'BLL', 1, true, ''),
       (2, 'PP', 2, false, 'schlechtes Thema')
;

INSERT INTO ag2nutzer (agID, nutzerID)
VALUES (1, 2),
       (1, 1)
;

INSERT INTO ags (name, beschreibung, freitext, minKlasse, maxKlasse, platzanzahl)
VALUES ('Tanzen', 'alle gängigen Gesellschaftstänze', 'In dieser Ag können sie sich frei fühlen wie der Wind!', 7, 11, 10),
       ('Reiten', 'Auf Schaukelpferden reiten lernen', 'Du glaubst doch nicht im Ernst wir hätten echte Pferde zur verfügung', 10, 12, 3)
;

INSERT INTO bezugsfach (name)
VALUES ('Deutsch'),
       ('Mathematik')
;

INSERT INTO facharbeiten (thema, fach, gewaehlterLehrerID, unterrichtenderLehrerID, dokumentpfad, abgabezeitpunkt)
VALUES ('Digitalisierung des Mondes', 'Weltraumtelematik', 1, 1, './hier/und/da', datetime(1092941466, 'unixepoch')),
       ('Reiten lernen mit Schaukelpferden', 'Biologie', 2, 1, './dort', datetime(1096441466, 'unixepoch'))
;

INSERT INTO komponenten (name, aktuellerStatus, naechsterStatus, statusUebergangsZeitpunkt)
VALUES ('5.PK', 0, 1, datetime(1092941466, 'unixepoch')) ,
       ('AG Buchung', 1, 2, datetime(1096441466, 'unixepoch'))
;

INSERT INTO nutzer (rolle, klassenstufe)
VALUES ('sus', 8),
       ('lehrende', NULL)
;

INSERT INTO wahlpflichtfaecher (name)
VALUES ('Weltraumtelematik'),
       ('Schaukelpferdforschung')
;

INSERT INTO wahlpflichtfaecher2nutzer (fachID, schuelerID)
VALUES (1, 1),
       (2, 1)
;

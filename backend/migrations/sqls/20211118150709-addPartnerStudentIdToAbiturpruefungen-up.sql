ALTER TABLE abiturpuefungen ADD COLUMN partnerStudentId INTEGER;
ALTER TABLE abiturpuefungen ADD COLUMN referenzfachID INTEGER;
ALTER TABLE abiturpuefungen ADD COLUMN thema VARCHAR;
ALTER TABLE abiturpuefungen RENAME TO abiturpruefungen;
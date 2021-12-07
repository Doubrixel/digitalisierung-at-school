# Data Ordner
Jede laufende Instanz der "Digitalisierung At School" Software legt einen Ordner an, in dem Daten gespeichert werden.
Bei Updates bleibt dieser Ordner und seine Inhalte erhalten.

## Inhalte
- *5. PK Formblatt ... .pdf*: Vorlagen für die PDF-Generierung
- *digitalisierung-at-school.db*: Datenbank für sämtliche Nutzerdaten
- *.env*: Sensible Daten, die nicht öffentlich sein dürfen, darunter OAuth Daten für iServ
  - die *.env*-Datei muss folgende Variablen enthalten:
  - OAUTH_CLIENT_ID=*Client ID, der registrierten Applikation (zu finden in den IServ-Einstellungen, nachdem die Applikation registriert wurde)*
  - OAUTH_CLIENT_SECRET=*Client Secret, der registrierten Applikation (zu finden in den IServ-Einstellungen, nachdem die Applikation registriert wurde)*
  - REDIRECT_LINK=*Serverdomäne (vom Server auf dem die Applikation läuft)/auth/callback*
  - ISERV_DISCOVERY_DOCUMENT_LINK=*IServ-Domäne der Schule/iserv/public*
- *facharbeiten/*: Ordner mit allen abgegebenen Facharbeiten 
- *backups/*: Ordner mit täglichen Backups der Datenbank der letzten 7 Tage

## Vorhandene Data Ordner auf dem Immanuel Kant Server
- *digitalisierung-at-school-data-test*: Data Ordner für das Testsystem
- *digitalisierung-at-school-data-prod*: Data Ordner für das Hauptsystem, auch "Produktivsystem" genannt

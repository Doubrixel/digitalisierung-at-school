# Getting Started - Backend Development
## Notwendige Programme
Um im Backend entwickeln zu können, sind einige Programme notwendig:

* Git
* Nodejs

## Installation

1. Zunächst muss das git repository geklont sein:
```bash
git clone git@github.com:Doubrixel/digitalisierung-at-school.git
```

2. Dann in den backend Ordner wechseln:
```bash
cd digitalisierung-at-school/backend/
```

3. Nun müssen die Bibliotheken installiert werden:
```bash
npm i
```

4. Und die Datenbank aufgesetzt werden:
```bash
node_modules/db-migrate/bin/db-migrate up
```

5. Auf Windows muss die Umgebungsvariable NODE_ENV für den Entwicklermodus gesetzt werden: 
```bash
npm install -g win-node-env
```

Nun kann entwickelt werden!

Folgender Befehl startet den Server im Entwicklermodus:
```bash
npm run start:dev
```
Im Entwicklermodus wird bei allen Zugriffen über die API davon ausgegangen, dass der Nutzer mit der ID 1 die Anfrage gesendet hat.

Und folgender Befehl startet den Server im Produktivmodus:
```bash
npm run start:prod
```
Im Produktivmodus müsste der Nutzer sich über die SSO-Schnittstelle anmelden. Da die SSO Anmeldung aber aus Sicherheitsgründen nur über eine HTTPS Verbindung möglich ist, ist der Produktivmodus lokal nicht sinnvoll verwendbar.

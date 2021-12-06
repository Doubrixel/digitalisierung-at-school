# Getting Started - Frontend Development
## Notwendige Programme
Um im Frontend entwickeln zu können, sind einige Programme notwendig:

* Git
* Nodejs

## Installation

1. Zunächst muss das git repository geklont sein:
```bash
git clone git@github.com:Doubrixel/digitalisierung-at-school.git
```

2. Dann in den frontend Ordner wechseln:
```bash
cd digitalisierung-at-school/frontend/
```

3. Nun müssen die Bibliotheken installiert werden:
```bash
npm i
```

Nun kann entwickelt werden!

Folgender Befehl startet das Frontend:
```bash
npm start
```

## Wichtige Hinweise
Da die Funktionalitäten der SSO-Schnittstelle im Developmentmodus nicht zur Verfügung stehen, muss die Login-Funktion simuliert werden.
Dafür muss der grundlegende Aufbau des Login -und Rechtesystems verstanden werden.
Grundsätzliche werden in der Datei "authReducer.tsx" 3 wichtige Werte gesetzt:
* isLoggedIn
* role
* class

Normalerweise werden die Nutzerdaten über die SSO-Schnittstelle abgefragt und in "authReducer.tsx" werden sie ausgelesen und ausgewertet.
In der Funktion "getUserRole" wird *role* ausgelesen und zurückgegeben.
In der Funktion "getUserClass" wird *class* ausgelesen und zurückgegeben.
Durch die Funktion "login" und "logout" wird *isLoggedIn* gesetzt.

Da die Funktionen im Developmentmodus ohne die SSO-Schnittstelle keine Daten verarbeiten können, muss manuell gesetzt werden was zurückgegeben werden soll.

Für die Rolle wird in der Funktion "getUSerRole" bereits abgefragt, ob der Client auf "localhost:3000" läuft, also der Developmentadresse.
Hier kann mit dem bereit vorhandenen return-Statement entweder die Rolle STUDENT_ROLE, FA_ADMIN_ROLE, FIFTH_PK_ADMIN_ROLE oder SUPER_ADMIN_ROLE zurückgegeben werden um die entsprechende Rolle zu setzen.

Für die Klasse wird in der Funktion "getUserClass" ebenfalls abgefragt, ob der Client auf "localhost:3000" läuft.
Ist dies der Fall, kann mit dem bereits vorhandenen return-Statement eine Klasse (9 für Zugriff auf Facharbeit, 11 oder 12 für Zugriff auf 5. PK) gesetzt werden.

Über die Variable "isLoggedIn" wird gesteuert, ob der Nutzer eingeloggt ist oder nicht. Hier wird in der Variable "initialState" abgefragt, ob der Client auf "localhost:3000" läuft.
Ist dies der Fall, ist die Variable "isLoggedIn" automatisch true, der Nutzer ist also eingeloggt.
Soll dies nicht der Fall sein, kann hier *false* gesetzt werden.

Wichtig sind diese Werte für die Zugriffssteuerung in "App.tsx".
Hier wird für jede Seite geprüft ob ein Nutzer die korrekte Rolle und Klasse hat um auf diese Seite zuzugreifen.
Falls z.B. zu Entwicklungszwecken als Schüler auch auf eine Adminseite zugegriffen werden soll, kann die Zugriffsabfrage temporär aus "App.tsx" entfernt werden.

Bsp.: Zugriffssteuerung ist vorhanden:
```bash
<Route exact path="/student/facharbeit">{ role === STUDENT_ROLE && classNumber === 9 ? <FacharbeitsEntryPage /> : <NoAccessPage /> }</Route>
```

Zugriffssteuerung ist nicht vorhanden für die gleiche Seite
```bash
<Route exact path="/student/facharbeit"> <FacharbeitsEntryPage /> </Route>
```
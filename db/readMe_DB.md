# Entwicklung mit sqlite3 und db-migrate

generell sind alle benötigten npm-Module in der backend/package.json hinterlegt
nachfolgende Befehle sind also aus dem backend Ordner heraus auszuführen

## Aktualisieren der Datenbank
- wenn noch nicht geschehen:
>npm i
- um die DB auf den neusten Stand zu bringen (wenn die DB noch nicht existiert wird sie erstellt):
>node_modules/db-migrate/bin/db-migrate up
- um die DB um die letzte Migration zurückzurollen:
>node_modules/db-migrate/bin/db-migrate down

- Für weitere Informationen bitte hier nachlesen:
  https://db-migrate.readthedocs.io/en/latest/Getting%20Started/commands/
## Migrationen
- migrationen liegen unter backend/migrations
- Migrationen können als reines JS Skript angelegt werden. Dabei werden dann die Operationen, die gegen die DB ausgeführt werden sollen mithilfe der db-migrate api definiert. Alternativ kann eine Migration auch so angelegt werden, dass in besagtem JS Skript nur auf SQL Dateien gezeigt wird, in denen dann die Änderungen an der DB definiert sind.
### neue Migration als JS Skript erstellen
- eine neue Migration kann generiert werden mit:
>node_modules/db-migrate/bin/db-migrate create nameDerMigration
### neue Migration mit SQL Dateien erstellen
- Es können auch sql Dateien mit generiert werden:
>node_modules/db-migrate/bin/db-migrate create nameDerMigration --sql-file

Für weitere Informationen bitte hier nachlesen: 
https://db-migrate.readthedocs.io/en/latest/Getting%20Started/usage/#creating-migrations

## Datenbanken in Webstorm einsehen
https://www.jetbrains.com/help/webstorm/database-tool-window.html
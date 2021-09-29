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
- eine neue Migration kann generiert werden mit:
>node_modules/db-migrate/bin/db-migrate create nameDerMigration
- alternativ auch mit sql Dateien zusammen generiert werden mit:
>node_modules/db-migrate/bin/db-migrate create nameDerMigration --sql-file

Für weitere Informationen bitte hier nachlesen: 
https://db-migrate.readthedocs.io/en/latest/Getting%20Started/usage/#creating-migrations

## Datenbanken in Webstorm einsehen
https://www.jetbrains.com/help/webstorm/database-tool-window.html
import {Database} from 'sqlite3';
import path from 'path';
import sqlite3Import from 'sqlite3';

const sqlite3 = sqlite3Import.verbose();

const accessDB = (functionToExecute: (db: Database) => undefined, verbose = false) => {
    const db = new sqlite3.Database(path.join(__dirname, '../../../db/digitalisierung-at-school.db'), (err: Error | null) => {
        if (err) {
            return console.error(err.message);
        }
        if (verbose) console.log('Connected to the digitalisierung-at-school SQlite database.');
    });

    db.serialize(functionToExecute(db));

    db.close((err: Error | null) => {
        if (err) {
            return console.error(err.message);
        }
        if (verbose) console.log('Close the database connection.');
    });
};

// example usage:
// import { getAllResults } from './db/dbAccessor';
// getAllResults('SELECT * FROM abiturpuefungen WHERE genehmigt = ?', [true], (res: object[]) => {
//    console.log(res);
// });
const getAllResults = (sql: string, params: Array<number | string>, callback: (a: unknown[]) => void): void => {
    accessDB((db: Database) => {
        db.all(sql, params, (err, rows) => {
            if (err) throw err;
            callback(rows);
        });
        return undefined;
    });
};

const testDBConnection = ():void => {
    console.log("Testing DB-connection. If no error is prompted between this line and 'Close the database connection.' the test was succesfull.");
    // in der nächsten Zeile no-unused-vars disabled, weil ein Zugriff auf das DB Objekt nicht notwendig ist um die verbindung zu testen
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    accessDB((db)=>undefined, true);
};

export { getAllResults, testDBConnection };

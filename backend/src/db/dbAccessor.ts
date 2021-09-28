import {Database} from "sqlite3";

const sqlite3 = require('sqlite3').verbose();
import path from 'path';

const accessDB = (functionToExecute: (db: Database) => any, verbose: boolean = false) => {
    let db = new sqlite3.Database(path.join(__dirname, '../../../db/digitalisierung-at-school.db'), (err: { message: any; }) => {
        if (err) {
            return console.error(err.message);
        }
        if (verbose) console.log('Connected to the digitalisierung-at-school SQlite database.');
    });

    db.serialize(functionToExecute(db))

    db.close((err: { message: any; }) => {
        if (err) {
            return console.error(err.message);
        }
        if (verbose) console.log('Close the database connection.');
    });
}

module.exports.accessDB = accessDB;

//example usage:
//const dbAccessor = require('./path/to/this/dir/dbAccessor');
//dbAccessor.getAllResults('SELECT * FROM abiturpuefungen WHERE genehmigt = ?', [true], (res: object[]) => {
//         console.log(res);
//     });
module.exports.getAllResults = (sql: string, params: Array<any>, callback: (a: any[]) => any) => {
    accessDB((db: Database) => {
        db.all(sql, params, (err, rows) => {
            if (err) throw err;
            callback(rows);
        })
    })
}

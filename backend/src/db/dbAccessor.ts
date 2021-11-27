import {Database} from 'sqlite3';
import path from 'path';
import sqlite3Import from 'sqlite3';
import {Response} from 'express';

const sqlite3 = sqlite3Import.verbose();

const accessDB = (functionToExecute: (db: Database) => undefined, verbose = false) => {
    const db = new sqlite3.Database(path.join(__dirname, '../../../data/digitalisierung-at-school.db'), (err: Error | null) => {
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
const getAllResults = (sql: string, params: Array<number | string>, callback: (a: unknown[], err: Error|null) => void): void => {
    accessDB((db: Database) => {
        db.all(sql, params, (err, rows) => {
            callback(rows, err);
        });
        return undefined;
    });
};

const getFirstResult = (sql: string, params: Array<number | string>, callback: (obj: Record<string,unknown> , err: Error|null) => void): void => {
    accessDB((db: Database) => {
        db.get(sql, params, (err, row) => {
            callback(row, err);
        });
        return undefined;
    });
};

const defaultGetFirstResultCallback = (res: Response) => (
    (obj: Record<string,unknown>, err: Error|null): void => {
        if (err) res.status(500).json(err.message);
        else res.status(200).json(obj);
    }
);

const insertData = (sql: string, values: Array<number | string>, callback: (id: number, err: Error|null) => void): void => {
    accessDB((db) => {
        db.run(sql, values, function(err){
            if (err) callback(-1, err);
            else callback(this.lastID, err);
        });
        return undefined;
    });
};

const defaultInsertCallback = (res: Response) => (
    (id: number, err: Error|null): void => {
        if (err) res.status(500).json(err.name);
        else res.status(200).json({id});
    }
);

const updateData = (sql: string, values: Array<number | string>, callback: (changedRowCount: number, err: Error|null) => void): void => {
    accessDB((db) => {
        db.run(sql, values, function(err){
            if (err) callback(-1, err);
            else callback(this.changes, err);
        });
        return undefined;
    });
};

const defaultUpdateCallback = (res: Response) => (
    (changedRowCount: number, err: Error|null): void => {
        if (err) res.status(500).json(err.name);
        if (changedRowCount === 0) res.status(409).json('Kein Datensatz geändert.');
        else res.status(200).json();
    }
);

const defaultGetAllCallback = (res: Response) => (
    (a: unknown[], err: Error|null): void => {
        if (err) res.status(500).json(err.message);
        else res.status(200).json(a);
    }
);

const testDBConnection = ():void => {
    console.log("Testing DB-connection. If no error is prompted between this line and 'Close the database connection.' the test was succesfull.");
    accessDB(()=>undefined, true);
};

export { getAllResults, insertData, defaultInsertCallback, testDBConnection, updateData, defaultUpdateCallback, defaultGetAllCallback, getFirstResult, defaultGetFirstResultCallback };

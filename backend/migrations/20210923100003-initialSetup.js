const async = require('async')
'use strict';

const DATA_TYPES = {
    int: 'int',
    string: 'string',
    datetime: 'datetime',
    text: 'text',
    boolean: 'boolean'
};

const TABLES = {
    komponenten: {
        name: 'komponenten'
    },
    nutzer: {
        name: 'nutzer'
    },
    ags: {
        name: 'ags'
    },
    wahlpflichtfaecher: {
        name: 'wahlpflichtfaecher'
    },
    facharbeiten: {
        name: 'facharbeiten'
    },
    bezugsfach: {
        name: 'bezugsfach'
    },
    ag2Nutzer: {
        name: 'ag2Nutzer'
    },
    wahlpflichtfaecher2nutzer: {
        name: 'wahlpflichtfaecher2nutzer'
    },
    abiturpuefungen: {
        name: 'abiturpuefungen'
    },
};

const { int, text, datetime, string, boolean } = DATA_TYPES;

let dbm;
let type;
let seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
    return async.series([
        db.createTable.bind(db,TABLES.komponenten.name, {
            id: { type: int, primaryKey: true, autoIncrement: true },
            name: string,
            aktuellerStatus: int,
            naechsterStatus: int,
            statusUebergangsZeitpunkt: datetime
        }),
        db.createTable.bind(db, TABLES.nutzer.name, {
            id: { type: int, primaryKey: true, autoIncrement: true },
            rolle: string,
            klassenstufe: int
        }),
            db.createTable.bind(db, TABLES.ags.name, {
            id: {type: int, primaryKey: true, autoIncrement: true},
            name: string,
            beschreibung: string,
            freitext: text,
            minKlasse: int,
            maxKlasse: int,
            platzanzahl: int
        }),
        db.createTable.bind(db, TABLES.wahlpflichtfaecher.name, {
            id: {type: int, primaryKey: true, autoIncrement: true},
            name: string
        }),
        db.createTable.bind(db, TABLES.facharbeiten.name, {
            id: {type: int, primaryKey: true, autoIncrement: true},
            thema: string,
            fach: string,
            gewaehlterLehrerID: int,
            unterrichtenderLehrerID: int,
            dokumentpfad: string,
            abgabezeitpunkt: datetime
        }),
        db.createTable.bind(db, TABLES.bezugsfach.name, {
            id: {type: int, primaryKey: true, autoIncrement: true},
            name: string
        }),
        db.createTable.bind(db, TABLES.ag2Nutzer.name, {
            id: {type: int, primaryKey: true, autoIncrement: true},
            agID: int,
            nutzerID: int
        }),
        db.createTable.bind(db, TABLES.wahlpflichtfaecher2nutzer.name, {
            id: {type: int, primaryKey: true, autoIncrement: true},
            fachID: int,
            schuelerID: int
        }),
        db.createTable.bind(db, TABLES.abiturpuefungen.name, {
            id: {type: int, primaryKey: true, autoIncrement: true},
            betreuendeLehrkraftID: int,
            art: string,
            bezugsfachID: int,
            genehmigt: boolean,
            ablehnungsgrund: string
        }),
    ]);
};

exports.down = function(db) {
  return async.series([
      db.dropTable.bind(db, TABLES.komponenten.name),
      db.dropTable.bind(db, TABLES.nutzer.name),
      db.dropTable.bind(db, TABLES.ags.name),
      db.dropTable.bind(db, TABLES.wahlpflichtfaecher.name),
      db.dropTable.bind(db, TABLES.facharbeiten.name),
      db.dropTable.bind(db, TABLES.bezugsfach.name),
      db.dropTable.bind(db, TABLES.ag2Nutzer.name),
      db.dropTable.bind(db, TABLES.wahlpflichtfaecher2nutzer.name),
      db.dropTable.bind(db, TABLES.abiturpuefungen.name),
  ]);
};

exports._meta = {
  "version": 1
};

import { Request, Response } from 'express';
import path from 'path';
import { getStudentId } from '../../../auth/getRequestCookieData';
import { defaultGetAllCallback, defaultInsertCallback, defaultUpdateCallback, getAllResults, getFirstResult, insertData, updateData } from '../../../db/dbAccessor';
import rejectWhenValidationsFail from '../../validators/rejectWhenValidationsFail';
import { UploadedFile } from 'express-fileupload';

const UPLOAD_DOCUMENT_NAME = 'document';
const FACHARBEIT_STORAGE = path.join(__dirname, '../../../../../data/facharbeiten');

export default class Facharbeit {
    static GETtest(req: Request, res: Response): void {
        res.send('facharbeit-test');
    }
    static GETgetAll(req: Request, res: Response): void {
        if (rejectWhenValidationsFail(req, res)) return;

        const sql = `
            SELECT
                studentId,
                thema AS topic,
                abgabezeitpunkt AS deliveryTime
            FROM facharbeiten;
        `;
        getAllResults(sql, [], defaultGetAllCallback(res));
    }
    static async POSTchooseTopic(req: Request, res: Response): Promise<void> {
        if (rejectWhenValidationsFail(req, res)) return;

        const sql = 'SELECT id FROM facharbeiten WHERE studentID = ?';
        const studentId = await getStudentId(req, res);
        if (studentId === -1) return;
        getFirstResult(sql, [studentId], (obj, err) => {
            if (err) {
                res.status(500).json(err.name);
            } else {
                if (obj) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    updateColumns(obj.id);
                } else {
                    insertFirstSubmission();
                }
            }
        });

        const {topic, subject, choosenTeacher, subjectTeacher} = req.body;
        const args: (string|number)[] = [];

        const buildSetString = (): string => {
            let setString = '';
            let first = true;
            const add = (arg: {value: string, name: string}): void => {
                if (!arg.value) return;
                if (first) first = false;
                else setString += ', ';
                setString += arg.name + ' = ?';
                args.push(arg.value);
            };
            for (const arg of [
                {value: topic, name: 'thema'},
                {value: subject, name: 'fach'},
                {value: choosenTeacher, name: 'gewaehlterLehrer'},
                {value: subjectTeacher, name: 'unterrichtenderLehrer'},
            ]) add(arg);

            return setString;
        };

        const updateColumns = (id: number) => {
            const sql = `UPDATE facharbeiten SET ${buildSetString()} WHERE id = ?`;
            args.push(id);
            updateData(sql, args, defaultUpdateCallback(res));
        };

        const insertFirstSubmission = () => {
            if (!topic || !subject || !choosenTeacher || !studentId) {
                res.status(400).send('Thema, Fach, gewählter Lehrer und unterrichtender Lehrer müssen initial angegeben werden.');
                return;
            }
            const sql = 'INSERT INTO facharbeiten (thema, fach, gewaehlterLehrer, unterrichtenderlehrer, studentId) VALUES (?, ?, ?, ?, ?)';
            args.push(topic, subject, choosenTeacher, subjectTeacher, studentId);
            insertData(sql, args, defaultInsertCallback(res));
        };
    }
    static async POSTuploadDocument(req: Request, res: Response): Promise<void> {
        if (rejectWhenValidationsFail(req, res)) return;

        const studentId = await getStudentId(req, res);
        if (studentId === -1) return;
        const sql = 'SELECT id from facharbeiten WHERE studentId IS ?;';
        // prüfen, ob der SuS eine Facharbeit angelegt hat
        getFirstResult(sql, [studentId], (obj, err) => {
            if (err) {
                // Fehler bei der Abfrage (z.B. Datenbank nicht erreichbar)
                res.status(500).json(err.message);
                return;
            } else if (obj) {
                // SuS hat Facharbeit angelegt
                // generate new storage name
                const storageName = Date.now() + '.pdf';
                const storagePath = path.join(FACHARBEIT_STORAGE, storageName);

                // get the uploaded file
                const { files } = req;
                if (files && UPLOAD_DOCUMENT_NAME in files) {
                    const file = files[UPLOAD_DOCUMENT_NAME] as UploadedFile;
                    // write the file
                    file.mv(storagePath, () => {
                        // save filepath and date to DB
                        const sql = 'UPDATE facharbeiten SET dokumentpfad = ?, abgabezeitpunkt = ? WHERE studentId = ?';
                        updateData(sql, [storagePath, new Date().toJSON(), studentId], defaultUpdateCallback(res));
                    });
                    return;
                }
            } else {
                // SuS hat keine Facharbeit angelegt
                res.status(400).json('Keine Facharbeit für angemeldeten Benutzer vorhanden!');
                return;
            }
            // Wenn der Code bis zu dieser Stelle kommt, ist etwas schiefgelaufen
            // Der Client soll aber keinen Timeout abwarten müssen
            res.status(400).json({err: 'Unbekannter Fehler mit der hochgeladenen Datei!'});
        });
    }
}

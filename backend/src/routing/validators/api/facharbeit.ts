import { body, check, ValidationChain } from 'express-validator';
import * as multer from 'multer';
const storage = multer.memoryStorage(); // Holds a buffer of the file in memory
const upload = multer.default({ storage: storage });

const UPLOAD_DOCUMENT_NAME = 'document';

export default class FacharbeitValidators {
    static isOptionalString = (fieldName: string): ValidationChain => body(fieldName).isString().trim().optional();
    static POSTchooseTopic = [
        FacharbeitValidators.isOptionalString('topic'),
        FacharbeitValidators.isOptionalString('subject'),
        FacharbeitValidators.isOptionalString('choosenTeacher'),
        FacharbeitValidators.isOptionalString('subjectteacher'),
    ];
    static POSTuploadDocument = [
        // multer middleware
        upload.single(UPLOAD_DOCUMENT_NAME),

        // express-validator middleware
        check(UPLOAD_DOCUMENT_NAME)
        .custom((value, {req}) => {
                if (req.files[UPLOAD_DOCUMENT_NAME].mimetype === 'application/pdf') return '.pdf';
                else return false;
            })
        .withMessage('Please only submit pdf documents.'), // custom error message that will be send back if the file in not a pdf.
    ];
}

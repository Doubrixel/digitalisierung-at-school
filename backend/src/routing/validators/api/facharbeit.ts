import {body, ValidationChain} from 'express-validator';

export default class FacharbeitValidators {
    static isOptionalString = (fieldName: string): ValidationChain => body(fieldName).isString().trim().optional();
    static POSTsetApprovalState = [
        FacharbeitValidators.isOptionalString('topic'),
        FacharbeitValidators.isOptionalString('subject'),
        FacharbeitValidators.isOptionalString('choosenTeacher'),
        FacharbeitValidators.isOptionalString('subjectteacher'),
    ];
}

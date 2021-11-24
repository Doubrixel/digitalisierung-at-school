import { body } from 'express-validator';

export default class AbiturValidators {
    static POSTapplyForTopic = [
        body('responsibleTeacherId').isInt(),
        body('art').isString().isIn(['BLL', 'PP']),
        body('bezugsfachId').isInt(),
        body('partnerStudentId').isInt(),
        body('referenzfachId').isInt(),
        body('topic').isString().trim(),
    ];
    static POSTsetApprovalState = [
        body('examId').isInt(),
        body('approved').isBoolean(),
        // eslint disabled, weil die typisierung von der funktion im if nur mit any nachzubilden ist
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        body('reason').if((value: any, {req}: any) => !req.body.approved).isString(),
    ];
}

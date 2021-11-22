import { body } from 'express-validator';

export default class AbiturValidators {
    static POSTApplyForTopic = [
        body('responsibleTeacherId').isInt(),
        body('art').isString().isIn(['BLL', 'PP']),
        body('bezugsfachId').isInt(),
        body('partnerStudentId').isInt(),
        body('referenzfachId').isInt(),
        body('topic').isString().trim(),
    ]
}
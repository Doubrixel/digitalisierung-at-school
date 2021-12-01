import {body, ValidationChain} from 'express-validator';

export default class AbiturValidators {
    static isOptionalString = (fieldName: string): ValidationChain => body(fieldName).isString().trim().optional();
    static POSTapplyForTopic = [
        AbiturValidators.isOptionalString('examiner'),
        AbiturValidators.isOptionalString('updatedExaminer'),
        AbiturValidators.isOptionalString('bezugsfach'),
        AbiturValidators.isOptionalString('updatedBezugsfach'),
        AbiturValidators.isOptionalString('partnerStudentName'),
        AbiturValidators.isOptionalString('updatedPartnerStudentName'),
        AbiturValidators.isOptionalString('referenzfach'),
        AbiturValidators.isOptionalString('updatedReferenzfach'),
        AbiturValidators.isOptionalString('topicArea'),
        AbiturValidators.isOptionalString('updatedTopicArea'),
        AbiturValidators.isOptionalString('problemQuestion'),
        AbiturValidators.isOptionalString('updatedProblemQuestion'),
        AbiturValidators.isOptionalString('presentationForm'),
        AbiturValidators.isOptionalString('updatedPresentationForm'),
        AbiturValidators.isOptionalString('tutor'),
        AbiturValidators.isOptionalString('updatedTutor'),
        body('examType').isString().isIn(['BLL', 'PP']).optional(),
        body('submitNumber').isInt().isIn([1,2]),
        body('submitDate').isISO8601(),
    ];
    static POSTsetApprovalState = [
        body('examId').isInt(),
        body('approved').isBoolean(),
        // eslint disabled, weil die typisierung von der funktion im if nur mit any nachzubilden ist
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        body('reason').if((value: any, {req}: any) => !req.body.approved).isString(),
    ];

    static POSTeditData = [
        AbiturValidators.isOptionalString('updatedExaminer'),
        AbiturValidators.isOptionalString('updatedBezugsfach'),
        AbiturValidators.isOptionalString('updatedPartnerStudentName'),
        AbiturValidators.isOptionalString('updatedReferenzfach'),
        AbiturValidators.isOptionalString('updatedTopicArea'),
        AbiturValidators.isOptionalString('updatedProblemQuestion'),
        AbiturValidators.isOptionalString('updatedPresentationForm'),
        AbiturValidators.isOptionalString('updatedTutor'),
        body('examType').isString().isIn(['BLL', 'PP'])
    ];
}

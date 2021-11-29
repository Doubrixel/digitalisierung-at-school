import {body} from 'express-validator';

export default class ComponentsValidators {
    static PUT_componentName_setTransitionDates = [
        body().isArray(),
        body('*.statusName').isString().notEmpty().trim(),
        body('*.whenToTransitionToStatusDate').isString().notEmpty().trim(),
    ];
}

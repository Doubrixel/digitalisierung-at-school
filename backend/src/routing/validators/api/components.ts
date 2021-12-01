import {body} from 'express-validator';

export default class ComponentValidators {
    static POSTSetTransitionDates = [
        body('transitionDate1').isISO8601(),
        body('transitionDate2').isISO8601(),
        body('transitionDate3').isISO8601(),
    ]
}
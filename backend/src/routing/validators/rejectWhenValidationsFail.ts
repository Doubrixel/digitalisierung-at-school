import {Request, Response} from 'express';
import {validationResult} from 'express-validator';

const rejectWhenValidationsFail = (req: Request, res: Response): boolean => {
    if (!validationResult(req).isEmpty()) {
        res.status(400).json(validationResult(req).mapped());
        return true;
    }
    return false;
};

export default rejectWhenValidationsFail;
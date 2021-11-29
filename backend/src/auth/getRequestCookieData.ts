import {createUser} from './sso';
import {Request} from 'express';

const getStudentId = function (req : Request): string {
    const user = await createUser(req.session?.user);
    return user.uuid;
};

export {getStudentId};
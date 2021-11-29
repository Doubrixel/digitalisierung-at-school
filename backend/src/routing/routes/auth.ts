import {Router} from 'express';
import Auth from '../controllers/Auth';
import {requireStudent} from '../../auth';

export default (): Router => {
    const router = Router();

    router.get('/login', Auth.GETlogin);

    router.get('/callback', Auth.GETcallback);

    router.get('/logout', Auth.GETlogout);

    router.get('/getUserData', Auth.GETuserData);

    router.get('/studentTest', requireStudent,  Auth.GETstudentTest);

    return router;
};
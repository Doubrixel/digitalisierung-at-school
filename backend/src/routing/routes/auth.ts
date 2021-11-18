import {Router} from 'express';
import Auth from '../controllers/Auth';

export default (): Router => {
    const router = Router();

    router.get('/login', Auth.GETlogin);

    router.get('/callback', Auth.GETcallback);

    router.get('/logout', Auth.GETlogout);

    return router;
};
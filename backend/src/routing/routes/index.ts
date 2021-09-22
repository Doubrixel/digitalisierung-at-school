import { Router } from 'express';
import Main from '../controllers/Main';

export default (): Router => {
    const router = Router();

    router.get('/', Main.GEThomepage);

    return router;
};

import { Router } from 'express';
import Facharbeit from '../../controllers/api/Facharbeit';

export default (): Router => {
    const router = Router();

    router.get('/test', Facharbeit.GETtest);
    router.get('/getAll', Facharbeit.GETgetAll);

    return router;
};

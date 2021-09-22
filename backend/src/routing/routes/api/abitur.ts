import { Router } from 'express';
import Abitur from '../../controllers/api/Abitur';

export default (): Router => {
    const router = Router();

    router.get('/test', Abitur.GETtest);

    return router;
};

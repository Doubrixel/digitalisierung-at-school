import { Router } from 'express';
import AG from '../../controllers/api/AG';

export default (): Router => {
    const router = Router();

    router.get('/test', AG.GETtest);

    return router;
};

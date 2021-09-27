import { Router } from 'express';
import Components from '../../controllers/api/Components';

export default (): Router => {
    const router = Router();

    router.get('/test', Components.GETtest);

    return router;
};

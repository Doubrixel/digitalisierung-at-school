import { Router } from 'express';
import Wahlpflichtfach from '../../controllers/api/Wahlpflichtfach';

export default (): Router => {
    const router = Router();

    router.get('/test', Wahlpflichtfach.GETtest);

    return router;
};

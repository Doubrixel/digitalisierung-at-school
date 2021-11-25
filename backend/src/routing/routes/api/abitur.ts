import { Router } from 'express';
import Abitur from '../../controllers/api/Abitur';
import AbiturValidators from '../../validators/api/abitur';

export default (): Router => {
    const router = Router();

    router.get('/test', Abitur.GETtest);
    router.post('/applyForTopic', AbiturValidators.POSTApplyForTopic, Abitur.POSTapplyForTopic);
    router.post('/editData/:studentId', AbiturValidators.POSTeditData, Abitur.POSTeditData);

    return router;
};

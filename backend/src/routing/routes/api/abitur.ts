import { Router } from 'express';
import Abitur from '../../controllers/api/Abitur';
import AbiturValidators from '../../validators/api/abitur';

export default (): Router => {
    const router = Router();

    router.get('/test', Abitur.GETtest);
    router.post('/applyForTopic', AbiturValidators.POSTapplyForTopic, Abitur.POSTapplyForTopic);
    router.post('/setApprovalState', AbiturValidators.POSTsetApprovalState, Abitur.POSTsetApprovalState);

    return router;
};

import { Router } from 'express';
import Facharbeit from '../../controllers/api/Facharbeit';
import FacharbeitValidators from '../../validators/api/facharbeit';

export default (): Router => {
    const router = Router();

    router.get('/test', Facharbeit.GETtest);
    router.get('/getAll', Facharbeit.GETgetAll);
    router.post('/chooseTopic', FacharbeitValidators.POSTsetApprovalState, Facharbeit.POSTchooseTopic);

    return router;
};

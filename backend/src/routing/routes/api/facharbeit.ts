import { Router } from 'express';
import Facharbeit from '../../controllers/api/Facharbeit';
import FacharbeitValidators from '../../validators/api/facharbeit';

export default (): Router => {
    const router = Router();

    router.get('/test', Facharbeit.GETtest);
    router.get('/getAll', Facharbeit.GETgetAll);
    router.post('/chooseTopic', FacharbeitValidators.POSTchooseTopic, Facharbeit.POSTchooseTopic);
    router.post('/uploadDocument', FacharbeitValidators.POSTuploadDocument, Facharbeit.POSTuploadDocument);

    return router;
};

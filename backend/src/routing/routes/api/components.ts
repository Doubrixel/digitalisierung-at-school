import { Router } from 'express';
import Components from '../../controllers/api/Components';
import ComponentValidators from '../../validators/api/components';

export default (): Router => {
    const router = Router();

    router.get('/test', Components.GETtest);
    router.post('/:componentName/setTransitionDates', ComponentValidators.POSTSetTransitionDates, Components.POSTSetTransitionDates);
    router.get('/getTransitionDatesOfAll', Components.GETGetTransitionDatesOfAll);
    return router;
};

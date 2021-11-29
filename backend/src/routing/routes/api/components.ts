import { Router } from 'express';
import Components from '../../controllers/api/Components';
import ComponentsValidators from '../../validators/api/components';

export default (): Router => {
    const router = Router();

    router.get('/test', Components.GETtest);
    router.put('/:componentName/setTransitionDates', ComponentsValidators.PUT_componentName_setTransitionDates, Components.PUT_componentName_setTransitionDates);

    return router;
};

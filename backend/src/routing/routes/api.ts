import { Router } from 'express';
import abitur from './api/abitur';
import ag from './api/ag';
import components from './api/components';
import facharbeit from './api/facharbeit';
import wahlpflichtfach from './api/wahlpflichtfach';

export default (): Router => {
    const router = Router();

    router.use('/abitur', abitur());
    router.use('/ag', ag());
    router.use('/components', components());
    router.use('/facharbeit', facharbeit());
    router.use('/wahlpflichtfach', wahlpflichtfach());

    return router;
};

import { Router } from 'express';
import Main from '../controllers/Main';

export default (): Router => {
    const router = Router();

    // Host client files
    router.use(Main.clientfiles);

    // Client side routing => always provide index.html
    router.get('*', Main.GEThomepage);

    return router;
};

import { Express } from 'express';
import homepage from './routes/index';
import api from './routes/api';

export default (app: Express): void => {
    app.use(homepage());
    app.use('/api', api());
};

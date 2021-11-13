import { Express } from 'express';
import homepage from './routes/index';
import api from './routes/api';
import auth from './routes/auth';

export default (app: Express): void => {
    app.use(homepage());
    app.use('/api', api());
    app.use('/auth', auth());
};

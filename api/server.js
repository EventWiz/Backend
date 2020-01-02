import express from 'express';
import { bouncer } from 'express-error-bouncer';
import cors from 'cors';
import helmet from 'helmet';
import routes from '../routes';

const app = express();

app.use(helmet());
app.use(express.json());
app.use(cors());
app.use('/api', routes);
app.use(bouncer);

export default app;

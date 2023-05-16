import express, { json } from 'express';
import 'express-async-errors';
import ShortLinkRouter from './routes/shortlink.js';
import URLRouter from './routes/URL.js';

const app = express();

app.use(json());

app.use('/shortlink', ShortLinkRouter);
app.use('/', URLRouter);

export default app;

import express from 'express';
import 'express-async-errors';
import ShortLinkRouter from './routes/shortlink.js';

const app = express();

app.use('/shortlink', ShortLinkRouter);

export default app;

import express from 'express';
import { getURL } from '../controller/URL.js';

const router = express.Router();

router.get('/:slug', getURL);

export default router;

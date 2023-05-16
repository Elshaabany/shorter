import express from 'express';
import { getLink, postLink, putLink } from '../controller/shortlink.js';

const router = express.Router();

router.get('/', getLink);

router.post('/', postLink);

router.put('/:slug', putLink);

export default router;

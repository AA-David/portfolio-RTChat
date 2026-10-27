import express from 'express';
import { getTag, updateTag, deleteTag } from '../controllers/tags.controller.js';

const router = express.Router();

router.get('/:tagId', getTag);
router.patch('/:tagId', updateTag);
router.delete('/:tagId', deleteTag);

export default router;

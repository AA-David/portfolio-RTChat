import express from 'express';
import { getFile, updateFile, deleteFile } from '../controllers/files.controller.js';

const router = express.Router();

router.get('/:fileId', getFile);
router.patch('/:fileId', updateFile);
router.delete('/:fileId', deleteFile);

export default router;

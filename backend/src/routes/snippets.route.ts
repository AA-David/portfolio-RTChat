import express from 'express';
import { getSnippet, updateSnippet, deleteSnippet } from '../controllers/snippets.controller.js';

const router = express.Router();

router.get('/:snippetId', getSnippet);
router.patch('/:snippetId', updateSnippet);
router.delete('/:snippetId', deleteSnippet);

export default router;

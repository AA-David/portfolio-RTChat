import express from 'express';
import {
    addReaction,
    updateMessage,
    deleteMessage,
    removeReaction,
} from '../controllers/messages.controller.js';

const router = express.Router();

router.patch('/:messageId', updateMessage);
router.delete('/:messageId', deleteMessage);

router.post('/:messageId/reactions', addReaction);
router.delete('/:messageId/reactions/:emoji', removeReaction);

export default router;

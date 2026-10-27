import express from 'express';
import { getMe, getMyConversations, deleteMe } from '../controllers/users.controller.js';

const router = express.Router();

router.get('/me', getMe);
router.get('/me/conversations', getMyConversations);
router.delete('/me', deleteMe);

export default router;

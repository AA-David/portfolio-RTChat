import express from 'express';
import {
    getConversation,
    createConversation,
    addMember,
    updateConversation,
    updateMember,
    transferOwnership,
    deleteConversation,
    removeMember,
    leaveConversation,
} from '../controllers/conversations.controller.js';
import {
    getMessages,
    createMessage,
} from '../controllers/messages.controller.js';
import { getFiles, createFile } from '../controllers/files.controller.js';
import {
    getSnippets,
    createSnippet,
} from '../controllers/snippets.controller.js';
import { getTags, createTag } from '../controllers/tags.controller.js';

const router = express.Router();

router.post('/', createConversation);

router.get('/:conversationId', getConversation);
router.patch('/:conversationId', updateConversation);
router.delete('/:conversationId', deleteConversation);

router.post('/:conversationId/members', addMember);
router.patch('/:conversationId/owner', transferOwnership);
router.delete('/:conversationId/members/me', leaveConversation);
router.patch('/:conversationId/members/:userId', updateMember);
router.delete('/:conversationId/members/:userId', removeMember);

router.get('/:conversationId/messages', getMessages);
router.post('/:conversationId/messages', createMessage);

router.get('/:conversationId/files', getFiles);
router.post('/:conversationId/files', createFile);

router.get('/:conversationId/snippets', getSnippets);
router.post('/:conversationId/snippets', createSnippet);

router.get('/:conversationId/tags', getTags);
router.post('/:conversationId/tags', createTag);

export default router;

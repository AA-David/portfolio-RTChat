import express, { type RequestHandler } from 'express';
import Message from '../models/message.model.js';

// @desc Get all messages in a conversation
// @route GET /api/conversations/:conversationId/messages
// @access Member
export const getMessages: RequestHandler = (req, res) => {};

// @desc Add new message
// @route POST /api/conversations/:conversationId/messages
// @access Member
export const createMessage: RequestHandler = (req, res) => {};

// @desc Add my reaction to message (body: {emoji})
// @route POST /api/messages/:messageId/reactions
// @access Member
export const addReaction: RequestHandler = (req, res) => {};

// @desc Edit message (content)
// @route PATCH /api/messages/:messageId
// @access Author
export const updateMessage: RequestHandler = (req, res) => {};

// @desc Tombstone delete a message
// @route DELETE /api/messages/:messageId
// @access Owner, Admin, Author
export const deleteMessage: RequestHandler = (req, res) => {};

// @desc Remove my reaction from message
// @route DELETE /api/messages/:messageId/reactions/:emoji
// @access Member
export const removeReaction: RequestHandler = (req, res) => {};

import express, { type RequestHandler } from 'express';
import Conversation from '../models/conversation.model.js';

// @desc Get one specific conversation
// @route GET /api/conversations/:conversationId
// @access Member
export const getConversation: RequestHandler = (req, res) => {};

// @desc Create a conversation
// @route POST /api/conversations
// @access Self
export const createConversation: RequestHandler = (req, res) => {};

// @desc Add new member to a conversation
// @route POST /api/conversations/:conversationId/members
// @access Owner
export const addMember: RequestHandler = (req, res) => {};

// @desc Edit conversation (title, icon)
// @route PATCH /api/conversations/:conversationId
// @access Owner
export const updateConversation: RequestHandler = (req, res) => {};

// @desc Edit member (role)
// @route PATCH /api/conversations/:conversationId/members/:userId
// @access Owner
export const updateMember: RequestHandler = (req, res) => {};

// @desc Transfer ownership of conversation
// @route PATCH /api/conversations/:conversationId/owner
// @access Owner
export const transferOwnership: RequestHandler = (req, res) => {};

// @desc Delete a conversation
// @route DELETE /api/conversations/:conversationId
// @access Owner
export const deleteConversation: RequestHandler = (req, res) => {};

// @desc Remove a member from the conversation
// @route DELETE /api/conversations/:conversationId/members/:userId
// @access Owner
export const removeMember: RequestHandler = (req, res) => {};

// @desc Leave conversation
// @route DELETE /api/conversations/:conversationId/members/me
// @access Member
export const leaveConversation: RequestHandler = (req, res) => {};

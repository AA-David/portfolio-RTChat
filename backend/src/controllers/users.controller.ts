import express, { type RequestHandler } from 'express';
import User from '../models/user.model.js';

// @desc Get my handle, pfp and email
// @route GET /api/users/me
// @access Self
export const getMe: RequestHandler = (req, res) => {};

// @desc Get my conversations (title, icon)
// @route GET /api/users/me/conversations
// @access Self
export const getMyConversations: RequestHandler = (req, res) => {};

// @desc Delete my account
// @route DELETE /api/users/me
// @access Self
export const deleteMe: RequestHandler = (req, res) => {};

import express, { type RequestHandler } from 'express';
import Tag from '../models/tag.model.js';

// @desc Get all tags in a conversation
// @route GET /api/conversations/:conversationId/tags
// @access Member
export const getTags: RequestHandler = (req, res) => {};

// @desc Get one specific tag
// @route GET /api/tags/:tagId
// @access Member
export const getTag: RequestHandler = (req, res) => {};

// @desc Add new tag
// @route POST /api/conversations/:conversationId/tags
// @access Owner, Admin
export const createTag: RequestHandler = (req, res) => {};

// @desc Edit tag (name, colour)
// @route PATCH /api/tags/:tagId
// @access Owner, Admin
export const updateTag: RequestHandler = (req, res) => {};

// @desc Hard delete a tag
// @route DELETE /api/tags/:tagId
// @access Owner, Admin
export const deleteTag: RequestHandler = (req, res) => {};

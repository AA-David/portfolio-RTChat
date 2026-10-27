import express, { type RequestHandler } from 'express';
import Snippet from '../models/snippet.model.js';

// @desc Get all snippets in a conversation
// @route GET /api/conversations/:conversationId/snippets
// @access Member
export const getSnippets: RequestHandler = (req, res) => {};

// @desc Get one specific snippet
// @route GET /api/snippets/:snippetId
// @access Member
export const getSnippet: RequestHandler = (req, res) => {};

// @desc Add new snippet
// @route POST /api/conversations/:conversationId/snippets
// @access Member
export const createSnippet: RequestHandler = (req, res) => {};

// @desc Edit snippet (title, content, language, tags)
// @route PATCH /api/snippets/:snippetId
// @access Owner, Admin, Author
export const updateSnippet: RequestHandler = (req, res) => {};

// @desc Hard delete a snippet
// @route DELETE /api/snippets/:snippetId
// @access Owner, Admin, Author
export const deleteSnippet: RequestHandler = (req, res) => {};

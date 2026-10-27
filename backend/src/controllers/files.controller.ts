import express, { type RequestHandler } from 'express';
import File from '../models/file.model.js';

// @desc Get all files in a conversation
// @route GET /api/conversations/:conversationId/files
// @access Member
export const getFiles: RequestHandler = (req, res) => {};

// @desc Get one specific file
// @route GET /api/files/:fileId
// @access Member
export const getFile: RequestHandler = (req, res) => {};

// @desc Add new file
// @route POST /api/conversations/:conversationId/files
// @access Member
export const createFile: RequestHandler = (req, res) => {};

// @desc Edit file (title, tags)
// @route PATCH /api/files/:fileId
// @access Owner, Admin, Author
export const updateFile: RequestHandler = (req, res) => {};

// @desc Hard delete a file
// @route DELETE /api/files/:fileId
// @access Owner, Admin, Author
export const deleteFile: RequestHandler = (req, res) => {};

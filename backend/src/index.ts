import express from 'express';
import { connectDB } from './config/db.js';

import { errorHandler, notFound } from './middleware/error.middleware.js';

import usersRouter from './routes/users.route.js';
import conversationsRouter from './routes/conversations.route.js';
import messagesRouter from './routes/messages.route.js';
import filesRouter from './routes/files.route.js';
import snippetsRouter from './routes/snippets.route.js';
import tagsRouter from './routes/tags.route.js';

export const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded());

app.use('/api/users', usersRouter);
app.use('/api/conversations', conversationsRouter);
app.use('/api/messages', messagesRouter);
app.use('/api/files', filesRouter);
app.use('/api/snippets', snippetsRouter);
app.use('/api/tags', tagsRouter);

app.use(notFound);
app.use(errorHandler);

const start = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log('Server started', PORT);
    });
};

start();

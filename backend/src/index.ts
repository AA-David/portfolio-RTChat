import express from 'express';
import { connectDB } from './config/db.js';

export const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded());

const start = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log('Server started', PORT);
    });
};

start();

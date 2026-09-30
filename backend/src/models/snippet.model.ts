import mongoose from 'mongoose';

const SnippetSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
        },
        content: {
            type: String,
            required: true,
        },
        uploadedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        conversationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Conversation',
            required: true,
            index: true,
        },
        tags: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Tag',
            },
        ],
        language: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
    },
    { timestamps: true },
);

export const Snippet = mongoose.model('Snippet', SnippetSchema);

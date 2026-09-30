import mongoose from 'mongoose';

const ConversationSchema = new mongoose.Schema(
    {
        members: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
        ],
        title: {
            type: String,
            trim: true,
            maxlength: 100,
            // TODO: revisit the default for title
            default: '',
        },
        icon: {
            type: String,
            // TODO: revisit the default for icon
            default: '',
        },
    },
    { timestamps: true },
);

export const Conversation = mongoose.model('Conversation', ConversationSchema);

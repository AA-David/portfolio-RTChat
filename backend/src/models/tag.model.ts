import mongoose from 'mongoose';
import validator from 'validator';

const TagSchema = new mongoose.Schema(
    {
        conversationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Conversation',
            required: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 30,
        },
        colour: {
            type: String,
            required: true,
            validate: [
                validator.isHexColor,
                'Please provide a valid hex colour',
            ],
        },
    },
    { timestamps: true },
);

TagSchema.index({ conversationId: 1, name: 1 }, { unique: true });

export const Tag = mongoose.model('Tag', TagSchema);

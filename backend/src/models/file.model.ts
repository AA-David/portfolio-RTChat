import mongoose from 'mongoose';
import validator from 'validator';

const FileSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 255,
        },
        url: {
            type: String,
            required: true,
            validate: [validator.isURL, 'Please provide a valid URL'],
        },
        uploadedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        mimeType: {
            type: String,
            required: true,
            validate: [validator.isMimeType, 'Please provide a valid MIME type'],
        },
        tags: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Tag',
            },
        ],
        conversationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Conversation',
            required: true,
            index: true,
        },
        size: {
            type: Number,
            required: true,
            min: 0,
            validate: [Number.isInteger, 'File size must be a whole number of bytes'],
        },
    },
    { timestamps: true },
);

const File = mongoose.model('File', FileSchema);
export default File;

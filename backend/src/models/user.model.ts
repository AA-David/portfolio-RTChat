import mongoose from 'mongoose';
import validator from 'validator';

const UserSchema = new mongoose.Schema(
    {
        handle: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 3,
            maxlength: 30,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            validate: [validator.isEmail, 'Please provide a valid email'],
        },
        password: {
            type: String,
            required: true,
        },
        // TODO: revisit the default for pfp
        pfp: {
            type: String,
            default: '',
        },
    },
    { timestamps: true },
);

export const User = mongoose.model('User', UserSchema);

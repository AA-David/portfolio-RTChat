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
            validate: [
                (v: string) => /^[a-zA-Z0-9_]+$/.test(v),
                'Handle can only contain letters, numbers and underscores',
            ],
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
            validate: [
                (v: string) => v === '' || validator.isURL(v),
                'Please provide a valid profile picture URL',
            ],
        },
    },
    { timestamps: true },
);

const User = mongoose.model('User', UserSchema);
export default User;

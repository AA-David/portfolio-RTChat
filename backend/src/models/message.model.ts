import mongoose from 'mongoose';

const ReactionSchema = new mongoose.Schema(
    {
        emoji: {
            type: String,
            required: true,
        },
        users: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    { _id: false },
);

// Inline mentions can be users, files or saved snippets
const MENTION_KINDS = ['User', 'File', 'Snippet'] as const;
// Attachments can only be files or saved snippets
const ATTACHMENT_KINDS = ['File', 'Snippet'] as const;
type RefKind = (typeof MENTION_KINDS)[number];
type Ref = { kind: RefKind; target: mongoose.Types.ObjectId };

// A bare ObjectId doesn't say which collection it belongs to, so each
// mention/attachment stores a pair:
//   kind:   which collection to look in ('User' | 'File' | 'Snippet')
//   target: the _id of the document in that collection
// e.g. { kind: 'Snippet', target: ObjectId('665f...') }
// refPath tells Mongoose to read `kind` when populating `target`, instead of
// using a single fixed `ref`. Stored by ID so renames don't break anything.
const MentionSchema = new mongoose.Schema(
    {
        kind: {
            type: String,
            enum: MENTION_KINDS,
            required: true,
        },
        target: {
            type: mongoose.Schema.Types.ObjectId,
            refPath: 'mentions.kind',
            required: true,
        },
    },
    { _id: false },
);

const AttachmentSchema = new mongoose.Schema(
    {
        kind: {
            type: String,
            enum: ATTACHMENT_KINDS,
            required: true,
        },
        target: {
            type: mongoose.Schema.Types.ObjectId,
            refPath: 'attachments.kind',
            required: true,
        },
    },
    { _id: false },
);

const MessageSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
            trim: true,
            maxlength: 4000,
        },
        repliedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message',
            default: null,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        reactions: [ReactionSchema],
        mentions: [MentionSchema],
        attachments: [AttachmentSchema],
        conversationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Conversation',
            required: true,
            index: true,
        },
    },
    { timestamps: true },
);

// TODO: report which mention/attachment failed instead of one generic error message
// TODO: move somewhere better
// TODO: Cover more than just save and create

// Users, files, and snippets referenced must belong to the message's conversation
async function allInConversation(
    conversationId: mongoose.Types.ObjectId,
    refs: Ref[],
) {
    if (!refs.length) return true;

    const idsOf = (kind: RefKind) => [
        ...new Set(
            refs.filter((r) => r.kind === kind).map((r) => String(r.target)),
        ),
    ];
    const userIds = idsOf('User');
    const fileIds = idsOf('File');
    const snippetIds = idsOf('Snippet');

    const [userMatch, fileCount, snippetCount] = await Promise.all([
        userIds.length
            ? mongoose.model('Conversation').countDocuments({
                  _id: conversationId,
                  members: { $all: userIds },
              })
            : 1,
        fileIds.length
            ? mongoose.model('File').countDocuments({
                  _id: { $in: fileIds },
                  conversationId,
              })
            : 0,
        snippetIds.length
            ? mongoose.model('Snippet').countDocuments({
                  _id: { $in: snippetIds },
                  conversationId,
              })
            : 0,
    ]);

    return (
        userMatch === 1 &&
        fileCount === fileIds.length &&
        snippetCount === snippetIds.length
    );
}

type MessageDoc = mongoose.Document & {
    conversationId: mongoose.Types.ObjectId;
};

MessageSchema.path('mentions').validate(async function (
    this: MessageDoc,
    mentions: Ref[],
) {
    return allInConversation(this.conversationId, mentions);
}, 'Mentions must be members, files or snippets of the same conversation');

MessageSchema.path('attachments').validate(async function (
    this: MessageDoc,
    attachments: Ref[],
) {
    return allInConversation(this.conversationId, attachments);
}, 'Attachments must be files or snippets of the same conversation');

export const Message = mongoose.model('Message', MessageSchema);

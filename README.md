# RT Chat

A MERN stack real-time chat app with built-in code snippet sharing.

## What is this project?

I am making this to add to my portfolio. I wanted to explore web sockets and implementing real time apps because I have never done anything like this before. Therefore I made a realtime chat app: but to stand out from a generic tutorial project, I made it slightly less generic by making sharing code as the primary feature. A lot of chat apps are missing code sharing features as programmers are not their primary audience. In this app, there is a code editor and snippet sharing features, alongside neat file uploading.

## Tech Stack

**Frontend:** React
**Backend:** Node.js, Express
**Database:** MongoDB + Mongoose
**Real-time:** raw WebSockets (`ws`): chosen over something like Socket. io because I wanted to understand the underlying concepts.
**Auth:** JWT first, GitHub OAuth via Passport.js planned at some point
**Code editor:** CodeMirror 6 because it is lighter than say Monaco
**Rich text / mention composer:** TipTap or Lexical, for inline draggable/collapsible snippet & file mentions in the message box. Not fully decided
**File storage:** Cloudinary or S3, for uploaded files. Not fully decided.

## AI usage

I have used generative AI for discussion of good practices and approaches to problems such as scoping decisions, and for review. Used to write boilerplate, repetitive, syntax-heavy code based on my own decisions with full understanding of the implementation. Always used constructively and for learning.

## Core Features

- Real-time messaging: A conversation can be 1-on-1, then members can be added or removed (therefore no distinction between a group and DM)
- Emoji reactions on messages
- Threaded replies (`repliedTo` on Message)
- Code snippets — write/save in a dedicated editor, or send inline in
  a message
    - **Saved snippet**: persisted, requires a title, reusable, tied to a Conversation
    - **Unsaved/inline snippet**: written directly in the message box and stored only as part of the message content (not a Snippet document), no title required — can be saved and titled later from chat, which creates a Snippet
- `@mentioning` people, files, and saved snippets **inline** in a message (mentions can be collapsed/expanded in the UI)
- Attaching files and saved snippets to a message, separately from its text
- File uploads: still not sure what filetypes to accept, considering free-tier storage limitations
- Tags which can be applied to saved code snippets and uploaded files

## Data Model (MongoDB)

Collections: `User`, `Conversation`, `Message`, `Tag`, `File`, `Snippet`

- **Snippet and File are separate collections**, not merged. Despite surface similarity, they differ in storage (Snippet content is plain text in Mongo; File content lives in external storage, Mongo just holds the URL/metadata), required fields, and rendering.
- **Conversation has no `type` field** — DM vs. group is inferred from member count if ever needed for UI filtering, not stored.
- **Reactions are embedded** directly on Message.
- **Members, author, tags, and mentions are referenced** by ID, not embedded to avoid duplicating data across many documents.

All collections also have `createdAt` / `updatedAt` (Mongoose `timestamps`). Schemas live in `backend/src/models/`.

### User

| Field      | Type   |
| ---------- | ------ |
| `handle`   | String |
| `email`    | String |
| `password` | String |
| `pfp`      | String |

### Conversation

| Field     | Type              |
| --------- | ----------------- |
| `members` | [ObjectId → User] |
| `title`   | String            |
| `icon`    | String            |

### Message

| Field            | Type                    |
| ---------------- | ----------------------- |
| `content`        | String                  |
| `author`         | ObjectId → User         |
| `conversationId` | ObjectId → Conversation |
| `repliedTo`      | ObjectId → Message      |
| `reactions`      | [Reaction]              |
| `mentions`       | [Mention]               |
| `attachments`    | [Attachment]            |

**Reaction** (embedded in Message): `emoji` (String, required) and `users` ([ObjectId → User]).

**Mention** (embedded in Message, no `_id`): `kind` (`'User'` \| `'File'` \| `'Snippet'`, required) and `target` (ObjectId, required, resolved to the collection named by `kind`). Mentions are stored by ID so renames don't break them. On save, a mentioned user must be a member of the message's conversation, and a mentioned file or snippet must belong to that same conversation.

**Attachment** (embedded in Message, no `_id`): same shape as Mention, but `kind` is only `'File'` \| `'Snippet'`. Validated the same way: each attached file or snippet must belong to the message's conversation.

### Snippet

| Field            | Type                    |
| ---------------- | ----------------------- |
| `title`          | String                  |
| `content`        | String                  |
| `language`       | String                  |
| `uploadedBy`     | ObjectId → User         |
| `conversationId` | ObjectId → Conversation |
| `tags`           | [ObjectId → Tag]        |

### File

| Field            | Type                    |
| ---------------- | ----------------------- |
| `title`          | String                  |
| `url`            | String                  |
| `mimeType`       | String                  |
| `size`           | Number                  |
| `uploadedBy`     | ObjectId → User         |
| `conversationId` | ObjectId → Conversation |
| `tags`           | [ObjectId → Tag]        |

### Tag

| Field            | Type                    |
| ---------------- | ----------------------- |
| `conversationId` | ObjectId → Conversation |
| `name`           | String                  |
| `colour`         | String                  |

`(conversationId, name)` has a unique compound index, so tag names are unique within a conversation.

## Planned V2+ / stretch goals

- Drag-and-drop snippet/file into chat (v1 is `@mention` only)
- Custom avatar character creation
- OAuth
- Pings and notifications

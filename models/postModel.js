import mongoose from '../config/database.js';

const postSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    profilePhoto: {
        type: String,
        required: true
    },
    timePosted: {
        type: Date,
        default: Date.now
    },
    content: {
        type: String,
        required: true
    },
    media: {
        type: String,
        default: null
    },
    likes: {
        type: Number,
        default: 0
    },
    likedUsers: [
        {
            type: String
        }
    ],
    commentsCount: {
        type: Number,
        default: 0
    },
    comments: [
        {
            username: {
                type: String,
                required: true
            },
            profilePhoto: {
                type: String,
                required: true
            },
            content: {
                type: String,
                required: true
            },
            timePosted: {
                type: Date,
                default: Date.now
            }
        }
    ]
});

const Post = mongoose.model('Post', postSchema);

export default Post;
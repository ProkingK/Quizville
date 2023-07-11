import jwt from 'jsonwebtoken';
import Post from '../models/postModel.js';

export const add = (req, res) => {

    const token = req.cookies.token;

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);

        try {
            const { username, profilePhoto, content, media } = req.body;

            const newPost = new Post({
                username,
                profilePhoto,
                content,
                media
            });

            Post.create(newPost);

            res.status(201).json({ success: true, post: newPost });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ message: 'Invalid token' });
    }
};

export const getAll = async (req, res) => {
    const token = req.cookies.token;

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);

        try {
            const posts = await Post.find({});

            res.status(201).json({ success: true, posts: posts });
        }
        catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ message: 'Invalid token' });
    }
};

export const like = async (req, res) => {
    const token = req.cookies.token;

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);

        try {
            const { username, type, postID } = req.body;
            const post = await Post.findById(postID);

            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }

            if (type === 'like') {
                post.likes += 1;
                post.likedUsers.push(username);
            }
            else {
                post.likes -= 1;
                post.likedUsers = post.likedUsers.filter((user) => user !== username);
            }

            await post.save();

            res.status(200).json({ success: true });
        }
        catch (error) {
            console.error('Error liking post', error);
            res.status(500).json({ success: false, error: error.message });
        }
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ message: 'Invalid token' });
    }
};

export const comment = async (req, res) => {

    const token = req.cookies.token;

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);

        try {
            const { username, profilePhoto, content, postID } = req.body;

            const post = await Post.findById(postID);

            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }

            const newComment = {
                username,
                profilePhoto,
                content,
                timePosted: new Date()
            };

            post.comments.push(newComment);
            post.commentsCount += 1;

            await post.save();

            res.status(201).json({ success: true, comment: newComment });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ message: 'Invalid token' });
    }
};
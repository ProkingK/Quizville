import Post from '../models/postModel.js';

export const add = (req, res) => {
    try {
        const { username, content, media} = req.body;

        const newPost = new Post({
            username,
            content,
            media
        });
      
        Post.create(user);

        res.status(201).json({ success: true, post: newPost });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
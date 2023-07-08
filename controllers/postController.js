import Post from '../models/postModel.js';

export const add = (req, res) => {
    try {
        const { username, profilePhoto, content, media} = req.body;

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
};
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
import express from 'express';
import * as postController from '../controllers/postController.js';

const postRouter = express.Router();

postRouter.post('/add', postController.add);
postRouter.get('/get-all', postController.getAll);
postRouter.post('/like', postController.like);

export default postRouter;
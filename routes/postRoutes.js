import express from 'express';
import * as postController from '../controllers/postController.js';

const postRouter = express.Router();

postRouter.post('/add', postController.add);

export default postRouter;
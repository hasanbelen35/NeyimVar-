import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { LikeController } from '../controllers/like.controller';

const likeRouter = Router();

const likeController = new LikeController(); 

// LIKE ROUTES
likeRouter.post('/:noteId', authMiddleware, likeController.toggleLike);

export default likeRouter;
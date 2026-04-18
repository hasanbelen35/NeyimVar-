import { Request, Response } from 'express';
import { LikeService } from '../services/like.service';
import { catchAsync } from '../utils/catchAsync';
import { validateUser } from '../utils/validate.user';

export class LikeController {

    private likeService: LikeService;

    constructor() {
        this.likeService = new LikeService();
    }

    // TOGGLE LIKE
    toggleLike = catchAsync(async (req: Request, res: Response) => {
        const userId = validateUser(req);
        const noteId = req.params.noteId as string;

        const result = await this.likeService.toggleLike(userId, noteId);

        res.status(200).json({
            status: 'success',
            data: result
        });
    });
}
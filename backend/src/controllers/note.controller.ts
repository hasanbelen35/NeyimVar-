import { Request, Response } from 'express';
import * as NoteService from '../services/note.service';
import { catchAsync } from '../utils/catchAsync';

// CREATE NOTE CONTROLLER
export const createNoteController = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user?.userId;

    if (!userId) {
        return res.status(401).json({ status: 'fail', message: 'Unauthorized' });
    }
  
    const { title, content, isPublic } = req.body;

    if (!title || !content) {
        return res.status(400).json({
            status: 'fail',
            message: 'Title and content are required.'
        });
    }

    const newNote = await NoteService.createNoteService(userId, {
        title,
        content,
        isPublic: isPublic ?? true
    });

    res.status(201).json({
        status: 'success',
        data: newNote
    });
});
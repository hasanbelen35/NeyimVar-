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

// GET ALL NOTES CONTROLLER
export const getAllNotesController = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user?.userId;
    
    if (!userId) {
        return res.status(401).json({ status: 'fail', message: 'Unauthorized' });
    };

    const notes = await NoteService.getAllNotesService(userId);
    res.status(200).json({
        status: 'success',
        data: notes

    });
});

// DELETE NOTE CONTROLLER
export const deleteNoteController = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user?.userId;
    const noteId = parseInt(req.params.id as string);
    if (!userId) {
        return res.status(401).json({ status: 'fail', message: 'Unauthorized' });
    };

    await NoteService.deleteNoteService(noteId, userId);
    res.status(204).json({
        status: 'success',
        data: null
    });
});

//UPDATE NOTE CONTROLLER
export const updateNoteController = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user?.userId;
    const noteId = parseInt(req.params.id as string);
    const { title, content, isPublic } = req.body;
    if (!userId) {
        return res.status(401).json({ status: 'fail', message: 'Unauthorized' });
    };
    if (!title || !content) {
        return res.status(400).json({
            status: 'fail',
            message: 'Title and content are required.'
        });
    }   
    const updatedNote = await NoteService.updateNoteService(noteId, userId, {
        title,
        content,    
        isPublic: isPublic ?? true
    });

    res.status(200).json({
        status: 'success',
        data: updatedNote
    });
});


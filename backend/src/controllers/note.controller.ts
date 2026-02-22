import { Request, Response } from 'express';
import * as NoteService from '../services/note.service';
import { catchAsync } from '../utils/catchAsync';
import { validateUser } from '../utils/validate.user';

// CREATE NOTE CONTROLLER
export const createNoteController = catchAsync(async (req: Request, res: Response) => {
    const userId = validateUser(req); 
    const { title, content, isPublic } = req.body;

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
    const userId = validateUser(req);
    const notes = await NoteService.getAllNotesService(userId);
    res.status(200).json({
        status: 'success',
        data: notes
    });
});

// DELETE NOTE CONTROLLER
export const deleteNoteController = catchAsync(async (req: Request, res: Response) => {
    const userId = validateUser(req);
    const noteId = req.params.id as string; 

    await NoteService.deleteNoteService(noteId, userId);
    
    res.status(200).json({
        status: 'success',
        message: 'Note deleted successfully.'
    });
});

// UPDATE NOTE CONTROLLER
export const updateNoteController = catchAsync(async (req: Request, res: Response) => {
    const userId = validateUser(req);
    const noteId = req.params.id as string;
    const { title, content, isPublic } = req.body;

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
import { NoteDto } from '../types/note.type';
import prisma from '../database/db';

export class NoteService {
    // CREATE NOTE SERVICE
    async createNoteService(userId: string, noteData: NoteDto) {
        return await prisma.note.create({
            data: {
                ...noteData,
                userId
            }
        });
    }
    // GET ALL NOTES SERVICE
    async getAllNotesService(userId: string) {
        return await prisma.note.findMany({
            where: { userId }
        });
    }
    // DELETE NOTE SERVICE
    async deleteNoteService(noteId: string, userId: string) {
        const note = await prisma.note.findUnique({
            where: { id: noteId }
        });
        if (!note) {
            throw new Error('Note not found');
        }
        if (note.userId !== userId) {
            throw new Error('Unauthorized');
        }
        await prisma.note.delete({
            where: { id: noteId }
        });
    }
    // UPDATE NOTE SERVICE
    async updateNoteService(noteId: string, userId: string, updatedNoteData: NoteDto) {
        const note = await prisma.note.findUnique({
            where: { id: noteId }
        });
        if (!note) {
            throw new Error('Note not found');
        }
        if (note.userId !== userId) {
            throw new Error('Unauthorized');
        }
        return await prisma.note.update({
            where: { id: noteId },
            data: {
                ...updatedNoteData
            }
        });
    }
}
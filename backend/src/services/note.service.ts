/*
id        Int      @id @default(autoincrement())
  title     String
  content   String   @db.Text
  isPublic  Boolean  @default(true) 
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  userId    Int
  user      User     
*/

import { NoteDto } from '../types/note.type';
import prisma from '../database/db';

// CREATE NOTE SERVICE
export const createNoteService = async (userId: string, noteData: NoteDto) => {
    return await prisma.note.create({
        data: {
            ...noteData,
            userId
        }
    });
};

// GET ALL NOTES SERVICE
export const getAllNotesService = async (userId: string) => {
    return await prisma.note.findMany({
        where: { userId }
    });
};

// DELETE NOTE SERVICE
export const deleteNoteService = async (noteId: string, userId: string) => {
    const note = await prisma.note.findUnique({
        where: { id: noteId }
    });
    if (!note) {
        throw new Error('Note not found');
    };
    if (note.userId !== userId) {
        throw new Error('Unauthorized');
    };
    await prisma.note.delete({
        where: { id: noteId }
    });

};

// UPDATE NOTE SERVICE
export const updateNoteService = async (noteId: string, userId: string, updatedNoteData: NoteDto) => {
    const note = await prisma.note.findUnique({
        where: { id: noteId }
    });
    if (!note) {
        throw new Error('Note not found');
    };
    if (note.userId !== userId) {
        throw new Error('Unauthorized');
    };
    return await prisma.note.update({
        where: { id: noteId },
        data: {
            ...updatedNoteData
        }
    });
};

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
export const createNoteService = async (userId: number, noteData: NoteDto) => {
    return await prisma.note.create({
        data: {
            ...noteData,
            userId
        }
    });
};

// GET ALL NOTES SERVICE
export const getAllNotesService = async (userId: number) => {
    return await prisma.note.findMany({
        where: { userId }
    });
};
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
    async getPaginatedNotesService(page: number, limit: number, currentUserId?: string) {
        const offset = (page - 1) * limit;

        const [notes, totalNotes] = await prisma.$transaction([
            prisma.note.findMany({
                skip: offset,
                take: limit,
                orderBy: { createdAt: 'desc' },
                where: { isPublic: true },
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            surname: true,
                            profile: {
                                select: {
                                    username: true,
                                    avatarUrl: true,
                                    university: true,
                                    department: true,
                                }
                            }
                        }
                    },
                    likes: currentUserId ? {
                        where: {
                            userId: currentUserId
                        },
                        select: {
                            userId: true
                        }
                    } : false,
                    _count: {
                        select: {
                            likes: true
                        }
                    }
                }
            }),
            prisma.note.count({
                where: { isPublic: true }
            })
        ]);
        // is user liked who logged in
        const formattedNotes = notes.map(note => ({
            ...note,
            likeCount: note._count.likes,
            isLiked: currentUserId ? (note as any).likes.length > 0 : false,
            _count: undefined,
            likes: undefined
        }));

        return {
            notes: formattedNotes,
            totalPages: Math.ceil(totalNotes / limit),
            currentPage: page,
            hasMore: page < Math.ceil(totalNotes / limit)
        };
    }
}


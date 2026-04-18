import prisma from '../database/db';

export class LikeService {
  async toggleLike(userId: string, noteId: string) {

    const existingLike = await prisma.like.findUnique({
      where: {
        userId_noteId: { userId, noteId }
      }
    });

    if (existingLike) {
      await prisma.like.delete({
        where: {
          userId_noteId: { userId, noteId }
        }
      });
    } else {
      await prisma.like.create({
        data: { userId, noteId }
      });
    }

    const count = await prisma.like.count({
      where: { noteId }
    });

    return {
      isLiked: !existingLike, 
      likeCount: count
    };
  }
}
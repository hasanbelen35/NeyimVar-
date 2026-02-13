import prisma from '../database/db';

// GET PROFILE BY USER ID SERVICE
export const getProfileByUserId = async (userId: number) => {
    return await prisma.profile.findUnique({
        where: { userId },
        include: {
            user: {
                select: {
                    name: true,
                    surname: true,
                    email: true
                }
            }
        }
    });
};

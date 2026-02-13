import prisma from '../database/db';
import { ProfileDto } from '../types/profile.type';

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
/*
username    String? @unique
  bio         String? @db.Text
  university  String?
  department  String?
  avatarUrl   String?*/


// UPDATE PROFILE SERVICE
export const updateProfile = async (userId: number, profileData: ProfileDto) => {
    const { username, bio, university, department, avatarUrl } = profileData;
    return await prisma.profile.update({
        where: { userId },
        data: {
            username,
            bio,
            university,
            department,
            avatarUrl
        }
    });
};      
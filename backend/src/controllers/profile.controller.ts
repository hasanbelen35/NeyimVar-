import { getProfileByUserId, updateProfile } from "../services/profile.service";
import { Request, Response } from 'express';
import { catchAsync } from "../utils/catchAsync";
import { AppError } from '../utils/appError';
import { validateUser } from '../utils/validate.user';

// get profile by user id controller
export const getProfileByUserIdController = catchAsync(
    async (req: Request, res: Response) => {
        const userId = validateUser(req);
        const profile = await getProfileByUserId(userId);
        if (!profile) {
            throw new AppError("Profile not found.", 404)
        }
        res.status(200).json({
            status: "success",
            data: profile
        });
    }
);

// export const updateProfile = 
// async (userId: number, profileData: ProfileDto) => {
export const updateProfileController = catchAsync(
    async (req: Request, res: Response) => {
        const userId = validateUser(req);
        const profileData = req.body;
        const updatedProfile = await updateProfile(
            userId,
            profileData
        );
        res.status(200).json({
            status: "success",
            data: updatedProfile
        });
    }
);


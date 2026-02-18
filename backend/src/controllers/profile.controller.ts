import { getProfileByUserId, updateProfile } from "../services/profile.service";
import { Request, Response } from 'express';
import { catchAsync } from "../utils/catchAsync";
// get profile by user id controller
export const getProfileByUserIdController = catchAsync(
    async (req: Request, res: Response) => {

        if (!req.user?.userId) {
            return res.status(401).json({
                status: "fail",
                message: "Unauthorized"
            });
        }

        const profile = await getProfileByUserId(req.user.userId);

        if (!profile) {
            return res.status(404).json({
                status: "error",
                message: "Profile not found."
            });
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
        const userId = req.user?.userId;

        if (!userId) {
            return res.status(401).json({
                status: "fail",
                message: "Unauthorized"
            });
        }

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


import { getProfileByUserId } from "../services/profile.service";

export const getProfileByUserIdController = async (req: any, res: any) => { 

    const userId = req.user?.userId;
    const profile = await getProfileByUserId(Number(userId!));
    
    if (!profile) {
        return res.status(404).json({
            status: 'error',
            message: 'Profile not found.'
        });
    }

    res.status(200).json({
        status: 'success',
        data: profile
    });
};
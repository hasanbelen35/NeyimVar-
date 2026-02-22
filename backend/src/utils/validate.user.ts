import { AppError } from './appError';

// validate user function getting user id from req and if user id is not exist throw error
// instead of write in every controller 
export const validateUser = (req: any): string => {
  const userId = req.user?.userId;

  if (!userId) {
    throw new AppError('Bu işlemi yapmak için giriş yapmalısınız.', 401);
  }

  return userId; 
};
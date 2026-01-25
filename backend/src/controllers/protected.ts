import { Response } from 'express';
export const protectedRoute = (res: Response) => { 
    res.status(200).json({ 
        status: 'success', 
        message: 'You have accessed a protected route!' 
    });  
}

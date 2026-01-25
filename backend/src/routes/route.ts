import { Router } from "express";
import { register, login } from '../controllers/auth.controller';
import { protectedRoute } from '../controllers/protected';  
import  { authMiddleware } from '../middlewares/auth.middleware';
const router = Router();
router.post('/register', register);
router.post('/login', login);
router.get("/protected", authMiddleware , protectedRoute );
export default router;

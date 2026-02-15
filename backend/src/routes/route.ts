import { Router } from "express";
import { register, login, logout, getMe } from '../controllers/auth.controller';
import { protectedRoute } from '../controllers/protected';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate';
import { registerSchema, loginSchema } from '../validators/authValidator';
import { getProfileByUserIdController, updateProfileController } from "../controllers/profile.controller";
import { createNoteController } from "../controllers/note.controller";
const router = Router();
// AUTH ROUTES
router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.get("/protected", authMiddleware, protectedRoute);
router.get("/logout", logout)
router.get("/me", authMiddleware, getMe);
//PROFILE ROUTES
router.get('/profile/me', authMiddleware, getProfileByUserIdController);
router.put('/profile/edit-profile', authMiddleware, updateProfileController);
//NOTE ROUTES   
router.post('/notes/create-new-note', authMiddleware, createNoteController)


export default router;

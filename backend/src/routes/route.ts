import { Router } from "express";
import * as authController from '../controllers/auth.controller';
import { protectedRoute } from '../controllers/protected';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate';
import { registerSchema, loginSchema } from '../validators/authValidator';
import { getProfileByUserIdController, updateProfileController } from "../controllers/profile.controller";
import * as NoteController from '../controllers/note.controller';
import { updateProfileSchema } from "../validators/profile.validator";
import { noteSchema } from "../validators/note.validator";
const router = Router();
// AUTH ROUTES
router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);
router.get("/protected", authMiddleware, protectedRoute);
router.get("/logout", authController.logout)
router.get("/me", authMiddleware, authController.getMe);
//PROFILE ROUTES
router.get('/profile/me', authMiddleware, getProfileByUserIdController);
router.put('/profile/edit-profile', authMiddleware, validate(updateProfileSchema), updateProfileController);
//NOTE ROUTES   
router.post('/notes/create-new-note', authMiddleware, validate(noteSchema), NoteController.createNoteController)
router.get('/notes/get-all-notes', authMiddleware, NoteController.getAllNotesController);
router.delete('/notes/delete-note/:id', authMiddleware, NoteController.deleteNoteController);
router.put('/notes/update-note/:id', authMiddleware, validate(noteSchema), NoteController.updateNoteController);




export default router;

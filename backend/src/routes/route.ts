import { Router } from "express";
import * as authController from '../controllers/auth.controller';
import { protectedRoute } from '../controllers/protected';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate';
import { registerSchema, loginSchema } from '../validators/authValidator';
import { getProfileByUserIdController, updateProfileController } from "../controllers/profile.controller";
import { updateProfileSchema } from "../validators/profile.validator";
import { noteSchema } from "../validators/note.validator"
import { NoteService } from '../services/note.service';
import { NoteController } from '../controllers/note.controller';
// Router;
const router = Router();
// NoteController with dependency injection
const noteService = new NoteService();
const noteController = new NoteController(noteService);
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
router.post('/notes/create-new-note', authMiddleware, validate(noteSchema), noteController.createNoteController);
router.get('/notes/get-all-notes', authMiddleware, noteController.getAllNotesController);
router.delete('/notes/delete-note/:id', authMiddleware, noteController.deleteNoteController);
router.put('/notes/update-note/:id', authMiddleware, validate(noteSchema), noteController.updateNoteController);




export default router;

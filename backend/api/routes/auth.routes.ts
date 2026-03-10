import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import { protectRoute } from '../middlewares/protectedMiddleware';

const router = Router();

router.post('/register', authController.signUp);
router.post('/login', authController.signIn);
router.post('/logout', authController.signOut);
router.post('/refresh', authController.refreshToken);
router.get('/userinfo', protectRoute, authController.getUserInfo);





export default router;
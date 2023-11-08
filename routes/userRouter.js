import { Router } from 'express';
import {
  getAppStats,
  getCurrentUser,
  updateUser,
} from '../controllers/userController.js';
import { validateUpdateUser } from '../middleware/validationMiddleware.js';
import {
  authorizePermission,
  checkForTestUser,
} from '../middleware/authMiddleware.js';
import upload from '../middleware/multerMiddleware.js';

const router = Router();

router.get('/current-user', getCurrentUser);
router.get('/admin/app-stats', [authorizePermission('admin'), getAppStats]);
router.patch(
  '/update-user',
  checkForTestUser,
  upload.single('avatar'),
  validateUpdateUser,
  updateUser
);

export default router;

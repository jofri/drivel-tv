// Import express router
import { Router } from 'express';
import broadcastController from './controllers/broadcast-controller';
import { getUserInfo, registerUser, userLogIn } from './controllers/user-controller';
import authMiddleware from './middleware/auth';

const router = Router();

// Route to get all broadcasts
router.get('/api/get-all-broadcasts', broadcastController.getAllBroadcast);
// Route to get broadcast page (by client POSTing id to identify broadcast)
router.post('/api/get-broadcast', broadcastController.getBroadcast);
// Route to create a new broadcast
router.post('/api/create-broadcast', broadcastController.createBroadcast);
// Route to delete a broadcast
router.delete('/api/delete-broadcast', broadcastController.deleteBroadcast);

// Login and Signup
router.post('/signup', registerUser);
router.post('/login', userLogIn);
router.get('/me', authMiddleware, getUserInfo);

export default router;

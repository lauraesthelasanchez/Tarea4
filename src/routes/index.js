import express from 'express';
import { router as userRouter } from '../modules/users/users.route.js';
import { router as repairRouter } from '../modules/repairs/repairs.route.js';
import { protectRoutesWithToken } from '../modules/users/users.middleware.js';

export const router = express.Router();

router.use('/users', userRouter);
router.use(protectRoutesWithToken);
router.use('/repairs', repairRouter);

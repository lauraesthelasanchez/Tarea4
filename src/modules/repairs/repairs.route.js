import express from 'express';
import {
  deleteRepair,
  findAllRepairs,
  findOneRepair,
  register,
  updateRepair,
} from './repairs.controller.js';
import {
  hasPermission,
  validateCancelledRepair,
  validateExistPendingRepair,
} from './repairs.middleware.js';

export const router = express.Router();

router.post('/register', register);

router.use(hasPermission('employee'));
// restringe a que solo los roles dentro, tengan permiso de continuar.parseEnglish()

router.get('/', findAllRepairs);

router
  .route('/:id')
  .get(validateExistPendingRepair, findOneRepair)
  .patch(validateExistPendingRepair, updateRepair)
  .delete(validateCancelledRepair, deleteRepair);

import { RepairsServices } from './repairs.service.js';
import { catchAsync } from '../../common/errors/catchAsync.js';
import { validateRepairRegister } from './repairs.schema.js';

export const register = catchAsync(async (req, res, next) => {
  const { hasError, errorMessages, repairData } = validateRepairRegister(
    req.body
  );
  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }
  const newRepair = await RepairsServices.create(repairData);
  return res.status(201).json(newRepair);
});

export const findAllRepairs = catchAsync(async (req, res, next) => {
  const allRepairs = await RepairsServices.findAll();
  return res.status(200).json(allRepairs);
});

export const findOneRepair = catchAsync(async (req, res, next) => {
  const { repair } = req; // entregado por el middleware validatependingrepair
  return res.status(200).json(repair);
});

export const updateRepair = catchAsync(async (req, res, next) => {
  const { repair } = req;
  const { hasError, errorMessages, repairData } = validatePartialUserRegister(
    req.body
  );
  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }
  const repairUpdated = await RepairsServices.update(repair, repairData);
  return res.status(200).json(repairUpdated);
});

export const deleteRepair = catchAsync(async (req, res, next) => {
  const { repair } = req;
  await RepairsServices.delete(repair);
  return res.status(204).json();
});

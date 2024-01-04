import { AppError } from '../../common/errors/appError.js';
import { catchAsync } from '../../common/errors/catchAsync.js';
import { RepairsServices } from './repairs.service.js';

export const validateExistPendingRepair = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const repair = await RepairsServices.findOneByIdPending(id);
  if (!repair) {
    return next(new AppError(`Repair with the ID: ${id} was not found`, 404));
  }
  req.repair = repair;
  next();
});

export const validateCancelledRepair = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const repair = await RepairsServices.findOneById(id);
  if (!repair) {
    return next(new AppError(`Repair with the ID: ${id} was not found`, 404));
  }
  if (repair.status !== 'pending') {
    return next(
      new AppError(
        `The repair has been ${repair.status}, therefore, this action cannot proceed.`,
        404
      )
    );
  }
  req.repair = repair;
  next();
});

export const hasPermission = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.sessionUser.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }
    next();
  };
};

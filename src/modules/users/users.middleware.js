import { catchAsync } from '../../common/errors/catchAsync.js';
import { AppError } from '../../common/errors/appError.js';
import { UsersServices } from './users.service.js';
import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import { envs } from '../../config/environments/environments.js';

export const validateExistUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await UsersServices.findOneById(id);
  if (!user) {
    return next(new AppError(`User with the ID: ${id} was not found`, 404));
  }
  req.user = user;
  next();
});

export const protectRoutesWithToken = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(
      new AppError('You are not logged in!. Please login to get access', 401)
    );
  }
  const decoded = await promisify(jwt.verify)(token, envs.SECRET_JWT_SEED);
  const user = await UsersServices.findOneById(decoded.id);
  if (!user) {
    return next(
      new AppError('The owner of this token is not longer available', 401)
    );
  }
  if (user.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      user.passwordChangedAt.getTime() / 1000,
      10
    );
    if (decoded.iat < changedTimeStamp) {
      return next(
        new AppError(
          'User recently changed password!, please login again.',
          401
        )
      );
    }
  }
  req.sessionUser = user; //! IMPORTANT
  next();
});

export const protectAccountOwner = (req, res, next) => {
  const { user, sessionUser } = req;

  if (user.id !== sessionUser.id) {
    return next(new AppError('You do not own this account', 401));
  }

  next();
};

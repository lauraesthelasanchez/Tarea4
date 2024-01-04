import { UsersServices } from './users.service.js';
import { AppError } from '../../common/errors/appError.js';
import { catchAsync } from '../../common/errors/catchAsync.js';
import {
  validatePartialUserRegister,
  validateUserLogin,
  validateUserRegister,
} from './users.schema.js';
import { generateJWT } from '../../config/plugins/jsonwebtoken.plugin.js';
import { verifyPassword } from '../../config/plugins/bcrypt.plugin.js';

export const register = catchAsync(async (req, res, next) => {
  const { hasError, errorMessages, userData } = validateUserRegister(req.body);
  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }
  const userFinded = await UsersServices.findOneByEmail(userData.email);
  if (userFinded) {
    return next(
      new AppError(
        `The user with email: ${userData.email} has already been registered`,
        409
      )
    );
  }
  const newUser = await UsersServices.create(userData);
  const token = await generateJWT(newUser.id);
  return res.status(201).json({
    token,
    newUser: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    },
  });
});

export const login = catchAsync(async (req, res, next) => {
  const { hasError, errorMessages, userData } = validateUserLogin(req.body);
  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }
  const user = await UsersServices.findOneByEmail(userData.email);
  console.log(user);
  if (!user) {
    return next(new AppError('This account does not exist', 404));
  }
  const isCorrectPassword = await verifyPassword(
    userData.password,
    user.password
  );
  if (!isCorrectPassword) {
    return next(new AppError('Incorrect email or password', 401));
  }
  const token = await generateJWT(user.id);
  return res.status(200).json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

export const findAllUsers = catchAsync(async (req, res, next) => {
  const allUsers = await UsersServices.findAll();
  return res.status(200).json(allUsers);
});

export const findOneUser = catchAsync(async (req, res, next) => {
  const { user } = req; // entregado por el middleware validateexistuser
  return res.status(200).json({
    id: user.id,
    name: user.name,
    email: user.email,
  });
});

export const updateUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { hasError, errorMessages, userData } = validatePartialUserRegister(
    req.body
  );
  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }
  const userUpdated = await UsersServices.update(user, userData);
  return res.status(200).json(userUpdated);
});

export const deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  await UsersServices.delete(user);
  return res.status(204).json();
});

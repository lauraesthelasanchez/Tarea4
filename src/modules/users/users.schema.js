import z from 'zod';
import { extractValidationData } from '../../common/utils/extractErrorData.js';

const registerUserSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required',
    })
    .min(2, { message: 'Name is too short' })
    .max(50, { message: 'Name is too long' }),
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email({ message: 'Invalid email' }),
  password: z
    .string({
      required_error: 'Name is required',
    })
    .min(8, { message: 'Password must be at least 8 characters' })
    .max(16, { message: 'Password is too long' }),
  role: z.enum(['client', 'employee']),
});

const loginUserSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email({ message: 'Invalid email' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .max(16, { message: 'Password is too long' }),
});

export function validateUserRegister(data) {
  const result = registerUserSchema.safeParse(data);
  const {
    hasError,
    errorMessages,
    data: userData,
  } = extractValidationData(result);
  return {
    hasError,
    errorMessages,
    userData,
  };
}
export function validatePartialUserRegister(data) {
  const result = registerUserSchema.partial().safeParse(data);
  const {
    hasError,
    errorMessages,
    data: userData,
  } = extractValidationData(result);
  return {
    hasError,
    errorMessages,
    userData,
  };
}
export function validateUserLogin(data) {
  const result = loginUserSchema.safeParse(data);
  const {
    hasError,
    errorMessages,
    data: userData,
  } = extractValidationData(result);
  return {
    hasError,
    errorMessages,
    userData,
  };
}

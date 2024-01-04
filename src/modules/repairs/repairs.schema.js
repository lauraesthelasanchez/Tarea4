import z from 'zod';
import { extractValidationData } from '../../common/utils/extractErrorData.js';

const registerRepairSchema = z.object({
  date: z.string({
    required_error: 'Date is required',
  }),
  motorsNumber: z
    .number({
      required_error: 'Motor number is required',
    })
    .min(999, { message: 'Motor number is too short' }),
  description: z.string({
    required_error: 'Description is required',
  }),
  userId: z.number({
    required_error: 'User ID is required',
  }),
});

export function validateRepairRegister(data) {
  const result = registerRepairSchema.safeParse(data);
  const {
    hasError,
    errorMessages,
    data: repairData,
  } = extractValidationData(result);
  return {
    hasError,
    errorMessages,
    repairData,
  };
}
export function validatePartialRepairRegister(data) {
  const result = registerRepairSchema.partial().safeParse(data);
  const {
    hasError,
    errorMessages,
    data: repairData,
  } = extractValidationData(result);
  return {
    hasError,
    errorMessages,
    repairData,
  };
}

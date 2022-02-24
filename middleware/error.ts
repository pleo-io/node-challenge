import { ApiError, ApiErrorType, InternalError } from '@nc/utils/errors';
import { Request, Response } from 'express';

export default function errorMiddleware(error: Error, request: Request, response: Response): unknown {
  if (error instanceof ApiError) return response.status((error as unknown as ApiErrorType).status).json(error);
  return response.status(500).json(InternalError('Ops Something went wrong', null, error));
}

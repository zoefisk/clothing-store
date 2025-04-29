import { getCaryByUserIdHandler, createCartHandler } from './handlers';

export const endpoints = {
  GET: getCaryByUserIdHandler,
  POST: createCartHandler,
};
import { getCartByUserIdHandler, createCartHandler } from './handlers';

export const endpoints = {
  GET: getCartByUserIdHandler,
  POST: createCartHandler,
};
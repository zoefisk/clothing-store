import { getCartItemsByCartIdHandler, createCartItemHandler } from './handlers';

export const endpoints = {
  GET: getCartItemsByCartIdHandler,
  POST: createCartItemHandler,
};
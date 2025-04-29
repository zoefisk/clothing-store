/**
 * endpoints.ts
 * @description This file contains the endpoints for the cart items API.
 */

import { getCartItemsByCartIdHandler, createCartItemHandler } from './handlers';

export const endpoints = {
  GET: getCartItemsByCartIdHandler,
  POST: createCartItemHandler,
};
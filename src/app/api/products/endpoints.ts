import { getProductsHandler, createProductHandler } from './handlers';

export const endpoints = {
  GET: getProductsHandler,
  POST: createProductHandler,
};
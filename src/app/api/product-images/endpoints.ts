import {
  createProductImageHandler, ProductImageRequestHandler
} from './handlers';

export const endpoints = {
  GET: ProductImageRequestHandler,
  POST: createProductImageHandler,
};
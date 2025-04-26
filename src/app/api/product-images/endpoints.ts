import {
  getProductImageByStockLevelIdHandler,
  createProductImageHandler,
  getProductImagesByProductIdHandler
} from './handlers';

export const endpoints = {
  GET: [getProductImageByStockLevelIdHandler, getProductImagesByProductIdHandler],
  POST: createProductImageHandler,
};
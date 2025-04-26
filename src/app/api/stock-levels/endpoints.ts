import { getStockLevelByProductIdHandler, createProductsStockHandler } from './handlers';

export const endpoints = {
  GET: getStockLevelByProductIdHandler,
  POST: createProductsStockHandler,
};
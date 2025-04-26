import { getReviewsByProductIdHandler, createReviewHandler } from './handlers';

export const endpoints = {
  GET: getReviewsByProductIdHandler,
  POST: createReviewHandler,
};
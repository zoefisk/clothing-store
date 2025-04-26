import { NextResponse } from 'next/server';
import { ReviewHandler } from './controllers';

export async function getReviewsByProductIdHandler(req: Request) {

  const url = new URL(req.url);
  const productId = url.searchParams.get('productId');

  if (!productId) {
    return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
  }

  const parsedProductId = parseInt(productId, 10);
  if (isNaN(parsedProductId)) {
    return NextResponse.json({ error: 'Invalid Product ID' }, { status: 400 });
  }

  const { data, error } = await ReviewHandler.getReviewsByProductId(parsedProductId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data, { status: 200 });
}

// TODO: this
export async function createReviewHandler(req: Request) {
  try {
    const body = await req.json();
    const { data, error } = await ReviewHandler.createReview(body);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
import { NextResponse } from 'next/server';
import { StockLevelHandler } from './controllers';

export async function ProductImageRequestHandler(req: Request) {
  const url = new URL(req.url);
  const stockLevelId = url.searchParams.get('stockLevelId');
  const productId = url.searchParams.get('productId');
  const imageId = url.searchParams.get('imageId');

  if (stockLevelId) {
    const parsedStockLevelId = parseInt(stockLevelId, 10);
    if (isNaN(parsedStockLevelId)) {
      return NextResponse.json({ error: 'Invalid Stock Level ID' }, { status: 400 });
    }

    const { data, error } = await StockLevelHandler.getProductImageByStockLevelId(parsedStockLevelId);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data, { status: 200 });
  }

  if (productId) {
    const parsedProductId = parseInt(productId, 10);
    if (isNaN(parsedProductId)) {
      return NextResponse.json({ error: 'Invalid Product ID' }, { status: 400 });
    }

    const { data, error } = await StockLevelHandler.getProductImageByProductId(parsedProductId);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data, { status: 200 });
  }

  if (imageId) {
    const parsedImageId = parseInt(imageId, 10);
    if (isNaN(parsedImageId)) {
      return NextResponse.json({ error: 'Invalid Image ID' }, { status: 400 });
    }

    const { data, error } = await StockLevelHandler.getProductImageByImageId(parsedImageId);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data, { status: 200 });
  }

  return NextResponse.json({ error: 'Either Stock Level ID, Product ID, or Image ID is required' }, { status: 400 });
}

export async function createProductImageHandler(req: Request) {
  try {
    const body = await req.json();
    const { data, error } = await StockLevelHandler.createProductImage(body);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
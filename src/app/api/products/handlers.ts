import { NextResponse } from 'next/server';
import { ProductController } from './controllers';

export async function getProductsHandler() {
  const { data, error } = await ProductController.getAllProducts();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data, { status: 200 });
}

export async function createProductHandler(req: Request) {
  try {
    const body = await req.json();
    const { data, error } = await ProductController.createProduct(body);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
import { NextResponse } from 'next/server';
import { CartItemHandler } from './controllers';

export async function getCartItemsByCartIdHandler(req: Request) {

  const url = new URL(req.url);
  const cartId = url.searchParams.get('cartId');

  if (!cartId) return NextResponse.json({ error: 'Cart ID is required' }, { status: 400 });

  const parsedCartId = parseInt(cartId, 10);
  if (isNaN(parsedCartId)) return NextResponse.json({ error: 'Invalid Cart ID' }, { status: 400 });

  const { data, error } = await CartItemHandler.getCartByUserId(parsedCartId);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  else return NextResponse.json(data, { status: 200 });
}

// TODO: this
export async function createCartItemHandler(req: Request) {
  try {
    const body = await req.json();
    const { data, error } = await CartItemHandler.createCart(body);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
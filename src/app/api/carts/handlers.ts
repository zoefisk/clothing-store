import { NextResponse } from 'next/server';
import { CartHandler } from './controllers';

export async function getCaryByUserIdHandler(req: Request) {

  const url = new URL(req.url);
  const userId = url.searchParams.get('userId');

  if (!userId) return NextResponse.json({ error: 'User ID is required' }, { status: 400 });

  const parsedUserId = parseInt(userId, 10);
  if (isNaN(parsedUserId)) return NextResponse.json({ error: 'Invalid User ID' }, { status: 400 });

  const { data, error } = await CartHandler.getCartByUserId(parsedUserId);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  else return NextResponse.json(data, { status: 200 });
}

// TODO: this
export async function createCartHandler(req: Request) {
  try {
    const body = await req.json();
    const { data, error } = await CartHandler.createCart(body);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
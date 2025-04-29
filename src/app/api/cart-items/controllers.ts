import { supabase } from '@/lib/supabaseClient';

export class CartItemHandler {
  static async getCartByUserId(cartId: number) {

    const { data, error } = await supabase
        .from('cart-items')
        .select('*')
        .eq('cart_id', cartId);

    return { data, error };
  }

  // todo: this
  static async createCart(product: Record<string, any>) {
    const { data, error } = await supabase.from('cart-items').insert([product]).select().single();
    return { data, error };
  }
}
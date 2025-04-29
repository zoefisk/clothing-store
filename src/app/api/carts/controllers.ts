import { supabase } from '@/lib/supabaseClient';

export class CartHandler {
  static async getCartByUserId(userId: number) {

    const { data, error } = await supabase
        .from('carts')
        .select('*')
        .eq('user_id', userId);

    return { data, error };
  }

  static async createCart(product: Record<string, any>) {
    const { data, error } = await supabase.from('reviews').insert([product]).select().single();
    return { data, error };
  }
}
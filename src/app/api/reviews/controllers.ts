import { supabase } from '@/lib/supabaseClient';

export class ReviewHandler {
  static async getReviewsByProductId(productId: number) {

    const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('product_id', productId);

    return { data, error };
  }

  static async createReview(product: Record<string, any>) {
    const { data, error } = await supabase.from('reviews').insert([product]).select().single();
    return { data, error };
  }
}
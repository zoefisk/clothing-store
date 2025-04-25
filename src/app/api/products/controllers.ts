import { supabase } from '@/lib/supabaseClient';

export class ProductController {
  static async getAllProducts() {
    const { data, error } = await supabase.from('products').select('*');

    console.log("in product controller, data = ", data);

    return { data, error };
  }

  static async createProduct(product: Record<string, any>) {
    const { data, error } = await supabase.from('products').insert([product]).select().single();
    return { data, error };
  }
}
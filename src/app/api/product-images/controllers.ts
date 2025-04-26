import { supabase } from '@/lib/supabaseClient';

export class StockLevelHandler {
  static async getProductImageByStockLevelId(productId: number) {

    const { data, error } = await supabase
        .from('stock_levels')
        .select('*')
        .eq('product_id', productId);

    return { data, error };
  }

  static async getProductImageByProductId(productId: number) {
    const { data, error } = await supabase
        .from('stock_levels')
        .select('*')
        .eq('product_id', productId);

    return { data, error };
  }

  static async createProductImage(product: Record<string, any>) {
    const { data, error } = await supabase.from('stock_levels').insert([product]).select().single();
    return { data, error };
  }
}
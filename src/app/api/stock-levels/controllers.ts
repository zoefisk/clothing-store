import { supabase } from '@/lib/supabaseClient';

export class StockLevelHandler {
  static async getStockLevelByProductId(productId: number) {

    const { data, error } = await supabase
        .from('stock_levels')
        .select('*')
        .eq('product_id', productId);

    return { data, error };
  }

  static async createProductStock(product: Record<string, any>) {
    const { data, error } = await supabase.from('stock_levels').insert([product]).select().single();
    return { data, error };
  }
}
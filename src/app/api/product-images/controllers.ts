import { supabase } from '@/lib/supabaseClient';

export class StockLevelHandler {
  static async getProductImageByStockLevelId(stockLevelId: number) {

    const { data, error } = await supabase
        .from('product_images')
        .select('*')
        .eq('stock_level_id', stockLevelId);

    return { data, error };
  }

  static async getProductImageByProductId(productId: number) {
    const { data, error } = await supabase
        .from('product_images')
        .select('*')
        .eq('product_id', productId);

    return { data, error };
  }

  static async getProductImageByImageId(imageId: number) {
    const { data, error } = await supabase
        .from('product_images')
        .select('*')
        .eq('id', imageId)
        .single();

    return { data, error };
  }

  static async createProductImage(product: Record<string, any>) {
    const { data, error } = await supabase.from('stock_levels').insert([product]).select().single();
    return { data, error };
  }
}
/**
 * Product model
 */
export class Product {
  id?: number;
  slug?: string;
  name: string;
  colors: string[];
  sizes: string[];
  price: number;
  category: string;

  constructor (name: string, colors: string[], sizes: string[], price: number, category: string, id?: number) {
    this.id = id;
    this.slug = name.toLowerCase().replace(/\s+/g, '-') + `-${id}`;
    this.name = name;
    this.colors = colors;
    this.sizes = sizes;
    this.price = price;
    this.category = category;
  }
}
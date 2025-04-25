/**
 * Product model
 */
export class Product {
  id?: number;
  name: string;
  colors: string[];
  sizes: string[];
  price: number;

  constructor (name: string, colors: string[], sizes: string[], price: number, id?: number) {
    this.id = id;
    this.name = name;
    this.colors = colors;
    this.sizes = sizes;
    this.price = price;
  }
}
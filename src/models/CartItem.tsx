export class CartItem {
    id?: number;
    productId: number;
    cartId: number;
    color: string;
    size: string;
    quantity: number;
    subtotalPrice: number;
    taxesPrice: number;

    constructor ( productId: number, cartId: number, color: string, size: string, quantity: number, subtotalPrice: number, taxesPrice: number, id?: number) {
        this.productId = productId;
        this.cartId = cartId;
        this.color = color;
        this.size = size;
        this.quantity = quantity;
        this.subtotalPrice = subtotalPrice;
        this.taxesPrice = taxesPrice;
        this.id = id;
    }
}
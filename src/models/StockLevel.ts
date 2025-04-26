/**
 * Stock level model
 */
export class StockLevel {
    id?: number;            // ID for the stock level. Optional, as it may not be set when creating a new stock level. It will be set by the database.
    productId: number;      // ID of the product this stock level belongs to.
    color: string;          // Color of the product.
    size: string;           // Size of the product.
    quantity: number;       // Quantity of the product in stock.
    imageId?: number;       // ID of the image associated with this stock level. Optional, as it may not be known at the time of creation.
    clothingType: string;   // Type of clothing (e.g., vintage, casual, etc.).
    pricePerUnit: number;   // TODO: GET RID OF THIS!

    constructor (productId: number, color: string, size: string, pricePerUnit: number, clothingType: string, quantity: number, imageId?: number, id?: number) {
        this.id = id;
        this.productId = productId;
        this.color = color;
        this.size = size;
        this.quantity = quantity;
        this.imageId = imageId;
        this.clothingType = clothingType;
        this.pricePerUnit = pricePerUnit;
    }
}
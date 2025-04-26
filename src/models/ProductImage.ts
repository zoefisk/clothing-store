/**
 * ProductImage model
 */
export class ProductImage {
    id?: number;
    stockLevelId: number;
    productId: number;
    fileName: string;
    url: string;
    alt_text: string;

    constructor (stockLevelId: number, productId: number, fileName: string, url: string, alt_text: string, id?: number) {
        this.stockLevelId = stockLevelId;
        this.productId = productId;
        this.fileName = fileName;
        this.url = url;
        this.alt_text = alt_text;
        this.id = id;
    }
}
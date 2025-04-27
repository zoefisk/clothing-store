/**
 * ProductImage model
 */
export class ProductImage {
    id?: number;
    stockLevelId: number;
    productId: number;
    fileName: string;
    url: string;
    altText: string;

    constructor (stockLevelId: number, productId: number, fileName: string, url: string, altText: string, id?: number) {
        this.stockLevelId = stockLevelId;
        this.productId = productId;
        this.fileName = fileName;
        this.url = url;
        this.altText = altText;
        this.id = id;
    }
}
export class Cart {
    id?: number;
    name: string;
    userId: number;

    constructor(userId: number, name: string, id?: number) {
        this.userId = userId;
        this.name = name;
        this.id = id;
    }
}
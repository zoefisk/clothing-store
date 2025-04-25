export class User {
    id: string;
    firstName: string;
    lastName: string;
    admin: boolean;
    joinDate: Date;

    constructor(
        id: string,
        firstName: string,
        lastName: string,
        admin: boolean,
        joinDate: Date,
    ) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.admin = admin;
        this.joinDate = joinDate;
    }
}
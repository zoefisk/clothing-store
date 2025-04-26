export class User {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    admin: boolean;
    joinDate: Date;

    constructor(
        firstName: string,
        lastName: string,
        email: string,
        admin: boolean,
        joinDate: Date,
        id?: string,
    ) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.admin = admin;
        this.joinDate = joinDate;
    }
}
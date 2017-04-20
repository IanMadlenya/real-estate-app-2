/**
 * Created by hartex
 */

export class User {
    userName;
    firstName;
    lastName;
    email;
    password;

    constructor(userName: string, firstName: string, lastName: string, email: string, password: string) {
        this.userName = userName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }
}
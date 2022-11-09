export enum Role {
    "admin",
    "lehrer",
    "betreuer",
    "werkstatt",
    "user"
}

export class User {
    id?: number;
    role: Role;
    firstName: string;
    lastName: string;
    email: string;
    avatar?: string = "/assets/logo.png";

    constructor(data?: {id?: number, role?: Role, firstName?: string, lastName?: string, email?: string})
    {
        this.id = data?.id;
        this.role = data?.role ?? Role.user;
        this.firstName = data?.firstName ?? "";
        this.lastName = data?.lastName ?? "";
        this.email = data?.email ?? "";
    }
}
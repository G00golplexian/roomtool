export enum Role {
    "admin",
    "lehrer",
    "betreuer",
    "werkstatt"
}

export class User {
    id: number = 0;
    role: Role;
    firstName: string;
    lastName: string;
    email: string;
    avatar: string = "/assets/logo.png";

    constructor(data?: {id?: number, role?: Role, firstName?: string, lastName?: string, email?: string})
    {
        this.id = data?.id ?? -1;
        this.role = data?.role ?? Role.lehrer;
        this.firstName = data?.firstName ?? "";
        this.lastName = data?.lastName ?? "";
        this.email = data?.email ?? "";
    }
}
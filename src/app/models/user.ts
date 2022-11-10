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
    rooms: string[];
    firstName: string;
    lastName: string;
    email: string;
    avatar?: string = "/assets/avatar.png";

    constructor(data?: {id?: number, role?: Role, firstName?: string, lastName?: string, email?: string, rooms?: string[] })
    {
        this.id = data?.id;
        this.role = data?.role ?? Role.user;
        this.firstName = data?.firstName ?? "";
        this.lastName = data?.lastName ?? "";
        this.email = data?.email ?? "";
        this.rooms = data?.rooms ?? [];
    }
}
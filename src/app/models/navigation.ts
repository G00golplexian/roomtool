import { Role } from "./user";

export interface Navigation {
    name: string;
    icon: string;
    path: string[];
    allow: Role[];
}

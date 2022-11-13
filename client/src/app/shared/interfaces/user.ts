export interface IUser {
    _id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    address?: string;
    isAdmin: boolean;
}

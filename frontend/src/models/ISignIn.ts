import { UserDetailsInterface } from "./IUser";

export interface SigninInterface {
    Username: string;
    Password: string;
}

export interface UsersInterface {
    ID: number;

    UserDetailID: number;
    UserDetail: UserDetailsInterface;

}
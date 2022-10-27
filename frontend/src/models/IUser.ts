import { SigninInterface } from "./ISignIn";

export interface UserRolesInterface {
    ID: number;
    RoleName: string;
}

export interface UserDetailsInterface {
    ID: number;

    Code: string;
    FirstName: string;
    LastName: string;
    Nickname: string;
    PhoneNumber: string;
    PromtPay: string;
    PriceShutt: number; 
    Qrcode: string;

}


export interface MembersInterface {
    ID: number;
    
    UserDetailID: number;
    UserDetail: UserDetailsInterface;

    UserLoginID: number;
    UserLogin: SigninInterface;
}

import { Role } from './role';

export class User {
    id:number;
    email: string;
    userName: string;
    phoneNumber: string;
    avatar: string;
    uRLGg: string;
    uRLFb: string;
    name: string;
    birthDay: string | null;
    phoneNumber1: string;
    address: string;
    position: number | null;
    status: number=1;
    createDate:any;
    roles:Array<string>
}

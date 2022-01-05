import { Role } from './role';

export class User {
    Id:number;
    Email: string;
    UserName: string;
    PhoneNumber: string;
    Avatar: string;
    URLGg: string;
    URLFb: string;
    Zalo: string;
    Name: string;
    BirthDay: string | null;
    PhoneNumber1: string;
    Address: string;
    Position: number | null;
    Status: number=1;
    CreateDate:any;
    Roles:Array<string>
}

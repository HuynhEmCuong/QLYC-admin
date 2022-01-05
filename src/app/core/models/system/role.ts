import { User } from './user';

export class Role {
    Id: number;
    Name: string;
    Description: string;
    CreateDate: string | null;
    ModifyDate: string | null;
    CreateBy: number;
    ModifyBy: number;
    UserCreate: User;
    UserModify: User;
}
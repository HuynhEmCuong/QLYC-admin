import { User } from './user';

export class OptionParameter {
    Id: number;
    Code: string;
    ParameterValue: string;
    Description: string;
    
    CreateDate: string | null;
    ModifyDate: string | null;
    CreateBy: number;
    ModifyBy: number;
  
}
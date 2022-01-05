import { Permission } from './permision';

export class AuthenticationResult {
  Token: string;
  RefreshToken: string;
  Success: boolean;
  Errors: string[];
  Permission:Array<Permission> = new Array<Permission>()
}

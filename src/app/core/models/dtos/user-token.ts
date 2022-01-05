import { Permission } from '../system/permision'

export class UserToken {
  avatar: string
  email: string
  id: string
  name: string
  permissions: Array<Permission>= new Array<Permission>();
  phonenumber: string
  roles: any
  unique_name: string
  token:string
  refresh_token:string
}

import { User } from '../system/user';

export class NotificationGroupMapping {
  Id: number;
  GroupName: string;
  FunctionCode: string;
  EventId: number;
  UserId: number;
  User: User;
}

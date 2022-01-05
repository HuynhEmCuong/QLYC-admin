import { NotificationStatus } from '../../enums/notification-status';
import { User } from '../system/user';

export class NotificationViewModel {
  Id: number;
  Checked: boolean;
  UserSendId: number;
  UserReciveId: number;
  FunctionCode: string;
  EventId: number;
  Content: string;
  Link: string;
  Date: string;
  IsSeen: NotificationStatus;
  UserSend: User;
  UserRecive: User;
}


export class ResponseNotify{
  countNew :number;
  data: NotificationViewModel[]
}

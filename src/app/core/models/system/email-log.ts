import { EmailStatusEnum, EmailTypeEnum } from '../../enums/email-log';

export class EmailLog {
  Id: number;
  ToEmail:string;
  CustomerName:string;
  Subject: string;
  Content: string;
  DateLog: string;
  EventId: number;
  FunctionCode: string;
  ErrorContent: string;
  Status: EmailStatusEnum;
  MailType: EmailTypeEnum | null;
}

export class Permission {
  RoleId: number;
  FunctionId: number;
  ParentId: number | null;
  FunctionName: string;
  FunctionCode: string;
  CheckRow: boolean;
  CanCreate: boolean;
  CanRead: boolean;
  CanUpdate: boolean;
  CanDelete: boolean;
  CanApproval: boolean;
}

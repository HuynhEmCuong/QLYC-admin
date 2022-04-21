import { Status } from "../../enums/status.enum";

export class RequestType {
    id: number;
    name: string;
    description: string;
    note:string;
    status: Status;
    sortOrder: number;
    createDate: string | null;
    modifyDate: string | null;
}
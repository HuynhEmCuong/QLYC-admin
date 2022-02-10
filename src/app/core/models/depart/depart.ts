import { Status } from "../../enums/status.enum";

export class Department {
    id: number;
    name: string;
    note: string;
    status: Status;
    createDate: string;
}
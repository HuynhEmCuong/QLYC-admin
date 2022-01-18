import { Status } from "../../enums/status.enum";

export interface Department {
    id: number;
    name: string;
    note: string;
    status: Status;
    createDate: string;
}
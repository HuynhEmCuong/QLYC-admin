import { RequestStatus } from "../../enums/requestStatus.enum";
import { Student } from "../student/student";
import { User } from "../system/user";
import { RequestType } from "./request-type";

export class StudentTask {
    id: number;
    requestId: number;
    studentId: number;
    receiverId: number | null;
    note: string;
    fileName:string;
    filePath:string;
    quantity: number;
    finishDate: string | null;
    assignDate: string | null;
    status: RequestStatus;
    createDate: string | null;
    modifyDate: string | null;
    
    requestType: RequestType;
    student: Student;
    appUser: User;
}
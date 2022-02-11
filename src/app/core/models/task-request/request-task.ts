import { RequestStatus } from "../../enums/requestStatus.enum";
import { Student } from "../student/student";
import { User } from "../system/user";
import { RequestType } from "./request-type";

export class StudentTask {
    taskRequest: TaskRequest
    requestType: RequestType;
    student: Student;
    appUser: User;

    constructor(dataRequest) {
        this.taskRequest = new TaskRequest(dataRequest);
        this.appUser = new User();
        this.requestType = new RequestType();
        this.student = new Student();
    }
}


export interface StudentTaskReport {
    received: number;
    receivedInDay: number;
    doing: number;
    complete: number;
    disbaled: number;
}


export class TaskRequest {
    id: number;
    requestId: number;
    studentId: number;
    receiverId: number | null;
    note: string;
    fileName: string;
    filePath: string;
    quantity: number;
    finishDate: string | null;
    assignDate: string | null;
    status: RequestStatus;
    createDate: string | null;
    modifyDate: string | null;

    constructor(data: any) {
        this.id = data.id;
        this.requestId = data.requestId;
        this.studentId = data.studentId;
        this.receiverId = data.receiverId;
        this.note = data.note;
        this.fileName = data.fileName;
        this.filePath = data.filePath;
        this.quantity = data.quantity;
        this.finishDate = data.finishDate;
        this.assignDate = data.assignDate;
        this.createDate = data.createDate;
        this.status = data.status;
    }
}
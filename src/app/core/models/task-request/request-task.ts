import { RequestStatus } from "../../enums/requestStatus.enum";
import { NoteTask } from "../noteTask/noteTask";
import { Student } from "../student/student";
import { User } from "../system/user";
import { RequestType } from "./request-type";

export class StudentTask {
    taskRequest: TaskRequest
    requestType: RequestType;
    student: Student;
    appUser: User;

    constructor(dataRequest) {
        this.taskRequest = new TaskRequest().mapData(dataRequest);
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
    id: number = 0;
    requestId: number = 0;
    studentId: number;
    receiverId: number | null;
    note: string;
    fileName: string;
    filePath: string;
    filePathStudent: string;
    fileNameStudent: string;
    quantity: number = 1;
    finishDate: string | null;
    assignDate: string | null;
    intendTime: string | null;
    status: RequestStatus = RequestStatus.received;
    createDate: string | null;
    modifyDate: string | null;
    requestType: RequestType;
    noteTasks: NoteTask[] =[];

    constructor() {

    }

    mapData(data: any) {
        let result: TaskRequest = new TaskRequest()
        result.id = data.id;
        result.requestId = data.requestId;
        result.studentId = data.studentId;
        result.receiverId = data.receiverId;
        result.note = data.note;
        result.fileName = data.fileName;
        result.filePath = data.filePath;
        result.quantity = data.quantity;
        result.finishDate = data.finishDate;
        result.assignDate = data.assignDate;
        result.createDate = data.createDate;
        result.status = data.status;
        result.intendTime = data.intendTime;
        result.fileNameStudent = data.fileNameStudent;
        result.filePathStudent = data.filePathStudent;
        result.noteTasks = data.noteTasks;
        return result;
    }


}
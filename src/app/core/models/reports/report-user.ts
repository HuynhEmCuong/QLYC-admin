export class ReportUser {
    userId: number;
    userName: string;

    totalSuccess: number;
    totalSuccessLate :number
    
    totalProceesingLate:number;
    totalProceesing: number;
 
    totalDisable:number;
    total: number;
}

export class ReportUserChart {
    name: string[] = [];
    total_success: number[] = [];
    total_process: number[] = [];
    total_late: number[] = [];
    total: number[] = [];
    
}
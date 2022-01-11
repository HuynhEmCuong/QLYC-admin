export class fileResponse {
  fileOriginalName: string;
  fileFullPath:string;
  fileLocalName:string;
  fileType:string;
  isImage:boolean;
  fileName: string;
  fileExtension: string;
  path: string;
  position:number;
}


export class OperationFileResult{
  caption:string
  message:string
  success: Boolean
  fileResponse: fileResponse;
  fileResponses: fileResponse[]=[]
}

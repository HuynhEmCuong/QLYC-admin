export class FileResponse {
  FileOriginalName: string;
  FileFullPath:string;
  FileLocalName:string;
  FileType:string;
  IsImage:boolean;
  FileName: string;
  FileExtension: string;
  Path: string;
  Position:number;
}


export class OperationFileResult{
  Caption:string
  Message:string
  Success: Boolean
  FileResponse: FileResponse;
  FileResponses: FileResponse[]=[]
}

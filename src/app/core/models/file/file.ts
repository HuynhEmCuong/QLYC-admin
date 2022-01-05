import { FileResponse } from '../system/opration-file-result';

export class FileViewModel{
  Id: number;
  FileFullPath: string;
  FileOriginalName: string;
  FileLocalName: string;
  FileExtension: string;
  FileType:string;
  Path: string;
  Position: number | null;
  IsImage: boolean;
  CreateDate: string | null;
  ModifyDate: string | null;
  CreateBy: number | null;
  ModifyBy: number | null;
}

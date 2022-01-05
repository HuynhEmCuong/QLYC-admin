export class Function {
  Id:number;
  Code: string;
  Name_Vi: string;
  Name_En: string;
  Icon: string;
  Link: string;
  ParentId: number | null;
}

export class Module {
  Id:number;
  Code: string;
  Name_Vi: string;
  Name_En: string;
  Icon: string;
  Link: string;
  ParentId: number | null;
  Child: Function;
}


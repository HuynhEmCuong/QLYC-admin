export class Pager<T> {
  TotalItems: number;
  CurrentPage: number;
  PageSize: number;
  TotalPages: number;
  StartPage: number;
  EndPage: number;
  StartIndex: number;
  EndIndex: number;
  PageNext: number;
  PagePrev: number;
  PageFirst: number;
  PageLast: number;
  Pages: number[];
  Result: Array<T>;
}

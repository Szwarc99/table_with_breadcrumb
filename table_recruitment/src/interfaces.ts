export interface IData {
  data: IAuthor[];
}

export interface IBook {
  id: string;
  isbn: string;
  authors: string[];
  title: string;
  categories: string[];
}

export interface IAuthor {
  authors: string;
  books: IBook[];
}

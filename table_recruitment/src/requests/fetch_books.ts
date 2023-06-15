import { IAuthor, IBook } from "../interfaces";

//fetches books by author from google books api
export async function fetchBooksByAuthor(author: string): Promise<IAuthor> {
  const apiUrl: string = "https://www.googleapis.com/books/v1";
  const apiKey: string = "AIzaSyA5ch6-J68BdEDvno-INC8lKCZrOboSQlU";
  const numberOfResults: number = 10;
  const url = `${apiUrl}/volumes?q=inauthor:${author}&maxResults=${numberOfResults}&key=${apiKey}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not OK");
  }

  const data = await response.json();
  return convertResponse(author, data.items);
}

//converts response to data structure that later can be used in a table
function convertResponse(mainAuthor: string, data: any[]): IAuthor {
  const formattedAuthorRow: IAuthor = {
    authors: mainAuthor,
    books: data.map((item) => {
      let book: IBook = item.volumeInfo as IBook;
      let isbn: { type: string; identifier: string };
      book.id = item.id;
      isbn = item.volumeInfo.industryIdentifiers.find(
        (ids: any) => ids.type === "ISBN_13"
      );
      if (isbn !== undefined) book.isbn = isbn.identifier;
      else book.isbn = "";
      if (book.categories === undefined) book.categories = ["Not specified"];
      if (book.description === undefined)
        book.description = "There is no description";
      return book;
    }),
  };
  // console.log(formattedAuthorRow);
  return formattedAuthorRow;
}

import { IAuthor, IBook } from "../interfaces";

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
  console.log(data);
  return convertResponse(author, data.items);
}

function convertResponse(mainAuthor: string, data: any[]): IAuthor {
  const formattedAuthorRow: IAuthor = {
    authors: mainAuthor,
    books: data.map((item) => {
      let book: IBook = item.volumeInfo as IBook;
      let id: string = item.id;
      let isbn: { type: string; identifier: string };
      book.id = id;
      isbn = item.volumeInfo.industryIdentifiers.find(
        (ids: any) => ids.type === "ISBN_13"
      );
      if (isbn !== undefined) book.isbn = isbn.identifier;
      else book.isbn = "";
      if (book.categories === undefined) book.categories = ["Not specified"];
      return book;
    }),
  };
  console.log(formattedAuthorRow);
  return formattedAuthorRow;
}

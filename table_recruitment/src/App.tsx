import React, { useEffect, useState } from "react";
import { fetchBooksByAuthor } from "./requests/fetch_books";
import { Table, ITable } from "./table";
import "./styles/index.scss";

function App() {
  const [data, setData] = useState<ITable>({ data: [] });

  //fetching books by the list of authors and updating state data with results
  useEffect(() => {
    const fetchData = async () => {
      try {
        const authors: string[] = [
          "Andrzej Sapkowski",
          "Henryk Sienkiewicz",
          "J.K. Rowling",
          "Dmitry Glukhovsky",
          "J.R.R Tolkien",
        ];
        const authorPromises = authors.map(fetchBooksByAuthor);
        const authorData = await Promise.all(authorPromises);
        setData({ data: authorData });
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchData();
  }, []);

  return <div>{data && <Table {...data} />}</div>;
}

export default App;

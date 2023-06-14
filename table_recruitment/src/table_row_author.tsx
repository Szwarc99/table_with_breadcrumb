import React, { useState, useEffect } from "react";
import { TableRowBook } from "./table_row_book";
import { IAuthor, IBook } from "./interfaces";

export interface IRowAuthor extends IAuthor {
  handleBreadcrumbUpdate: (arg: string, level: number) => void;
  breadcrumb: string[];
}

export function RowAuthor(props: IRowAuthor) {
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    setIsSelected(props.breadcrumb[1] === props.authors);
  }, [props.breadcrumb, props.authors]);

  console.log(props.breadcrumb[1] === props.authors);

  return (
    <tbody>
      <tr className={"author-row " + (isSelected ? "is-selected" : "")}>
        <td>
          <label className="checkbox">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => {
                if (isSelected) {
                  props.handleBreadcrumbUpdate("", 1);
                } else {
                  props.handleBreadcrumbUpdate(props.authors, 1);
                }
              }}
            />
          </label>
        </td>
        <td colSpan={5}>{props.authors}</td>
      </tr>

      {isSelected && (
        <tr>
          <th></th>
          <th>ID</th>
          <th>ISBN</th>
          <th>Authors</th>
          <th>Title</th>
          <th>Category</th>
        </tr>
      )}

      {isSelected &&
        props.books.map((item: IBook, index: number) => (
          <TableRowBook key={index} {...item} />
        ))}
    </tbody>
  );
}

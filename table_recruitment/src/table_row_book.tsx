import { Fragment, useEffect, useState } from "react";
import { IBook } from "./interfaces";

interface IRowBook extends IBook {
  breadcrumb: string[];
  handleBreadcrumbUpdate: (arg: string, level: number) => void;
}

export function TableRowBook(props: IRowBook) {
  const [isSelected, setIsSelected] = useState(false);

  //checks is should stay selected based on breadcrumb
  useEffect(() => {
    setIsSelected(props.breadcrumb[2] === props.id);
  }, [props.breadcrumb, props.id]);
  return (
    <Fragment>
      <tr className={"book-row " + (isSelected ? "book-row-selected" : "")}>
        <td className="narrow-column"></td>
        <td className="narrow-column">
          <label className="checkbox">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => {
                if (isSelected) {
                  props.handleBreadcrumbUpdate("", 2);
                } else {
                  props.handleBreadcrumbUpdate(props.id, 2);
                }
              }}
            />
          </label>
        </td>
        <td>{props.id}</td>
        <td>{props.isbn}</td>
        <td>{props.authors !== undefined && props.authors.join(", ")}</td>
        <td>{props.title}</td>
        <td>{props.categories !== undefined && props.categories.join(", ")}</td>
      </tr>
      {isSelected && (
        <tr>
          <td className="narrow-column"></td>
          <td className="narrow-column"></td>
          <td colSpan={5}>{props.description}</td>
        </tr>
      )}
    </Fragment>
  );
}

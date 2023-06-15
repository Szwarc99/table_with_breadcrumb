import { RowAuthor } from "./table_row_author";
import { useState } from "react";
import { IAuthor } from "./interfaces";

export interface ITable {
  data: IAuthor[];
}

export function Table(props: ITable) {
  const [breadcrumb, setBreadcrumb] = useState(["Authors"]);

  //function passed to children components allowing to update breadcrumb
  const handleBreadcrumbUpdate = (label: string, level: number) => {
    if (label === "") {
      setBreadcrumb(breadcrumb.slice(0, level));
    } else {
      setBreadcrumb([...breadcrumb.slice(0, level), label]);
    }
  };

  return (
    <div className="container">
      <nav className="breadcrumb">
        <ul>
          {breadcrumb.map((level: string, index: number) => {
            return (
              <li key={index}>
                <button
                  className="button is-primary is-inverted"
                  onClick={() => setBreadcrumb(breadcrumb.slice(0, index + 1))}
                >
                  {level}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      <table className="authors-table">
        {props.data.map((row: IAuthor, index: number) => {
          return (
            <RowAuthor
              key={index}
              {...row}
              handleBreadcrumbUpdate={handleBreadcrumbUpdate}
              breadcrumb={breadcrumb}
            />
          );
        })}
      </table>
    </div>
  );
}

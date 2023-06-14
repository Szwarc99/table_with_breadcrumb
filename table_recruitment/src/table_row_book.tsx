import { IBook } from "./interfaces";

export function TableRowBook(props: IBook) {
  return (
    <tr>
      <td></td>
      <td>{props.id}</td>
      <td>{props.isbn}</td>
      <td>{props.authors !== undefined && props.authors.join(", ")}</td>
      <td>{props.title}</td>
      <td>{props.categories !== undefined && props.categories.join(", ")}</td>
    </tr>
  );
}

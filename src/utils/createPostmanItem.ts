import { Header, Item } from "postman-collection";
import { EntityMetadata } from "../types/types";

export const createPostmanItem = ({
  entityMetadata,
  verb,
  method,
}: {
  entityMetadata: EntityMetadata;
  method: "GET" | "POST" | "PUT" | "DELETE";
  verb: "CREATE" | "DELETE" | "GET_BY_ID" | "PAGINATED_GET" | "UPDATE_BY_ID";
}) => {
  const name = `${verb}`;
  const header = Header.parse(
    "Content-Type:application/json\nAccept:*/*\nAccept-Encoding:gzip, deflate, br\nConnection:keep-alive"
  );
  const url = `{{host}}:{{port}}{{basePath}}${entityMetadata.name}${
    verb === "GET_BY_ID" || verb === "DELETE" || verb === "UPDATE_BY_ID"
      ? `/id/:id`
      : verb === "PAGINATED_GET"
      ? "/page/:page"
      : "/"
  }`;
  return new Item({
    name,
    request: {
      header,
      url,
      method: method,
      body: {
        mode: "raw",
        raw: `{${
          verb === "CREATE" || verb === "UPDATE_BY_ID"
            ? entityMetadata.columns
                .map(
                  (column) =>
                    `"${column.name}":${column.type === "Number" ? 0 : ""},`
                )
                .toString()
                .slice(0, -1)
            : ""
        }`,
      },
      auth: null,
    },
  });
};

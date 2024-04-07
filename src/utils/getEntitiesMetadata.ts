import { ColumnMetadata, EntityMetadata, props } from "../types/types";

export const getEntitiesMetadata = ({
  connection,
  entities,
}: {
  connection: props["connection"];
  entities: props["entities"];
}) => {
  let entitiesMetadata: Array<EntityMetadata> = [];

  for (const entity of entities) {
    const entityMetadata = connection.getMetadata(entity);

    const curatedEntityMetadata = {
      name: entityMetadata.name,
      columns: entityMetadata.columns.map((columnn) => {
        return {
          name: columnn.propertyName,
          primaryColumn: columnn.isPrimary,
          type: (columnn.type as Function).name,
          length: columnn.length === "" ? undefined : columnn.length,
          isNullable: columnn.isNullable,
        } as ColumnMetadata;
      }),
    };

    entitiesMetadata.push(curatedEntityMetadata);
  }

  return entitiesMetadata;
};

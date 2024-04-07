import { Router } from "express";
import { Config, EntityMetadata } from "../types/types";
import { DataSource } from "typeorm";
import { GetById } from "./GetById";
import { PaginatedGet } from "./PaginatedGet";
import { DeleteById } from "./DeleteById";
import { Create } from "./Create";
import { UpdateById } from "./UpdateById";
import { Collection, ItemGroup, Variable } from "postman-collection";
import { createPostmanItem } from "../utils/createPostmanItem";

export const generateRoutes = ({
  entitiesMetadata,
  connection,
  config,
}: {
  entitiesMetadata: Array<EntityMetadata>;
  connection: DataSource;
  config: Config;
}) => {
  let router = Router();

  let postmanCollection = new Collection({
    info: {
      name: config.apiName ? config.apiName : "MyTinyAPI",
    },
    variable: [
      { id: "host", name: "host", value: config.host },
      { id: "port", name: "port", value: config.port },
      {
        id: "basePath",
        name: "basePath",
        value: config.basePath ? config.basePath : "/",
      },
    ],
  });

  for (const entityMetadata of entitiesMetadata) {
    const itemGroup = new ItemGroup({ name: entityMetadata.name });

    itemGroup.items.add(
      createPostmanItem(GetById({ router, connection, entityMetadata, config }))
    );
    itemGroup.items.add(
      createPostmanItem(
        PaginatedGet({ router, connection, entityMetadata, config })
      )
    );
    itemGroup.items.add(
      createPostmanItem(
        DeleteById({ router, connection, entityMetadata, config })
      )
    );
    itemGroup.items.add(
      createPostmanItem(Create({ router, entityMetadata, connection, config }))
    );
    itemGroup.items.add(
      createPostmanItem(
        UpdateById({ router, entityMetadata, connection, config })
      )
    );

    postmanCollection.items.add(itemGroup as any);
  }

  //Add collection to router
  router.get(
    `${config.basePath ? config.basePath : "/"}apiPostmanCollection`,
    (req, res) => {
      res.send(postmanCollection.toJSON());
    }
  );

  return router;
};

import "reflect-metadata";
import { getEntitiesMetadata } from "./utils/getEntitiesMetadata";
import { generateRoutes } from "./apiRoutes";
import { EntityMetadata, props } from "./types/types";

export const MyTinyAPI = ({ connection, entities, config }: props) => {
  //Generate entity list and it's structure
  const entitiesMetadata: Array<EntityMetadata> = getEntitiesMetadata({
    connection,
    entities,
  });

  //Generate routes for each entity CRUD
  const router = generateRoutes({ entitiesMetadata, connection, config });

  //Log expose api route
  console.log(`\x1b[32mMyTinyApi initialized sucessfully! \x1b[0m`);
  console.log(
    `Api listening at: \x1b[34mhttp://${config.host}:${config.port}${
      config.basePath ? config.basePath : "/"
    }\x1b[0m`
  );
  console.log(
    `Postman collection available at: \x1b[34mhttp://${config.host}:${
      config.port
    }${config.basePath ? config.basePath : "/"}apiPostmanCollection\x1b[0m`
  );
  return router;
};

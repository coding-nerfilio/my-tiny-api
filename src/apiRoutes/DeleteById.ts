import { Router } from "express";
import { DataSource } from "typeorm";
import { Config, EntityMetadata } from "../types/types";
import { createPostmanItem } from "../utils/createPostmanItem";
import { errorMiddleware } from "../middleware/errorMiddleware";

export const DeleteById = ({
  router,
  entityMetadata,
  connection,
  config,
}: {
  connection: DataSource;
  router: Router;
  entityMetadata: EntityMetadata;
  config: Config;
}): Parameters<typeof createPostmanItem>[0] => {
  router.delete(
    `${config.basePath ? config.basePath : "/"}${entityMetadata.name}/id/:id`,
    errorMiddleware(async (req, res) => {
      const repository = connection.getRepository(entityMetadata.name);
      const id = req.params.id;

      const data = await repository.delete({
        id,
      });

      res.send({
        metadata: entityMetadata,
        deleteResult: data,
      });
    })
  );
  return { method: "DELETE", verb: "DELETE", entityMetadata };
};

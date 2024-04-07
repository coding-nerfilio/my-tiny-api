import { Router } from "express";
import { DataSource } from "typeorm";
import { Config, EntityMetadata } from "../types/types";
import { ValidateData } from "../utils/validateData";
import { createPostmanItem } from "../utils/createPostmanItem";
import { errorMiddleware } from "../middleware/errorMiddleware";

export const UpdateById = ({
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
  router.put(
    `${config.basePath ? config.basePath : "/"}${entityMetadata.name}`,
    errorMiddleware(async (req, res) => {
      const repository = connection.getRepository(entityMetadata.name);

      let data = req.body;
      const validateData = ValidateData({ entityMetadata, data });

      if (validateData.status === -1) {
        res.status(500).send({
          entityMetadata,
          validateData,
        });
      } else {
        data = await repository.update(data.id, data);
        res.send({
          entityMetadata,
          updateResult: data,
        });
      }
    })
  );
  return { method: "PUT", verb: "UPDATE_BY_ID", entityMetadata };
};

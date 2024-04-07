import { Router } from "express";
import { DataSource } from "typeorm";
import { Config, EntityMetadata } from "../types/types";
import { createPostmanItem } from "../utils/createPostmanItem";
import { errorMiddleware } from "../middleware/errorMiddleware";

export const PaginatedGet = ({
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
  router.get(
    `${config.basePath ? config.basePath : "/"}${
      entityMetadata.name
    }/page/:page`,
    errorMiddleware(async (req, res) => {
      const repository = connection.getRepository(entityMetadata.name);

      const skip = (Number(req.params.page) - 1) * 10;
      const take = 10;

      const data = await repository.find({
        skip,
        take,
      });

      const amountOfPages = Math.round((await repository.count()) / take);
      res.send({
        entityMetadata,
        paginationMetadata: {
          resultsPerPage: 10,
          amountOfPages,
        },
        data,
      });
    })
  );
  return { method: "GET", verb: "PAGINATED_GET", entityMetadata };
};

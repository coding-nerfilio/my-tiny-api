import { DataSource } from "typeorm";

export type EntityMetadata = {
  name: string;
  columns: ColumnMetadata[];
};

export type ColumnMetadata = {
  name: string;
  primaryColumn: boolean;
  type: string;
  length?: string;
  isNullable: boolean;
};

export type Config = {
  apiName?: string;
  basePath?: string;
  host: string;
  port: number;
};

export interface props {
  connection: DataSource;
  entities: Array<string>;
  config: Config;
}

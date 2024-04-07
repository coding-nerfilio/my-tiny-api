import { EntityMetadata } from "../types/types";

export const ValidateData = ({
  entityMetadata,
  data,
}: {
  entityMetadata: EntityMetadata;
  data: any;
}) => {
  let validationResult = { messages: [], status: 0 };
  for (const column of entityMetadata.columns) {
    let value = data[column.name];

    if (column.primaryColumn) {
      continue;
    }

    // Check if the value is empty for non-nullable columns
    if (!column.isNullable && value == null) {
      validationResult.messages.push(`${column.name} is empty`);
      continue;
    }

    // Check length for string columns
    if (
      column.type === "varchar" &&
      column.length &&
      value.length > column.length
    ) {
      validationResult.messages.push(`${column.name} exceeds length`);
    }

    // Check type
    if (typeof value !== column.type.toLowerCase()) {
      validationResult.messages.push(`${column.name} is not a ${column.type}`);
    }
  }

  if (validationResult.messages.length > 0) validationResult.status = -1;

  return validationResult;
};

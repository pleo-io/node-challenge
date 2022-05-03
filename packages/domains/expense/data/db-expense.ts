import { query } from "@nc/utils/db";
import { QueryData, FilterDirection } from "../types";

const filterOptions: Map<string, string> = new Map([
  ["gte", ">="],
  ["gt", ">"],
  ["lt", "<"],
  ["lte", "<="],
]);
const filterParams = [
  "merchant_name",
  "currency",
  "status",
  "date_created",
  "amount_in_cents",
];

function pagination(expenseQuery: QueryData, limit: number, offset?: number) {
  if (limit) {
    expenseQuery.query += `LIMIT $${expenseQuery.params.length + 1}`;
    expenseQuery.params.push(limit);

    if (offset) {
      expenseQuery.query += `OFFSET $${expenseQuery.params.length + 1}`;
      expenseQuery.params.push(offset);
    }
  }
}

function sort(expenseQuery: QueryData, value: FilterDirection) {
  if (typeof value.desc === "string" ) {
    expenseQuery.query += `ORDER BY ${value.desc} DESC`;
  } else if (
    typeof value.asc === "string"
  ) {
    expenseQuery.query += `ORDER BY ${value.asc} ASC`;
  }
}

function filter(
  expenseQuery: QueryData,
  name: string,
  value: string | Array<string>
) {
  if (typeof value === "string") {
    expenseQuery.query += `AND ${name} = $${expenseQuery.params.length + 1}`;
    expenseQuery.params.push(value);
  } else {
    for (const data in value) {
      const operator = filterOptions.get(data);
      if (operator && value[data]) {
        expenseQuery.query += `AND ${name} ${operator} $${
          expenseQuery.params.length + 1
        }`;
        expenseQuery.params.push(value[data]);
      }
    }
  }
}

export function readUserExpenses(reqQuery) {
  const userExpenseQuery: QueryData = {
    query: `SELECT * FROM expenses WHERE user_id = $1`,
    params: [reqQuery.userId],
  };
  for (const fieldProp of filterParams) {
    const field = reqQuery[fieldProp];

    if (field) {
      filter(userExpenseQuery, fieldProp, field);
    }
  }

  if (reqQuery.sortBy) {
    sort(userExpenseQuery, reqQuery.sortBy);
  }
  if (reqQuery.limit) {
    pagination(userExpenseQuery, reqQuery.limit, reqQuery.offset);
  }
  console.log(reqQuery);

  return query(userExpenseQuery.query, userExpenseQuery.params).then(
    (response) => response.rows
  );
}

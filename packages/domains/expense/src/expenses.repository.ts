import { Expenses } from './expenses.models';
import { query } from '@nc/utils/db';
import { Page, QueryPage, SortingEnum, SortingType } from '@nc/utils/types';

/**
 * @param criteria
 * @returns return a pages of expenses that match with the criteria
 */
export async function getExpenses(criteria: QueryPage<Expenses> = {}): Promise<Page<Expenses>> {
  criteria.page ??= 1;
  criteria.pageSize ??= 10;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { page, pageSize, sorting, ...restCriteria } = criteria;

  const total = await countExpensesQuery(restCriteria);

  if (total === 0) {
    return {
      page,
      pageSize,
      total,
      data: [],
    };
  }

  const expenses = await getExpensesFromDb(criteria);
  return {
    page,
    pageSize,
    total,
    data: expenses,
  };
}

/**
 * @description build and perform the query define on criteria
 * @param {QueryPage<Expenses>} criteria
 * @returns the amount that expenses that match with the criteria
 */
async function getExpensesFromDb(criteria: QueryPage<Expenses>): Promise<Expenses[]> {
  const { page, pageSize, sorting, ...restCriteria } = criteria;
  const [sqlWithoutSorting, params] = addConditionToQuery(`SELECT * FROM expenses :condition :sorting limit ${pageSize} offset ${(page - 1) * pageSize}`, restCriteria);
  const sql = addSorting(sqlWithoutSorting, sorting);
  const result = await query<Expenses>(sql, params);
  return result.rows;
}

/**
 * @param criteria
 * @returns the amount that expenses that match with the criteria
 */
async function countExpensesQuery(criteria: Partial<Expenses>): Promise<number> {
  const [sql, params] = addConditionToQuery('SELECT count(*) FROM expenses :condition', criteria);

  const result = await query<{count: number}>(sql, params);
  return +result.rows[0].count;
}

/**
 * @description Extract params and prepare WHERE clause condition from  criteria and replace the condition in sqlTemplate where keyword :condition
 * @param sqlTemplate
 * @param criteria
 * @return a tuple with the sql and  params
 */
function addConditionToQuery<T>(sqlTemplate: string, criteria: Partial<T>): [string, unknown[]] {
  const condition = Object.keys(criteria).map((key, index) => {
    return `"${key}"=$${index + 1}`;
  }).join(' and ');

  const params: unknown[] = Object.values(criteria);
  const isThereCondition: boolean = params.length > 0;
  return (!isThereCondition) ? [sqlTemplate.replace(':condition', ''), []]
    : [sqlTemplate.replace(':condition', `WHERE ${condition}`), params];
}

/**
 * @param sqlTemplate
 * @param sorting
 * @returns replace :sorting substring in @see sqlTemplate for an order by clause if it's needed
 */
function addSorting<T>(sqlTemplate: string, sorting?: SortingType<T>): string {
  if (!(sorting && sorting.field)) { return sqlTemplate.replace(':sorting', ''); }

  return sqlTemplate.replace(':sorting', `order by ${sorting.field} ${sorting.sort || SortingEnum.ASCENDENT}`);
}

export interface ExpensesRepository {
  getExpenses(criteria: QueryPage<Expenses>): Promise<Page<Expenses>>
}

export const repository: ExpensesRepository = {
  getExpenses,
};

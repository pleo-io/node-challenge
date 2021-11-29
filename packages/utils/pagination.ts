// TODO setup function to return paginated data
export function pagination(data: any[], queryName: string, total: number, limit: number, page: number): any {
  const pageNum = page * 1 || 0;
  const output = { pageInfo: { total: 0, currentPage: 0, totalPages: 0 } };

  output[queryName] = [];
  if (data.length) {
    output[queryName] = data;
    output.pageInfo.total = total;
    output.pageInfo.currentPage = pageNum || 1;
    output.pageInfo.totalPages = Math.ceil(total / limit);
  }

  return output;
}

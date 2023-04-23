interface QueryObjectInterface {
  sortOptions: Map<String, any> | null;
  queryFilters: Map<String, any> | null;
  paginate: boolean;
  customLabels: JSON | null;
  limit: number | null;
  page: number | null;
  offset: number | null;

  getOptions(): JSON | null;

  getQuery(): JSON | null;
}

export default QueryObjectInterface;

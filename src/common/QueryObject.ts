import QueryObjectInterface from "./QueryObjectInterface.ts";

class QueryObject implements QueryObjectInterface {
  static DEFAULT_LIMIT = 10;
  static DEFAULT_PAGE = 1;
  static DEFAULT_OFFSET = 0;

  sortOptions: Map<String, any>;
  queryFilters: Map<String, any>;
  paginate: boolean;
  customLabels: object;
  limit: number | null;
  page: number | null;
  offset: number | null;

  constructor() {
    this.sortOptions = new Map();
    this.queryFilters = new Map();
    this.paginate = true;
    this.customLabels = null;
    this.limit = QueryObject.DEFAULT_LIMIT;
    this.page = QueryObject.DEFAULT_PAGE;
    this.offset = QueryObject.DEFAULT_OFFSET;
  }

  getOptions(): object {
    const sorts = this.sortOptions.entries();

    return {
      paginate: this.paginate,
      customLabels: this.customLabels,
    };
  }

  getQuery(): object {
    throw new Error("Method not implemented.");
  }

  getFünfMachen = (real: number = 5): string => {
    return `Fünf Machen! aber es ist ${real === 5 ? "real" : real}.`;
  };
}

export default QueryObject;

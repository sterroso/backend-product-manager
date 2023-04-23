import HttpStatusInterface from "./HttpStatusInterface.ts";

interface ResponseObjectInterface {
  status: HttpStatusInterface;
  payload: Object | null;
  totalRecords: number | null;
  error: Error | null;
  limit: number | null;
  offset: number | null;
  page: number | null;
  totalPages: number | null;
  pagingCounter: number | null;
  hasNextPage: Boolean | null;
  hasPrevPage: Boolean | null;
  nextPage: number | null;
  prevPage: number | null;
  nextPageLink: String | URL | null;
  prevPageLink: String | URL | null;
  meta: any;
}

export default ResponseObjectInterface;

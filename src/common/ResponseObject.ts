import HttpStatusInterface from "./HttpStatusInterface.ts";
import ResponseObjectInterface from "./ResponseObjectInterface.ts";
import { HttpStatus } from "../config/app.constants.js";

class ResponseObject implements ResponseObjectInterface {
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

  constructor(status: HttpStatusInterface = HttpStatus.OK) {
    if (
      typeof status.code === "number" &&
      typeof status.name === "string" &&
      typeof status.description === "string" &&
      typeof status.reference === "string"
    ) {
      this.status = status;
    } else {
      this.status = HttpStatus.OK;
    }

    this.payload = null;

    this.totalRecords = null;

    this.error = null;

    this.limit = 10;

    this.offset = 0;

    this.page = 1;

    this.totalPages = 1;

    this.pagingCounter = null;

    this.hasNextPage = false;

    this.hasPrevPage = false;

    this.nextPage = null;

    this.prevPage = null;

    this.nextPageLink = null;

    this.prevPageLink = null;

    meta: null;
  }

  get statusCode() {
    return this.status.code;
  }

  get statusName() {
    return this.status.name;
  }

  get statusDescription() {
    return this.status.description;
  }

  get statusReference() {
    return this.status.reference;
  }

  toString = () => {
    return `{ status: ${this.status}, payload: ${this.payload}, error: ${this.error} }`;
  };

  toJSON = () => {
    return JSON.parse(this.toString());
  };

  getNextPageLink = (
    baseUrl: String | URL,
    path: String | URL,
    options: any = null,
    query: any = null
  ) => {
    if (this.hasNextPage) {
      let nextPageString = `${baseUrl}${path}`;

      nextPageString += `?limit=${options?.limit ? options.limit : 10}`;

      nextPageString += `&page=${this.nextPage}`;

      nextPageString += `${options?.offset ? `&offset=${options.offset}` : ""}`;

      if (query) {
        const queries = Object.getOwnPropertyNames(query);

        queries.forEach((q) => {
          nextPageString += `&${q}=${query[q]}`;
        });
      }

      if (options?.sort) {
        const sortingCriteria = Object.getOwnPropertyNames(options.sort);

        sortingCriteria.forEach((c) => {
          nextPageString += `&sortBy${c.at(0).toUpperCase()}${c.substring(1)}=${
            options.sort[c] === 1 ? "asc" : "desc"
          }`;
        });
      }

      return nextPageString;
    } else {
      return null;
    }
  };

  getPrevPageLink = (
    baseUrl: String | URL,
    path: String | URL,
    options: any = null,
    query: any = null
  ) => {
    if (this.hasPrevPage) {
      let prevPageString = `${baseUrl}${path}`;

      prevPageString += `?limit=${options?.limit ? options.limit : 10}`;

      prevPageString += `&page=${this.prevPage}`;

      prevPageString += `${options?.offset ? `&offset=${options.offset}` : ""}`;

      if (query) {
        const queries = Object.getOwnPropertyNames(query);

        queries.forEach((q) => {
          prevPageString += `&${q}=${query[q]}`;
        });
      }

      if (options?.sort) {
        const sortingCriteria = Object.getOwnPropertyNames(options.sort);

        sortingCriteria.forEach((c) => {
          prevPageString += `&sortBy${c.at(0).toUpperCase()}${c.substring(1)}=${
            options.sort[c] === 1 ? "asc" : "desc"
          }`;
        });
      }

      return prevPageString;
    } else {
      return null;
    }
  };
}

export default ResponseObject;

export type HttpRequest = {
  url: string;
  params?: HttpParams;
  method: HttpMethod;
  headers?: HttpHeaders;
  body?: any;
};

export interface HttpClient<R = any> {
  request: (data: HttpRequest) => Promise<HttpResponse<R>>;
}

export type HttpHeaders = {
  [key: string]: string;
};

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export type HttpParams = {
  [key: string]: string;
};

export enum HttpCode {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  NOT_ACCEPTABLE = 406,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
}

export type HttpResponse<T = any> = {
  httpCode: HttpCode;
  message: string;
  body?: T;
  meta?: {
    pagination?: any;
  };
  error?: {
    code: string;
  };
};

import { Method } from "../controller/types";

type ResponseData = {
  [x: string]: {
    statusCode: number;
    json: any;
  }
}

interface ApiSpec {
  method: Method;
  url: string;
  response: Partial<ResponseData>;
  body?: any;
  description?: string;
  headers?: { Authorization: string };
}

export type { Method, ApiSpec }
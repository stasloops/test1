import { http } from "@/src/shared/api/instance";

export interface Schema {
  payload: {
    login: string;
    password: string;
    rememberMe: boolean;
  };
  response: {
    access_token: string;
  };
}

export const httpPostAutorizate = (payload: Schema["payload"]) =>
  http
    .post<Schema["response"]>("/authenticate", payload)
    .then((response) => response.data);

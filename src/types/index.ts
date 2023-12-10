export type HttpMethods = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";

export interface UserData {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  active: Boolean;
  createdAt: Date;
  updatedAt: Date;
}

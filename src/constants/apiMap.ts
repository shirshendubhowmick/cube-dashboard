import { HttpMethods } from "../types";

export const httpMethods: { [key in HttpMethods]: HttpMethods } = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
  HEAD: "HEAD",
};

const apiMap = {
  userLogin: {
    url: `${API_BASE_URL}/user/session`,
    method: httpMethods.POST,
  },
  validateSession: {
    url: `${API_BASE_URL}/user/session`,
    method: httpMethods.GET,
  },
  userLogout: {
    url: `${API_BASE_URL}/user/session`,
    method: httpMethods.DELETE,
  },
};

export default apiMap;

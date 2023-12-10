import initNetworkRequest from "./networkServices";

import apiMap from "../constants/apiMap";

export interface UserLoginResponse {
  csrfToken: string;
  cubeApiToken: string;
  user: {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    active: Boolean;
    createdAt: Date;
    updatedAt: Date;
  };
}

export async function userLogin(username: string, password: string) {
  const response = await initNetworkRequest<UserLoginResponse>({
    URL: apiMap.userLogin.url,
    method: apiMap.userLogin.method,
    body: {
      username,
      password,
    },
  });
  return response.data;
}

export async function userLogout() {
  return initNetworkRequest({
    URL: apiMap.userLogout.url,
    method: apiMap.userLogout.method,
  });
}

export async function validateSession() {
  const response = await initNetworkRequest<
    Omit<UserLoginResponse, "csrfToken">
  >({
    URL: apiMap.validateSession.url,
    method: apiMap.validateSession.method,
  });

  return response.data;
}

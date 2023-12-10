import qs from "qs";

import { HttpMethods } from "../types";

export type SimpleRequestContentType =
  | "application/x-www-form-urlencoded"
  | "multipart/form-data"
  | "text/plain"
  | null;

export interface ApiResponse<T> {
  headers: Response["headers"];
  status: Response["status"];
  statusText: Response["statusText"];
  data: T;
  fetchFailure: boolean;
  fetchFailureMsg?: string;
  request: {
    requestUrl: string;
    requestSearchString?: any;
    requestBody?: any;
    method: string;
    requestMasked: boolean;
    simpleRequest: boolean;
  };
}

export type InitNetworkRequestPayload = {
  method: HttpMethods;
  URL: string;
  body?: object;
  bearerAuthToken?: string;
  searchParams?: object;
  customHeaders?: object;
  requestMasked?: boolean;
  simpleRequestContentType?: SimpleRequestContentType;
};

export interface ApiError {
  code: string;
  message: string;
  details: string;
}

const defaultHeaders = {
  "Content-Type": "application/json",
};

/**
 * Initiate a network request
 * @param method HTTP method of the request
 * @param URL Complete URL
 * @param body Request body, not applicable for GET request
 * @param searchParams the search parans or the query params
 * @param customHeaders any additional header needs to be passed
 * @param requestMasked if the request obj needs to be masked in error logger
 * @param simpleRequestContentType If this param is set a simple request will be triggerd,
 * setting this param will reject with error if HTTP method is not wither of GET, POST, HEAD
 * @returns A promise containing the error or response object
 */
async function initNetworkRequest<T>({
  method,
  URL,
  body,
  bearerAuthToken,
  searchParams,
  customHeaders,
  requestMasked,
  simpleRequestContentType,
}: InitNetworkRequestPayload): Promise<ApiResponse<{ data: T }>> {
  let response;
  let finalURL = URL;
  let searchString = "";

  if (searchParams) {
    searchString = qs.stringify(searchParams);
    finalURL = `${URL}?${searchString}`;
  }

  let headers = new Headers({
    ...defaultHeaders,
    ...customHeaders,
  });

  if (bearerAuthToken) {
    headers.append("Authorization", `Bearer ${bearerAuthToken}`);
  }

  if (simpleRequestContentType) {
    if (method !== "GET" && method !== "POST" && method !== "HEAD") {
      throw new Error("Invalid HTTP method");
    }
    headers = new Headers({
      "Content-Type": simpleRequestContentType,
    });
  }
  try {
    response = await fetch(finalURL, {
      method,
      headers,
      body: JSON.stringify(body),
      credentials: "include",
    });

    const returnObj: ApiResponse<{ data: T }> = {
      headers: response.headers,
      statusText: response.statusText,
      status: response.status,
      data: response.headers.get("Content-Length")
        ? await response.json()
        : null,
      fetchFailure: false,
      request: {
        requestUrl: URL,
        requestSearchString: requestMasked ? undefined : searchString,
        requestBody: requestMasked ? undefined : body,
        method,
        requestMasked: Boolean(requestMasked),
        simpleRequest: Boolean(simpleRequestContentType),
      },
    };
    // * response was successful (status in the range 200-299) or not.
    if (!response.ok) {
      // eslint-disable-next-line @typescript-eslint/return-await
      return Promise.reject(returnObj);
    }
    return returnObj;
  } catch (err: any) {
    const returnObj: ApiResponse<null> = {
      fetchFailure: true,
      fetchFailureMsg: err.message,
      headers: new Headers(),
      status: 0,
      statusText: "",
      data: null,
      request: {
        requestUrl: URL,
        requestSearchString: requestMasked ? undefined : searchString,
        requestBody: requestMasked ? undefined : body,
        method,
        requestMasked: Boolean(requestMasked),
        simpleRequest: Boolean(simpleRequestContentType),
      },
    };

    return Promise.reject(returnObj);
  }
}

export function isApiError(
  value: unknown,
): asserts value is ApiResponse<null | ApiError[]> {
  const error = value as ApiResponse<null | ApiError[]>;

  if (
    typeof error.fetchFailure === "undefined" ||
    typeof error.request === "undefined"
  ) {
    throw new Error("Error object is not of type ApiResponse");
  }
}

export default initNetworkRequest;

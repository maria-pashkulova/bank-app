import { CustomError } from "@/interfaces/customTypes";

const buildOptions = (data?: any, token?: string): RequestInit => {
  const options: RequestInit = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  if (token) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  return options;
};

const request = async (
  method: string,
  url: string,
  data?: any,
  token?: string
): Promise<any> => {
  // Perform the fetch operation
  const response = await fetch(url, {
    ...buildOptions(data, token),
    method,
  });

  // Check if the response status is not ok (status code not in the range 200-299)
  if (!response.ok) {
    // Parse the response body as JSON to get the error message
    const error = await response.json();

    // Throw an error with the message from the server and status - custom errors logic
    if (error.message) {
      const errorWithStatus = new Error(error.message) as CustomError;
      errorWithStatus.status = response.status;
      throw errorWithStatus;
    }
  }

  // 204 - no content -> logout server response and TODO:successful delete responses
  if (response.status === 204) {
    return {};
  }

  try {
    // Try to parse the response body as JSON
    const result = await response.json();
    return result;
  } catch (error) {
    // If parsing as JSON fails, return the raw response
    return response;
  }
};

// Partial application for HTTP methods
export const get = (url: string, token?: string) =>
  request("GET", url, undefined, token);
export const post = (url: string, data?: any, token?: string) =>
  request("POST", url, data, token);
export const put = (url: string, data?: any, token?: string) =>
  request("PUT", url, data, token);
export const remove = (url: string, token?: string) =>
  request("DELETE", url, undefined, token);

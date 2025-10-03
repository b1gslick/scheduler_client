interface useHttpClientProps {
  endpoint: string;
}

export interface CustomRequestProps {
  body?: object;
  endpoint?: string;
  params?: Record<string, string>;
  header?: Record<string, string>;
}

export const useHttpClient = (props: useHttpClientProps) => {
  const baseUrl =
    (process.env.BACKEND_ROUTE as string) ?? "http://localhost:5173/api/v1";

  const prepareRequest = async (
    httpMethod: string,
    bodyObject?: object,
    header?: Record<string, string>,
  ): Promise<RequestInit> => {
    const requestOptons: RequestInit = {
      method: httpMethod,
      headers: {
        "Content-type": "application/json",
        ...header,
      },
      body: bodyObject ? JSON.stringify(bodyObject) : null,
    };
    return requestOptons;
  };

  const executeRequest = async <T>(
    request: RequestInit,
    endpoint?: string,
    params?: Record<string, string>,
  ): Promise<T> => {
    const queryParams = new URLSearchParams(params).toString();
    const requestUrl: string =
      baseUrl +
      props.endpoint +
      (endpoint ?? "") +
      (params ? `${queryParams}` : "");
    try {
      const response = await fetch(requestUrl, request);
      if (!response.ok) {
        const errorMsg = await response.text();
        return { status: response.status, errorMsg } as T;
      }

      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.includes("application/json")) {
        return (await response.json()) as T;
      } else {
        return {} as T;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const get = async <T>(
    customRequestProps?: CustomRequestProps,
  ): Promise<T> => {
    const { body, endpoint, params, header } = customRequestProps ?? {};
    const request = await prepareRequest("GET", body, header);
    return executeRequest(request, endpoint, params);
  };
  const post = async <T>(
    customRequestProps?: CustomRequestProps,
  ): Promise<T> => {
    const { body, endpoint, params, header } = customRequestProps ?? {};
    const request = await prepareRequest("POST", body, header);
    return executeRequest(request, endpoint, params);
  };
  const put = async <T>(
    customRequestProps?: CustomRequestProps,
  ): Promise<T> => {
    const { body, endpoint, params, header } = customRequestProps ?? {};
    const request = await prepareRequest("PUT", body, header);
    return executeRequest(request, endpoint, params);
  };
  const del = async <T>(
    customRequestProps?: CustomRequestProps,
  ): Promise<T> => {
    const { body, endpoint, params, header } = customRequestProps ?? {};
    const request = await prepareRequest("DELETE", body, header);
    return executeRequest(request, endpoint, params);
  };
  return { get, post, put, del };
};

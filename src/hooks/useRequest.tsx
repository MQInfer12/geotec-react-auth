import { useNavigate } from "react-router-dom";
import { serverAPI } from "../config";
import { ApiResponse } from "../interfaces/apiResponse";
import { deleteAuthCookie, getAuthCookie } from "../utils/authCookie";
import { useAuthContext } from "../contexts/auth";

interface Options {
  headers?: Record<string, string>;
  method?: string;
  baseUrl?: string;
  blobFilename?: string;
}

const downloadFile = (blob: Blob, filename: string) => {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
  a.click();
  a.remove();
};

export const useRequest = () => {
  const { logoutRoute } = useAuthContext();
  const navigate = useNavigate();

  const sendRequest = async <T,>(
    route: string,
    body: Record<string, any> | null,
    options?: Options
  ): Promise<ApiResponse<T> | null> => {
    const thisOptions: Options = {
      method: options?.method || "POST",
      baseUrl: options?.baseUrl || serverAPI,
      blobFilename: options?.blobFilename || "",
      headers: options?.headers || {},
    };
    const token = getAuthCookie();

    let response: any;
    if (body instanceof FormData) {
      response = await fetch(`${thisOptions.baseUrl}${route}`, {
        method: thisOptions.method,
        headers: {
          Accept: "application/json",
          Authorization: token ? `Bearer ${token}` : "",
          ...thisOptions.headers,
        },
        body,
      });
    } else {
      response = await fetch(`${thisOptions.baseUrl}${route}`, {
        method: thisOptions.method,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: token ? "Bearer " + token : "",
          ...thisOptions.headers,
        },
        body:
          thisOptions.method !== "GET" ? JSON.stringify(body || {}) : undefined,
      });
    }
    let isValidResponse = true;
    if (response.status === 401) {
      navigate(logoutRoute);
      deleteAuthCookie();
      isValidResponse = false;
    }
    if (!isValidResponse) return null;

    if (!thisOptions.blobFilename) {
      const json: ApiResponse<T> = await response.json();
      if (!response.ok) {
        return null;
      }
      return json;
    }

    const blob = await response.blob();
    downloadFile(blob, thisOptions.blobFilename);
    return null;
  };

  return {
    sendRequest,
  };
};

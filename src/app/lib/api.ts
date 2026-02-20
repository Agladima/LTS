const resolveApiBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_API_BASE_URL) {
    return process.env.NEXT_PUBLIC_API_BASE_URL;
  }

  if (typeof window !== "undefined") {
    const { hostname } = window.location;
    if (hostname === "localhost" || hostname === "127.0.0.1") {
      return "http://127.0.0.1:8000/api";
    }
    return `http://${hostname}:8000/api`;
  }

  return "http://127.0.0.1:8000/api";
};

const buildUrl = (path: string) => {
  const API_BASE_URL = resolveApiBaseUrl();
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
};

export const apiGet = async <T>(path: string): Promise<T> => {
  const url = buildUrl(path);
  let response: Response;

  try {
    response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
  } catch (error) {
    throw new Error(
      `Failed to fetch ${url}. Check backend availability, CORS, and NEXT_PUBLIC_API_BASE_URL. ${String(
        error,
      )}`,
    );
  }

  if (!response.ok) {
    throw new Error(`GET ${path} failed with status ${response.status}`);
  }

  return (await response.json()) as T;
};

export const apiPost = async <TResponse>(
  path: string,
  payload: unknown,
): Promise<TResponse> => {
  const url = buildUrl(path);
  let response: Response;

  try {
    response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    throw new Error(
      `Failed to fetch ${url}. Check backend availability, CORS, and NEXT_PUBLIC_API_BASE_URL. ${String(
        error,
      )}`,
    );
  }

  if (!response.ok) {
    const rawError = await response.text();
    throw new Error(
      `POST ${path} failed with status ${response.status}: ${rawError}`,
    );
  }

  return (await response.json()) as TResponse;
};

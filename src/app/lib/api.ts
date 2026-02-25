const resolveApiBaseUrl = () => "/api/proxy";

const buildUrl = (path: string) => {
  const API_BASE_URL = resolveApiBaseUrl();
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
};

const API_TIMEOUT_MS = 90000;

export const apiGet = async <T>(path: string): Promise<T> => {
  const url = buildUrl(path);
  let response: Response;
  const controller = new AbortController();
  const timeoutId = globalThis.setTimeout(
    () => controller.abort(),
    API_TIMEOUT_MS,
  );

  try {
    response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      signal: controller.signal,
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new Error(`GET ${path} timed out after ${API_TIMEOUT_MS / 1000}s.`);
    }
    throw new Error(
      `Failed to fetch ${url}. Check backend availability, CORS, and NEXT_PUBLIC_API_BASE_URL. ${String(
        error,
      )}`,
    );
  } finally {
    globalThis.clearTimeout(timeoutId);
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
  let response: Response | null = null;
  let timedOut = false;

  for (let attempt = 0; attempt < 2; attempt += 1) {
    const controller = new AbortController();
    const timeoutId = globalThis.setTimeout(
      () => controller.abort(),
      API_TIMEOUT_MS,
    );

    try {
      response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      timedOut = false;
      break;
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        timedOut = true;
        if (attempt === 0) continue;
        throw new Error(
          `POST ${path} timed out after ${API_TIMEOUT_MS / 1000}s.`,
        );
      }
      throw new Error(
        `Failed to fetch ${url}. Check backend availability, CORS, and NEXT_PUBLIC_API_BASE_URL. ${String(
          error,
        )}`,
      );
    } finally {
      globalThis.clearTimeout(timeoutId);
    }
  }

  if (!response) {
    if (timedOut) {
      throw new Error(`POST ${path} timed out after ${API_TIMEOUT_MS / 1000}s.`);
    }
    throw new Error(`POST ${path} failed before receiving a response.`);
  }

  if (!response.ok) {
    const rawError = await response.text();
    throw new Error(
      `POST ${path} failed with status ${response.status}: ${rawError}`,
    );
  }

  return (await response.json()) as TResponse;
};

export const apiPostForm = async <TResponse>(
  path: string,
  formData: FormData,
): Promise<TResponse> => {
  const url = buildUrl(path);
  let response: Response | null = null;
  let timedOut = false;

  for (let attempt = 0; attempt < 2; attempt += 1) {
    const controller = new AbortController();
    const timeoutId = globalThis.setTimeout(
      () => controller.abort(),
      API_TIMEOUT_MS,
    );

    try {
      response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
        signal: controller.signal,
      });
      timedOut = false;
      break;
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        timedOut = true;
        if (attempt === 0) continue;
        throw new Error(
          `POST ${path} timed out after ${API_TIMEOUT_MS / 1000}s.`,
        );
      }
      throw new Error(
        `Failed to fetch ${url}. Check backend availability, CORS, and NEXT_PUBLIC_API_BASE_URL. ${String(
          error,
        )}`,
      );
    } finally {
      globalThis.clearTimeout(timeoutId);
    }
  }

  if (!response) {
    if (timedOut) {
      throw new Error(`POST ${path} timed out after ${API_TIMEOUT_MS / 1000}s.`);
    }
    throw new Error(`POST ${path} failed before receiving a response.`);
  }

  if (!response.ok) {
    const rawError = await response.text();
    throw new Error(
      `POST ${path} failed with status ${response.status}: ${rawError}`,
    );
  }

  return (await response.json()) as TResponse;
};

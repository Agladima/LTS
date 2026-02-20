import { NextRequest, NextResponse } from "next/server";

const resolveBackendBaseUrl = () =>
  process.env.BACKEND_API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "https://lts-2026-backend.onrender.com/api/";

const buildTargetUrl = (path: string[], search: string) => {
  const base = resolveBackendBaseUrl().replace(/\/+$/, "");
  const suffix = path.join("/");
  return `${base}/${suffix}/${search}`;
};

const forwardRequest = async (
  request: NextRequest,
  params: { path: string[] },
) => {
  const targetUrl = buildTargetUrl(params.path, request.nextUrl.search);

  const incomingContentType = request.headers.get("content-type");
  const shouldForwardBody = !["GET", "HEAD"].includes(request.method);
  const body = shouldForwardBody ? await request.text() : undefined;

  const backendResponse = await fetch(targetUrl, {
    method: request.method,
    headers: {
      Accept: "application/json",
      ...(incomingContentType ? { "Content-Type": incomingContentType } : {}),
    },
    body,
    cache: "no-store",
  });

  const responseText = await backendResponse.text();
  const responseContentType =
    backendResponse.headers.get("content-type") ?? "application/json";

  return new NextResponse(responseText, {
    status: backendResponse.status,
    headers: {
      "Content-Type": responseContentType,
    },
  });
};

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  return forwardRequest(request, await context.params);
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  return forwardRequest(request, await context.params);
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  return forwardRequest(request, await context.params);
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  return forwardRequest(request, await context.params);
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  return forwardRequest(request, await context.params);
}

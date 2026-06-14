import { NextRequest, NextResponse } from "next/server";

async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname
    .replace(/^\/api\/mp\//, "")
    .replace(/\/$/, "");

  const search = request.nextUrl.search;
  const targetUrl = `https://api-js.mixpanel.com/${path}/${search}`;

  const body = request.method === "GET" ? undefined : await request.arrayBuffer();

  const headers: Record<string, string> = {};
  const contentType = request.headers.get("content-type");
  const contentEncoding = request.headers.get("content-encoding");
  const authorization = request.headers.get("authorization");

  if (contentType) headers["Content-Type"] = contentType;
  if (contentEncoding) headers["Content-Encoding"] = contentEncoding;
  if (authorization) headers["Authorization"] = authorization;

  const res = await fetch(targetUrl, {
    method: request.method,
    headers,
    body,
  });

  const data = await res.arrayBuffer();

  return new NextResponse(data, {
    status: res.status,
    headers: {
      "Content-Type": res.headers.get("content-type") ?? "application/json",
    },
  });
}

export async function GET(request: NextRequest) {
  return proxy(request);
}

export async function POST(request: NextRequest) {
  return proxy(request);
}
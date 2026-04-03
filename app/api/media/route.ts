export const runtime = "nodejs";

const ALLOWED_HOSTS = new Set(["video.twimg.com", "pbs.twimg.com"]);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");

  if (!url) {
    return new Response("Missing url", { status: 400 });
  }

  const target = new URL(url);
  if (!ALLOWED_HOSTS.has(target.hostname)) {
    return new Response("Host not allowed", { status: 403 });
  }

  const headers = new Headers();
  const range = req.headers.get("range");
  if (range) {
    headers.set("range", range);
  }

  const upstream = await fetch(target, {
    headers,
    redirect: "follow",
  });

  const responseHeaders = new Headers();
  const passThroughHeaders = [
    "accept-ranges",
    "content-type",
    "content-length",
    "content-range",
    "cache-control",
    "etag",
    "last-modified",
  ];

  for (const header of passThroughHeaders) {
    const value = upstream.headers.get(header);
    if (value) {
      responseHeaders.set(header, value);
    }
  }

  return new Response(upstream.body, {
    status: upstream.status,
    headers: responseHeaders,
  });
}

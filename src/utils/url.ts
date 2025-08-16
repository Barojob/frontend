import { Nullable } from "../types/misc";
import { assert } from "./assert";

type ResolveDeepLinkArgs = {
  targetUrl: string;
  scheme?: string;
  host?: string;
};

export type DeepLinkTarget = Nullable<{
  scheme?: string;
  host?: string;
  path?: string;
  query?: Record<string, string>;
}>;

export function resolveDeepLink({
  targetUrl,
  scheme,
  host,
}: ResolveDeepLinkArgs): DeepLinkTarget {
  let url: URL;

  try {
    url = new URL(targetUrl);
    assert(
      new RegExp(`^https?|${scheme}:`).test(url.protocol),
      `Invalid deep link URL: ${targetUrl}`,
    );
    assert(url.host === host, `Invalid deep link URL: ${targetUrl}`);
  } catch (error) {
    console.warn(`Failed to resolve deep link: ${targetUrl}`, error);
    return null;
  }

  return {
    scheme: url.protocol.slice(0, -1),
    host: url.host,
    path: decodeURIComponent(url.pathname),
    query: Object.fromEntries(url.searchParams.entries()),
  } satisfies DeepLinkTarget;
}

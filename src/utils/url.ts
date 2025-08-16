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

export const resolveDeepLink = ({
  targetUrl,
  scheme,
  host,
}: ResolveDeepLinkArgs): DeepLinkTarget => {
  let url: URL;

  try {
    url = new URL(targetUrl);

    const isCustomScheme =
      !!scheme && new RegExp(`^${scheme}:`).test(url.protocol);
    const isHttpsScheme = new RegExp(`^https?`).test(url.protocol);

    assert(
      url.host === host &&
        (isHttpsScheme ? url.host.length > 0 : isCustomScheme),
      `Invalid deep link URL: ${targetUrl}`,
    );
  } catch (error) {
    console.warn(`Failed to resolve deep link: ${targetUrl}`, error);
    return null;
  }

  return {
    scheme: url.protocol.replace(":", ""),
    host: url.host,
    path: decodeURIComponent(url.pathname),
    query: Object.fromEntries(url.searchParams.entries()),
  } satisfies DeepLinkTarget;
};

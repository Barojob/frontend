import { App, type URLOpenListenerEvent } from "@capacitor/app";
import { useEffect } from "react";
import { DeepLinkTarget, resolveDeepLink } from "../utils/url";

type Props = {
  scheme?: string;
  host?: string;
  onNavigate: (target: DeepLinkTarget) => void;
};

const DeepLinkListener: React.FC<Props> = ({ scheme, host, onNavigate }) => {
  useEffect(() => {
    const handle = App.addListener(
      "appUrlOpen",
      (event: URLOpenListenerEvent) => {
        try {
          const target = resolveDeepLink({
            targetUrl: event.url,
            scheme,
            host,
          });
          onNavigate(target);
        } catch (error) {
          console.error(`Failed to resolve deep link: ${event.url}`, error);
        }
      },
    );

    return () => {
      handle.then((handle) => handle.remove());
    };
  }, [scheme, host, onNavigate]);

  return null;
};

export default DeepLinkListener;

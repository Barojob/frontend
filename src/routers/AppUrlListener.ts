import { App, type URLOpenListenerEvent } from "@capacitor/app";
import React from "react";
import { useNavigate } from "react-router-dom";

const AppUrlListener: React.FC = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    App.addListener("appUrlOpen", (event: URLOpenListenerEvent) => {
      // replace this with regex
      const slug = event.url.split(".app").pop();

      if (!slug) {
        return;
      }

      navigate(slug);
    });

    return () => {
      App.removeAllListeners();
    };
  }, []);

  return null;
};

export default AppUrlListener;

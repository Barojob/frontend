import App from "@/App";
import "@/globals-core.css";
import { assert } from "@/utils/assert";
import { defineCustomElements } from "@ionic/pwa-elements/loader";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

const renderRoot = () => {
  const rootElement = document.getElementById("root");
  assert(!!rootElement, "Root element not found");

  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
};

defineCustomElements(window);
renderRoot();

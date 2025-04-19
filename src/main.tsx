import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { assert } from "./utils/assert";

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
renderRoot();

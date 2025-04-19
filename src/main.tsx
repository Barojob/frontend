import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { assert } from "./utils/assert";

const rootElement = document.getElementById("root");
assert(!!rootElement, "Root element not found");

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

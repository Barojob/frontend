import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <div className="m-auto flex h-full flex-row justify-center opacity-100">
        <App />
      </div>
    </BrowserRouter>
  </StrictMode>,
);

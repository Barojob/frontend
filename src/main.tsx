import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="bg-gray-200 opacity-100 min-h-screen m-auto flex flex-row justify-center">
      <App />
    </div>
  </StrictMode>
);

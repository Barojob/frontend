import "@/globals-core.css";
import React from "react";
import RouterProvider from "./providers/RouterProvider";
import TanstackProvider from "./providers/TanstackProvider";

const App: React.FC = () => {
  return (
    <TanstackProvider>
      <RouterProvider />
    </TanstackProvider>
  );
};

export default App;

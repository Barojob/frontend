import "@/globals-core.css";
import React from "react";
import TanstackProvider from "./providers/TanstackProvider";
import AppRouter from "./routers/AppRouter";

const App: React.FC = () => {
  return (
    <TanstackProvider>
      <AppRouter />
    </TanstackProvider>
  );
};

export default App;

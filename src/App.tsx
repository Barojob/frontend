import "@/globals-core.css";
import TanstackProvider from "@/providers/TanstackProvider";
import AppRouter from "@/routers/AppRouter";
import React from "react";

const App: React.FC = () => {
  return (
    <TanstackProvider>
      <AppRouter />
    </TanstackProvider>
  );
};

export default App;

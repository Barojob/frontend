import "@/globals-core.css";
import { JobPostingProvider } from "@/providers/JobPostingProvider";
import TanstackProvider from "@/providers/TanstackProvider";
import AppRouter from "@/routers/AppRouter";
import React from "react";

const App: React.FC = () => {
  return (
    <TanstackProvider>
      <JobPostingProvider>
        <AppRouter />
      </JobPostingProvider>
    </TanstackProvider>
  );
};

export default App;

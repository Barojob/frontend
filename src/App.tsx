import "@/globals-core.css";
import React from "react";
import { JobPostingProvider } from "./providers/JobPostingProvider";
import TanstackProvider from "./providers/TanstackProvider";
import AppRouter from "./routers/AppRouter";

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

import React from "react";
import Router from "./Routes/Router";

const App: React.FC = () => {
  return (
    <div className="h-full w-full max-w-[600px] bg-white">
      <Router />
    </div>
  );
};

export default App;

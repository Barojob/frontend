import React from "react";
import { SyncLoader } from "react-spinners";

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <SyncLoader
        color="#367AF6"
        loading={true}
        size={15}
        aria-label="Loading Spinner"
      />
    </div>
  );
};

export default LoadingScreen;

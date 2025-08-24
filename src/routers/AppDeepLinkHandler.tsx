import React from "react";
import { useNavigate } from "react-router-dom";
import { configs } from "../configs";
import { DeepLinkTarget } from "../utils/url";
import DeepLinkListener from "./DeepLinkListener";

const AppDeepLinkHandler: React.FC = () => {
  const navigate = useNavigate();

  return (
    <DeepLinkListener
      scheme={configs.DEEP_LINK_SCHEME}
      host={configs.DEEP_LINK_HOST}
      onNavigate={handleNavigate}
    />
  );

  function handleNavigate(target: DeepLinkTarget) {
    if (!target?.path) {
      return;
    }

    navigate(target.path);
  }
};

export default AppDeepLinkHandler;

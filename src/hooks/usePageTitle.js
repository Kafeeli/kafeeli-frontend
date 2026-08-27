// src/hooks/usePageTitle.js

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getPageTitle } from "../config/pageTitle";

function usePageTitle() {
  const location = useLocation();

  useEffect(() => {
    document.title = getPageTitle(location.pathname);
  }, [location.pathname]);
}

export default usePageTitle;

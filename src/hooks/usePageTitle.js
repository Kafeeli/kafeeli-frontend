// src/hooks/usePageTitle.js

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import pageTitles from "../config/pageTitle";

function usePageTitle() {
  const location = useLocation();

  useEffect(() => {
    const title = pageTitles[location.pathname];
    document.title = title || "كفيلي";
  }, [location.pathname]);
}

export default usePageTitle;

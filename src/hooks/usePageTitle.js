// src/hooks/usePageTitle.js

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import pageTitles from "../config/pageTitle";

function usePageTitle() {
  const location = useLocation();

  useEffect(() => {
    const exactTitle = pageTitles[location.pathname];
    const dynamicTitle = Object.entries(pageTitles).find(([pattern]) => {
      if (!pattern.includes(":")) return false;
      const expression = pattern
        .split("/")
        .map((segment) => (segment.startsWith(":") ? "[^/]+" : segment))
        .join("/");
      return new RegExp(`^${expression}$`).test(location.pathname);
    })?.[1];
    const title = exactTitle || dynamicTitle;
    document.title = title || "كفيلي";
  }, [location.pathname]);
}

export default usePageTitle;

import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

//   whenever the location changes, scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <></>;
}

export default ScrollToTop;

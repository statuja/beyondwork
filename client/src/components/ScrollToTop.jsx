import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Your other component code here

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;

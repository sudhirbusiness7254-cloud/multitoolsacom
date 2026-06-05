import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scrolls the window to the top of the page (or to the tool interface
 * when the route lands on a tool page) on every route change.
 *
 * Users reported that clicking a tool sometimes leaves them scrolled
 * inside the article section of the previous page. This component
 * resets the scroll so the drop / drag area is always visible first.
 */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If the URL has an explicit hash, let the browser handle that anchor.
    if (hash) return;

    // Run after paint so layout (Header, Hero, tool) is in place.
    const id = window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });

    return () => window.cancelAnimationFrame(id);
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;

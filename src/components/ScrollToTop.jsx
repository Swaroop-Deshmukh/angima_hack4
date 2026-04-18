import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Resets window (and main scroll container) to top on route change so sidebar
 * navigation always lands at the start of the new page.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    document.querySelector('.main-content')?.scrollTo?.(0, 0);
  }, [pathname]);

  return null;
}

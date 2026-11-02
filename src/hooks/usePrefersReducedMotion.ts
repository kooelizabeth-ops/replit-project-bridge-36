import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

// Starts false on the server and first client render, then syncs after hydration.
export default function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(QUERY);
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return reduced;
}

import { useEffect, useRef, useState } from 'react';

export function useMount(fn: Function = (): void => {}): boolean {
  const [isMounted, setIsMounted] = useState(false);
  const fnRef = useRef(fn);

  useEffect(() => {
    const result = fnRef.current();
    setIsMounted(true);

    return (): void => {
      if (typeof result === 'function') {
        result();
      }
    };
  }, []);
  return isMounted;
}

'use client';

import { useRef, useEffect } from 'react';

export function useTimeout(callback: (() => void) | (() => Promise<void>), delay: number) {
  const timeoutRef = useRef<number | null>(null);
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => savedCallback.current();
    timeoutRef.current = window.setTimeout(tick, delay);
    return () => {
      if (timeoutRef.current != null) {
        window.clearTimeout(timeoutRef.current);
      } else {
        window.clearTimeout(undefined);
      }
    };
  }, [delay]);
  return timeoutRef;
}

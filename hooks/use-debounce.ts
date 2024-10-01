import { useState, useEffect } from 'react';

export function useDebounce(value: string, delay: number) {
  const [valueDebounce, setValueDebounce] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setValueDebounce(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return valueDebounce;
}

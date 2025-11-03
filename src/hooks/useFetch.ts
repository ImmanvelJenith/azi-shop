import { useState, useEffect } from 'react';

const useFetch = <T,>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch(url)
      .then((r) => r.json())
      .then((d) => mounted && setData(d))
      .catch((e) => mounted && setError(e))
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, [url]);

  return { data, loading, error };
};

export default useFetch;

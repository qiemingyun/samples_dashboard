import { useState, useEffect } from 'react';

export const useFetch = <T>(url: string, options?: any) => {
  const [data, setData] = useState<T>(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(url, options)
      .then((res) => res.json()) // check status 200...  test: wait for
      .then((data) => {
        setData(data);
        setError(null);
      })
      .catch((error) => {
        setError(error);
        setData(null);
      })
      .finally(() => setLoading(false));
  }, [url, options]);

  return { loading, error, data };
};

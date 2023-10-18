import { useState } from 'react';
import { useRouter } from 'next/navigation';

const useFetch = <T,>(redirect?: string) => {
  const router = useRouter();
  const [state, setState] = useState<{
    error: null | string;
    loading: boolean;
    data: null | T;
  }>({
    error: null,
    loading: false,
    data: null,
  });

  const request = async (url: string, options: RequestInit | undefined) => {
    try {
      setState((prev) => ({ ...prev, error: null, loading: true }));
      const res = await fetch(url, options);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      if (redirect) {
        setState((prev) => ({ ...prev, data: json }));
        return router.push(redirect);
      }
      setState((prev) => ({ ...prev, loading: false, data: json }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error:
          error instanceof Error ? error.message : 'Oops, algo deu errado.',
      }));
    }
  };

  return { ...state, request, setState };
};

export default useFetch;

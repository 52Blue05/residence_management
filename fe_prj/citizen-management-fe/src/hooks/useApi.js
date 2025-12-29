import { useState, useCallback } from "react";

/**
 * Custom hook for handling API calls with loading and error states
 * @param {Function} apiFunction - The API function to call
 * @returns {Object} { data, loading, error, execute }
 */
export function useApi(apiFunction) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async (...args) => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiFunction(...args);
        setData(result);
        return result;
      } catch (err) {
        const errorMessage = err.message || "Đã xảy ra lỗi";
        setError(errorMessage);
        console.error("API Error:", err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [apiFunction]
  );

  const reset = useCallback(() => {
    setData(null);
    setLoading(false);
    setError(null);
  }, []);

  return { data, loading, error, execute, reset };
}

/**
 * Custom hook for fetching data on component mount
 * @param {Function} apiFunction - The API function to call
 * @param {*} dependency - Dependency array for useEffect
 */
export function useFetch(apiFunction, dependency = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiFunction();
      setData(result);
    } catch (err) {
      const errorMessage = err.message || "Đã xảy ra lỗi";
      setError(errorMessage);
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  }, [apiFunction]);

  // Auto-fetch on mount and dependency changes
  React.useEffect(() => {
    fetch();
  }, [fetch, ...dependency]);

  const refetch = useCallback(fetch, [fetch]);

  return { data, loading, error, refetch };
}

export default useApi;

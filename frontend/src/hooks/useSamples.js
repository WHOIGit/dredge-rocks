import useSWR from "swr";
import { fetcher } from "../services/api";
export const API_BASE = import.meta.env.VITE_API_HOST;

export default function useSamples(id) {
  // get array or single Data Site
  console.log(`${API_BASE}/api/samples/`);
  const { data, error } = useSWR(
    id ? `${API_BASE}/api/samples/${id}` : `${API_BASE}/api/samples/`,
    fetcher
  );

  console.log(data, error);

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
}

import useSWR from "swr";
export const API_BASE = import.meta.env.VITE_API_HOST;

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function useDataSites(id) {
  // get array or single Data Site
  console.log(`${API_BASE}/api/data_sites/`);
  const { data, error } = useSWR(
    id ? `${API_BASE}/api/data_sites/${id}` : `${API_BASE}/api/data_sites/`,
    fetcher
  );

  console.log(data, error);

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
}

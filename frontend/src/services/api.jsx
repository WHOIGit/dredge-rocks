export const API_BASE = import.meta.env.VITE_API_HOST;
export const fetcher = (url) => fetch(url).then((res) => res.json());

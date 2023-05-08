import useSWR from 'swr';
import axios from 'axios';

const strapiToken = process.env.API_TOKEN;
const strapiUrl = process.env.STRAPI_URL;

const fetcher = (url) =>
  axios
    .get(url, { headers: { Authorization: `Bearer ${strapiToken}` } })
    .then((res) => res.data)
    .catch((err) => console.log('Error in fetcher: ' + err));

export function useChat() {
  const { data, error, isLoading, mutate } = useSWR(
    `${strapiUrl}/api/requests?sort=createdAt:desc&pagination[page]=1&pagination[pageSize]=5`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false

      // revalidateOnReconnect: false
    }
  );

  return {
    data,
    isLoading,
    isError: error,
    mutate
  };
}

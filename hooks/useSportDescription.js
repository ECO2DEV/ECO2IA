import useSWR from 'swr';
import axios from 'axios';
import { strapiUrl, strapiToken } from '../constants/constans';

const fetcher = (url) =>
  axios
    .get(url, { headers: { Authorization: `Bearer ${strapiToken}` } })
    .then((res) => res.data)
    .catch((err) => console.log('Error in fetcher: ' + err));

export function useSportDescription(userId = 128) {
  // Utilizar el hook useSWR para realizar la solicitud y gestionar el estado de los datos
  const { data, error, isLoading, mutate } = useSWR(
    `${strapiUrl}/api/requests?filters[users_permissions_user][id][$eq]=${userId}&filters[source][$eq]=DescripBySlug&sort=createdAt:desc&pagination[page]=1&pagination[pageSize]=1`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0
    }
  );

  async function createDescripBySlug({ slug = 'squat' }) {
    try {
      axios.post(
        `${strapiUrl}/api/openai/chatia`,
        {
          prompt: `Quiero que me des una breve descripción en español sobre ${slug}`,
          users_permissions_user: userId
        },
        {
          headers: { Authorization: `Bearer ${strapiToken}` }
        }
      );
      await mutate();
    } catch (error) {
      console.error('Error updating chat:', error);
      throw error;
    }
  }
  // console.log('data inside useSportDescription', data);

  return {
    data,
    isLoading,
    isError: error,
    mutate,
    createDescripBySlug
  };
}

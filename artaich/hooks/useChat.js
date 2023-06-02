import useSWR from 'swr';
import axios from 'axios';
import { strapiUrl, strapiToken } from '../constants/constans';

const fetcher = (url) =>
  axios
    .get(url, { headers: { Authorization: `Bearer ${strapiToken}` } })
    .then((res) => res.data)
    .catch((err) => console.log('Error in fetcher: ' + err));

export function useChat(userId = 1) {
  const { data, error, isLoading, mutate } = useSWR(
    `${strapiUrl}/api/requests?filters[users_permissions_user][id][$eq]=${userId}&filters[source][$eq]=MatChat&sort=createdAt:desc&pagination[page]=1&pagination[pageSize]=5`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0
    }
  );

  const deleteChat = async (chatId) => {
    try {
      await axios.delete(`${strapiUrl}/api/requests/${chatId}`, {
        headers: { Authorization: `Bearer ${strapiToken}` }
      });

      mutate(); // Update the data by calling the mutate function
    } catch (error) {
      console.log('Error deleting chat:', error);
    }
  };

  return {
    data,
    isLoading,
    isError: error,
    mutate,
    deleteChat
  };
}

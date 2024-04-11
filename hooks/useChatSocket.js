import useSWR from 'swr';
import axios from 'axios';
import { strapiUrl, strapiToken } from '../constants/constans';

const fetcher = (url) =>
  axios
    .get(url, { headers: { Authorization: `Bearer ${strapiToken}` } })
    .then((res) => res.data)
    .catch((err) => console.log('Error in fetcher: ' + err));

export function useChatSocket() {
  const { data, error, isLoading, mutate } = useSWR(
    `${strapiUrl}/api/conversations?populate=*&sort=id:desc`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0
    }
  );

  const updateChat = async ({ conveId, aiMessageId, userMessageId }) => {
    // console.log('estoy antes de la data', data.data);
    try {
      const conversation = data?.data?.find((conv) => conv.id === conveId);

      // console.log('es la conversacion', !conversation);
      if (!conversation) {
        throw new Error(`Conversation with ID ${conveId} not found.`);
      }

      const updatedMessages = [
        ...conversation.attributes.messages.data,
        {
          id: userMessageId
        },
        {
          id: aiMessageId
        }
      ];

      await axios.put(
        `${strapiUrl}/api/conversations/${conveId}`,
        {
          data: {
            messages: updatedMessages
          }
        },
        {
          headers: { Authorization: `Bearer ${strapiToken}` }
        }
      );
      mutate(); // Update the data by calling the mutate function
    } catch (error) {
      console.error('Error updating chat:', error);
      throw error;
    }
  };

  const deleteConversation = async ({ conveId }) => {
    try {
      await axios.delete(`${strapiUrl}/api/conversations/${conveId}`, {
        headers: { Authorization: `Bearer ${strapiToken}` }
      });
      mutate(); // Update the data by calling the mutate function
    } catch (error) {
      console.error('Error deleting Conversation:', error);
      throw error;
    }
  };

  return {
    data,
    isLoading,
    isError: error,
    mutate,
    deleteConversation,
    updateChat
  };
}

import axios from 'axios';
import { strapiUrl, header } from '../../constants/constans';

export const ChatgptResponse = async ({ prompt, user }) => {
  try {
    const response = await axios.post(
      `${strapiUrl}/api/openai/chatgpt`,
      { prompt: prompt, users_permissions_user: user },
      header
    );

    return response;
  } catch (error) {
    console.error(`Error getting prompt for ${strapiUrl}:`, error);
  }
};

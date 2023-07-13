import axios from 'axios';
import { strapiUrl, header } from '../../constants/constans';

export const MattResumResp = async ({
  prompt,
  language,
  user
}) => {
  try {
    const response = await axios.post(
      `${strapiUrl}/api/openai/matresume`,
      {
        prompt: prompt,
        language: language,
        users_permissions_user: user
      },
      header
    );

    return response;
  } catch (error) {
    console.error(`Error getting prompt for ${strapiUrl}:`, error);
    throw error;
  }
};

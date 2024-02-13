import axios from 'axios';
import { strapiUrl, header } from '../../constants/constans';

export const Eco2traductResponse = async ({
  prompt,
  user,
  fromLanguage,
  toLanguage,
  toThirdLanguage
}) => {
  try {
    const response = await axios.post(
      `${strapiUrl}/api/openai/eco2translate`,
      {
        prompt: prompt,
        users_permissions_user: user,
        fromLanguage,
        toLanguage,
        toThirdLanguage
      },
      header
    );

    return response;
  } catch (error) {
    console.error(`Error getting prompt for ${strapiUrl}:`, error);
  }
};

import axios from 'axios';
import { strapiUrl, header } from '../../constants/constans';

export const MattraductResponse = async ({
  prompt,
  user,
  fromLanguage,
  toLanguage
}) => {
  try {
    const response = await axios.post(
      `${strapiUrl}/api/openai/mattranslate`,
      {
        prompt: prompt,
        users_permissions_user: user,
        language1: fromLanguage,
        language2: toLanguage
      },
      header
    );

    return response;
  } catch (error) {
    console.error(`Error getting prompt for ${strapiUrl}:`, error);
  }
};

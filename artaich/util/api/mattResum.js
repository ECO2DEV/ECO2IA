import axios from 'axios';
import { strapiUrl, header } from '../../constants/constans';

export const MatResum = async ({
  text,
  language,
  user
}) => {
  try {
    const response = await axios.post(
      `${strapiUrl}/api/openai/matresume`,
      {
        text,
        language,
        users_permissions_user: user
      },
      header
    );

    return response;
  } catch (error) {
    console.error(`Error getting prompt for ${strapiUrl}:`, error);
  }
};

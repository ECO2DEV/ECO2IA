import axios from 'axios';
import { strapiUrl, header } from '../../constants/constans';

export const MatCVResponseXP = async ({ role, market, keywords, user }) => {
  try {
    const response = await axios.post(
      `${strapiUrl}/api/openai/matcvExperience`,
      {
        role: role,
        market: market,
        keywords: keywords,
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

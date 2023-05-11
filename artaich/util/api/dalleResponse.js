import axios from 'axios';
import { strapiUrl, header } from '../../constants/constans';

export const DalleResponse = async ({ prompt }) => {
  try {
    const response = await axios.post(
      `${strapiUrl}/api/openai/dalle`,
      { prompt: prompt },
      header
    );

    return response;
  } catch (error) {
    console.error(`Error getting prompt for ${strapiUrl}:`, error);
  }
};

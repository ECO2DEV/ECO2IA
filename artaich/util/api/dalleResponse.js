import axios from 'axios';

const strapiToken = process.env.API_TOKEN;
const strapiUrl = process.env.STRAPI_URL;

export const DalleResponse = async ({ prompt }) => {
  const header = {
    headers: {
      Authorization: `Bearer ${strapiToken}`
    }
  };
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

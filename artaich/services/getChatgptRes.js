import axios from 'axios';

const strapiToken = process.env.API_TOKEN;
const strapiUrl = process.env.STRAPI_URL;

export const getChatgptRes = async ({ prompt, user }) => {
  const header = {
    headers: {
      Authorization: `Bearer ${strapiToken}`
    }
  };
  try {
    const response = await axios.post(
      `${strapiUrl}/api/openai/chatgpt`,
      { prompt: prompt, users_permissions_user: user },
      header
    );

    return response;
  } catch (error) {
    console.log(error);
  }
};

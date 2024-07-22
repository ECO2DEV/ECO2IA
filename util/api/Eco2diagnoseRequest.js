import axios from 'axios';
import { strapiUrl, header } from '../../constants/constans';

export const Eco2diagnoseRequest = async ({ consultation, file, user }) => {
  try {
    const response = await axios.post(
      `${strapiUrl}/api/openai/eco2diagnose`,
      {
        consultation,
        formula: file,
        users_permissions_user: user
      },
      header
    );

    return response;
  } catch (error) {
    console.error(`Error getting prompt for ${strapiUrl}:`, error);
  }
};

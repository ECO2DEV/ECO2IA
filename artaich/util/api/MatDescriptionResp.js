import axios from 'axios';
import { strapiUrl, header } from '../../constants/constans';

export const MatDescriptionResp = async ({
  productDescription,
  company,
  field,
  ageRange,
  socialMedia,
  language,
  user
}) => {
  try {
    const response = await axios.post(
      `${strapiUrl}/api/openai/matdescription`,
      {
        productDescription,
        company,
        field,
        ageRange,
        socialMedia,
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

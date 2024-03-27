import axios from 'axios';
import { strapiUrl, header, strapiToken } from '../../constants/constans';

export const createIAContactMessage = async ({ formData }) => {
  // console.log('formPayload', formPayload);
  const data = {
    data: {
      name: formData.name,
      IADetail: formData.IADetail,
      Email: formData.Email
    }
  };

  console.log('data inside createIAContactMessage', data);

  try {
    const response = await axios.post(
      `${strapiUrl}/api/ia-contacts`,
      data,
      header
    );
    console.log(data);
    return response;
  } catch (error) {
    console.log(error.response.data.error);
    return error.response.data.error;
  }
};

export async function updatedAIContactImage({ formData, id }) {
  try {
    const updateAi = await axios.put(
      `${strapiUrl}/api/ia-contacts/${id}`,
      formData,
      {
        headers: { Authorization: `Bearer ${strapiToken}` }
      }
    );
    return updateAi;
  } catch (error) {
    console.error(error);
    return null;
  }
}

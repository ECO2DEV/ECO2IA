import axios from 'axios';
import { strapiUrl, header } from '../../constants/constans';

export const createContactMessage = async ({ formData }) => {
  const data = {
    data: {
      name: formData.name,
      lastName: formData.lastName,
      email: formData.email,
      company: formData.company,
      telephone: formData.telephone,
      message: formData.message
    }
  };
  try {
    const response = await axios.post(
      `${strapiUrl}/api/contacts`,
      data,
      header
    );
    return response;
  } catch (error) {
    console.log(error);
    return error.response.data.error;
  }
};

export const sendEmail = async ({ formData }) => {
  try {
    const response = await axios.post(
      `${strapiUrl}/api/email`,
      formData,
      header
    );
    return response;
  } catch (error) {
    console.log(error);
    return error.response.data.error;
  }
};

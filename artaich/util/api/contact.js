import axios from 'axios';
const strapiToken = process.env.API_TOKEN;
const strapiUrl = process.env.STRAPI_URL;
const header = {
  headers: {
    Authorization: `Bearer ${strapiToken}`,
    'Content-Type': 'application/json'
  }
};
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

import axios from "axios";
import { strapiUrl, strapiToken, header } from "../../constants/constans";

export const createIAContactMessage = async ({ formData }) => {
  const data = {
    data: {
      name: formData.name,
      IADetail: formData.IADetail,
      Email: formData.Email,
      // ImageIAS: {
      //   data: formData.ImageIAS,
      // },
    },
  };

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

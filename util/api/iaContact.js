import axios from "axios";
import { strapiUrl, strapiToken, header } from "../../constants/constans";

export const createIAContactMessage = async ({ formData }) => {
  const data = {
    data: {
      name: formData.name,
      Email: formData.Email,
      ImageIAS: {
        data: formData.ImageIAS,
      },
      IADetail: formData.IADetail,
    },
  };
  try {
    const response = await axios.post(
      `${strapiUrl}/api/ia-contacts`,
      data,
      header
    );
    console.log(data)
    return response;
  } catch (error) {
    return error.response.data.error;
  }
};

// export const sendEmail = async ({ formData }) => {
//   try {
//     const response = await axios.post(
//       `${strapiUrl}/api/email`,
//       formData,
//       header
//     );
//     return response;
//   } catch (error) {
//     // console.log(error);
//     return error.response.data.error;
//   }
// };

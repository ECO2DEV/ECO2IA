import axios from 'axios';
import { strapiUrl, header } from '../../constants/constans';
import { uploadUserImage } from './user';

export const createIAContactMessage = async ({ formData, formPayload }) => {
  // console.log('formPayload', formPayload);
  const res = await uploadUserImage({ formData: formPayload });
  console.log('respose the upload image', res);

  if (res) {
    const data = {
      data: {
        name: formData.name,
        IADetail: formData.IADetail,
        Email: formData.Email,
        ImageIAS: {
          data: res.data
        }
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
  } else {
    return null;
  }
};

import { getSession } from 'next-auth/react';
import axios from 'axios';
import { strapiUrl, strapiToken, header } from '../../constants/constans';
import { toast } from 'react-hot-toast';

export const createUser = async (data) => {
  try {
    // console.log('Data to create user' + data.email);
    // const dataStripe = { email: data.email, name: data.Name };
    // const respStripe = await axios.post(
    //   `${strapiUrl}/api/payment/createUser`,
    //   dataStripe,
    //   header
    // );
    //console.log('Id usuario' + respStripe.data.id);
    const newData = { ...data };
    const response = await axios.post(
      `${strapiUrl}/api/auth/local/register`,
      newData,
      header
    );
    // console.log('Full response');
    // console.log(response);
    return response;
  } catch (error) {
    console.error(`Error making POST request to ${strapiUrl}:`, error);
    if (error.response.data.error.message) {
      toast.error(
        'El usuario ya existe. Por favor, elija otro nombre de usuario '
      );
      return error.response.data.error.message;
    } else {
      toast.error('Se ha producido un error inesperado');
      return error.response.data.error;
    }
    // add the other error handler
    // throw new Error(`Failed to make POST request to ${strapiUrl}`);
  }
};

export const setTrialPlan = async () => {
  try {
    const response = await axios.post(
      `${strapiUrl}/api/plans`,
      {
        data: {
          typo: 'FreeTier',
          max_tokens: 500,
          max_imagens: 10,
          value: 2
        }
      },
      header
    );
    return response;
  } catch (error) {
    console.error(
      `Error creating freetrial plan POST request to ${strapiUrl}:`,
      error
    );
    return error.response.data.error;
  }
};

// export const setEstudiantePlan = async () => {
//   try {
//     const response = await axios.post(
//       `${strapiUrl}/api/plans`,
//       {
//         data: {
//           typo: 'Estudiante',
//           max_tokens: 54000,
//           max_imagens: 30,
//           value: 5
//         }
//       },
//       header
//     );
//     return response;
//   } catch (error) {
//     console.error(
//       `Error creating Estudiante plan POST request to ${strapiUrl}:`,
//       error
//     );
//     return error.response.data.error;
//   }
// };

// export const setStandardPlan = async () => {
//   try {
//     const response = await axios.post(
//       `${strapiUrl}/api/plans`,
//       {
//         data: {
//           typo: 'Standard',
//           max_tokens: 108000,
//           max_imagens: 75,
//           value: 10
//         }
//       },
//       header
//     );
//     return response;
//   } catch (error) {
//     console.error(
//       `Error creating Standard plan POST request to ${strapiUrl}:`,
//       error
//     );
//     return error.response.data.error;
//   }
// };

export async function getUser(context) {
  const session = await getSession(context);

  if (!session) {
    return null;
  }
  try {
    const { data } = await axios.get(
      `${strapiUrl}/api/users/${session.id}?populate=%2A`,
      {
        headers: { Authorization: `Bearer ${strapiToken}` }
      }
    );
    return {
      data,
      session
    };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      session: null
    };
  }
}

export async function updateUserById({ formData, id }) {
  try {
    const updatedUser = await axios.put(
      `${strapiUrl}/api/users/${id}`,
      formData,
      {
        headers: { Authorization: `Bearer ${strapiToken}` }
      }
    );
    return updatedUser;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function updatePlanById({ userId, planId }) {
  try {
    const updatedUser = await axios.put(
      `${strapiUrl}/api/users/${userId}`,
      {
        plan: {
          id: planId
        }
      },
      {
        headers: { Authorization: `Bearer ${strapiToken}` }
      }
    );
    return updatedUser.data; // Retorna el usuario actualizado
  } catch (error) {
    console.error('Error al actualizar el plan del usuario:', error);
    return null;
  }
}

export async function uploadUserImage({ formData }) {
  try {
    const uploadedImage = await axios.post(
      `${strapiUrl}/api/upload`,
      formData,
      {
        headers: { Authorization: `Bearer ${strapiToken}` }
      }
    );
    return uploadedImage;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function updateUserImage({ formData, id }) {
  try {
    const updatedUser = await axios.put(
      `${strapiUrl}/api/users/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${strapiToken}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return updatedUser;
  } catch (error) {
    console.error(error);
    return null;
  }
}

import { getSession } from 'next-auth/react';
import axios from 'axios';

// Function to make a POST request
const strapiToken = process.env.API_TOKEN;
const strapiUrl = process.env.STRAPI_URL;
const header = {
  headers: {
    Authorization: `Bearer ${strapiToken}`
  }
};
export const createUser = async (data) => {
  try {
    const dataStripe = { email: data.email, name: data.Name };
    const respStripe = await axios.post(
      `${strapiUrl}/api/payment/createUser`,
      dataStripe,
      header
    );
    //console.log('Id usuario' + respStripe.data.id);
    const newData = { ...data, customer_id: respStripe.data.id };

    console.log(newData);
    const response = await axios.post(
      `${strapiUrl}/api/auth/local/register`,
      newData,
      header
    );
    console.log('Full response');
    console.log(response);
    return response;
  } catch (error) {
    console.error(`Error making POST request to ${strapiUrl}:`, error);
    return error.response.data.error;
    // throw new Error(`Failed to make POST request to ${strapiUrl}`);
  }
};

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

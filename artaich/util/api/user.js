import axios from 'axios';

// Function to make a POST request
const strapiToken = process.env.API_TOKEN;
const strapiUrl = process.env.STRAPI_URL;
const header = {
    headers: {
        Authorization: `Bearer ${strapiToken}`,
    }
}
export const createUser = async (data) => {
    try {
        const dataStripe = { email: data.email, name: data.Name}
        const respStripe = await axios.post(`${strapiUrl}/api/payment/createUser`, dataStripe, header);
        console.log("Id usuario" + respStripe.data.id)
        const newData = {...data, customer_id: respStripe.data.id}

        console.log(newData);
        const response = await axios.post(`${strapiUrl}/api/auth/local/register`, newData, header);
        return response.data;
    } catch (error) {
        console.error(`Error making POST request to ${strapiUrl}:`, error);
        throw new Error(`Failed to make POST request to ${strapiUrl}`);
    }
};
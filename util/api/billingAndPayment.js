import axios from "axios";
import { strapiUrl, header } from "../../constants/constans";

export const createBillingInfo = async ({ formData }) => {
  const data = {
    data: {
      CreditCard: formData.CreditCard,
      Name: formData.Name,
      LastName: formData.LastName,
      ExpirationMonth: formData.ExpirationMonth,
      ExpirationYear: formData.ExpirationYear,
      SecurityCode: formData.SecurityCode,
      Country: formData.Country,
      Address: formData.Address,
      AddressOptional: formData.AddressOptional,
      City: formData.City,
      PostalCode: formData.PostalCode,
    },
  };

  try {
    const response = await axios.post(
      `${strapiUrl}/api/billing-infos`,
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

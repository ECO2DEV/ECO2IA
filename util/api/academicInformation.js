import axios from "axios";
import { strapiUrl, header } from "../../constants/constans";

export const createAcademicInformation = async ({ userId, formData }) => {
  const data = {
    data: {
      titulo_academico: formData.titulo_academico,
      universidad: formData.universidad,
      fecha_ini_academica: formData.fecha_ini_academica,
      fecha_fin_academica: formData.fecha_fin_academica,
      ciudad_uni: formData.ciudad_uni,
      users_permissions_user: userId,
    },
  };

  try {
    const response = await axios.post(
      `${strapiUrl}/api/academic-informations`,
      data,
      header
    );
    return response.data;
  } catch (error) {
    console.error(
      "Failed to create academic information:",
      error.response?.data?.error
    );
    return error.response?.data;
  }
};

export const updateAcademicInformation = async ({ userId, formData, id }) => {
  const data = {
    data: {
      titulo_academico: formData.titulo_academico,
      universidad: formData.universidad,
      fecha_ini_academica: formData.fecha_ini_academica,
      fecha_fin_academica: formData.fecha_fin_academica,
      ciudad_uni: formData.ciudad_uni,
      users_permissions_user: userId,
    },
  };

  try {
    const response = await axios.put(
      `${strapiUrl}/api/academic-informations/${id}`,
      data,
      header
    );
    return response.data;
  } catch (error) {
    console.error(
      "Failed to update academic information:",
      error.response?.data?.error
    );
    return error.response?.data;
  }
};

export const getAcademicInformation = async ({ userId }) => {
  try {
    const response = await axios.get(
      `${strapiUrl}/api/academic-informations?users_permissions_user=${userId}`,
      header
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch academic information:", error.response?.data?.error);
    return error.response?.data;
  }
};

export const deleteAcademicInformation = async ({ userId, id }) => {
  try {
    const response = await axios.delete(
      `${strapiUrl}/api/academic-informations/${id}`,
      header
    );
    return response.data;
  } catch (error) {
    console.error("Failed to delete academic information:", error.response?.data?.error);
    return error.response?.data;
  }
};

import useSWR from "swr";
import axios from "axios";
import { strapiUrl, strapiToken } from "../constants/constans";

// Función para realizar la llamada a la API
const fetcher = (url) =>
  axios
    .get(url, { headers: { Authorization: `Bearer ${strapiToken}` } })
    .then((res) => res.data)
    .catch((err) => console.log("Error in fetcher: " + err));

// Hook personalizado para obtener los datos del entrenador deportivo
export function useSportCoach(userId = 1) {
  // Utilizar el hook useSWR para realizar la solicitud y gestionar el estado de los datos
  const { data, error, isLoading, mutate } = useSWR(
    // URL de la API para obtener los datos del entrenador deportivo filtrados por usuario
    `${strapiUrl}/api/requests?filters[users_permissions_user][id][$eq]=${userId}&filters[source][$eq]=MatSport&sort=createdAt:desc&pagination[page]=1&pagination[pageSize]=1`,
    fetcher,
    {
      // Opciones de revalidación
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0,
    }
    );
    console.log(isLoading)

  return {
    data,
    isLoading,
    isError: error,
    mutate,
  };
}

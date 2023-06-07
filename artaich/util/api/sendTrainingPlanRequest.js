import axios from "axios";
import { strapiUrl, header } from "../../constants/constans";

// Función asincrónica para enviar una solicitud de plan de entrenamiento
export const sendTrainingPlanRequest = async ({
  prompt,
  weight,
  age,
  goal,
  trainingDays,
  user
}) => {
  try {
    // Realizar una solicitud POST a la URL especificada con los datos proporcionados
    const response = await axios.post(
      `${strapiUrl}/api/openai/sportcoach`,
      {
        prompt: prompt,
        weight: weight,
        age: age,
        goal: goal,
        trainingDays: trainingDays,
        users_permissions_user: user
      },
      header // Utilizar el encabezado especificado para la solicitud
    );
    return response; // Devolver la respuesta obtenida
  } catch (error) {
    // Imprimir el mensaje de error en caso de que ocurra una excepción
    console.error(`Error getting Training plan for ${strapiUrl}:`, error);
  }
};

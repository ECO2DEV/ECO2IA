import axios from 'axios';
import { strapiUrl, header } from '../../constants/constans';

// Función asincrónica para enviar una solicitud de plan de entrenamiento
export const sendTrainingPlanRequest = async ({
  // prompt,
  weight,
  age,
  height,
  goal,
  trainingDays,
  language,
  user
}) => {
  try {
    // Realizar una solicitud POST a la URL especificada con los datos proporcionados
    const response = await axios.post(
      `${strapiUrl}/api/openai/sportcoach`,
      {
        // prompt: prompt,
        weight: weight,
        height: height,
        age: age,
        goal: goal,
        language: language,
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

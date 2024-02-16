import { strapiUrl, header } from '../../constants/constans';
import axios from 'axios';

export async function getScores() {
  try {
    const scores = await axios.get(`${strapiUrl}/api/scores`, header);
    return scores?.data; // return the data
  } catch (error) {
    console.error('Error al actualizar el plan del usuario:', error);
    return null;
  }
}

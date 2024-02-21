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

export async function getAllIAs() {
  try {
    const ias = await axios.get(
      `${strapiUrl}/api/ias?populate[0]=screenShoot&populate[1]=icon&populate=id_score`,
      header
    );
    return ias?.data; // return the data
  } catch (error) {
    console.error('Error al actualizar el plan del usuario:', error);
    return null;
  }
}

export async function sendScore({ id_ia, stars, userId }) {
  try {
    const score = await axios.post(
      `${strapiUrl}/api/scores`,
      {
        data: {
          stars: stars,
          id_ia: id_ia,
          user_score: userId
        }
      },
      header
    );
    return score?.data; // return the data
  } catch (error) {
    console.error('Error al actualizar el plan del usuario:', error);
    return null;
  }
}

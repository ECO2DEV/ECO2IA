import axios from 'axios';
import { strapiUrl, header } from '../../constants/constans';

export const Eco2quizResponse = async ({
  topic,
  language,
  difficulty,
  optionChoice,
  questionQuantity,
  user
}) => {
  try {
    const response = await axios.post(
      `${strapiUrl}/api/openai/eco2quiz`,
      {
        topic,
        users_permissions_user: user,
        language,
        difficulty,
        optionChoice,
        questionQuantity
      },
      header
    );

    return response;
  } catch (error) {
    console.error(`Error getting prompt for ${strapiUrl}:`, error);
  }
};

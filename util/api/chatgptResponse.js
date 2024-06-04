import axios from 'axios';
import { strapiUrl, header } from '../../constants/constans';

export const ChatgptResponse = async ({ prompt, user }) => {
  try {
    const response = await axios.post(
      `${strapiUrl}/api/openai/chatgpt`,
      { prompt: prompt, users_permissions_user: user },
      header
    );

    return response;
  } catch (error) {
    console.error(`Error getting prompt for ${strapiUrl}:`, error);
  }
};

export const ChatgptResForSportDescr = async ({ prompt, user }) => {
  try {
    const response = await axios.post(
      `${strapiUrl}/api/openai/chatia`,
      { prompt: prompt, users_permissions_user: user },
      header
    );

    return response;
  } catch (error) {
    console.error(`Error getting prompt for ${strapiUrl}:`, error);
  }
};

export const ChatgptResForSportMeals = async ({ prompt, user }) => {
  try {
    const response = await axios.post(
      `${strapiUrl}/api/openai/chatia`,
      { prompt: prompt, users_permissions_user: user },
      header
    );

    return response;
  } catch (error) {
    console.error(`Error getting prompt for ${strapiUrl}:`, error);
  }
};

// conversation and messages with socket.io

export const createConversationSocket = async ({
  aiMessageId,
  userMessageId
}) => {
  // console.log('inside createConversationSocket', aiMessageId, userMessageId);
  try {
    const response = await axios.post(
      `${strapiUrl}/api/conversations?populate=*`,
      {
        data: {
          messages: [
            {
              id: userMessageId
            },
            {
              id: aiMessageId
            }
          ]
        }
      },
      header
    );
    return response;
  } catch (error) {
    console.log('Error creating conversation:', error);
  }
};

export const createMessageSocket = async ({
  type,
  content,
  uuid = null,
  model = null
}) => {
  let data;
  // console.log('type ', type, 'content ', content);

  if (type === 'user') {
    data = {
      aiMessage: false,
      animate: false,
      content: content
    };
  } else {
    data = {
      aiMessage: true,
      animate: true,
      content: content,
      message_id: uuid,
      model: model
    };
  }

  try {
    const response = await axios.post(
      `${strapiUrl}/api/messages`,
      {
        data
      },
      header
    );
    return response;
  } catch (error) {
    console.log('Error creating message:', error);
  }
};

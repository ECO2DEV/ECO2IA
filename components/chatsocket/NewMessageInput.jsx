import { useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { StoreContext } from '../../context/store/StoreContext';
import { sendConversationMessage } from '../../util/socket/socketconnect';
import { useChat as useChatReact } from 'ai/react';
import { createMessageSocket, createConversationSocket } from '../../util/api/chatgptResponse';
import { useChatSocket } from '../../hooks/useChatSocket';

export const config = {
  runtime: 'edge'
};

const NewMessageInput = () =>{
  const [messageSent, setMessageSent] = useState(false); // State to track if message is sent
  const {mutate: mutateSocket} = useChatSocket();
  const {
    selectedConversationId,
    setConversations,
    content,
    setContent,
    setSelectedConversarionId
  } = useContext(StoreContext);

  console.log('selectedConversationId', selectedConversationId);

  // after clicking the send button, execute the proceedMessage function
  async function proceedMessage() {
    // const message = {
    //   aiMessage: false,
    //   content: input,
    //   id: uuidv4(),
    //   animate: false
    // };
    const conversationId =
      selectedConversationId === 'new' ? null : selectedConversationId;


    // If there is no conversationId, create a new conversation
    if (!conversationId) {
      
      handleSubmit
    // else update the conversation selected with the new message
    } else {
      console.log("input", input)
       setConversations({ contentProp: input, conversationId});
    }

    setSelectedConversarionId(conversationId);
    // Send message to the server (ToDo: Implement this function)
    // sendConversationMessage(message, conversationId);
    setMessageSent(true);
  }

  const { input, setMessages, messages,
    handleInputChange,
    handleSubmit } = useChatReact({
    api: '/api/chat',
    // initialInput: content,
    onFinish: async (message) => {
      console.log("inside sdk hook", message.content)
      try {
        const userPromise = createMessageSocket({
          type: 'user',
          content: input
        });

        const aiPromise = createMessageSocket({
          type: 'ai',
          content: message.content
        });

        // Ejecutar las promesas en paralelo y esperar a que todas se resuelvan
        try {
          const [resUser, resAI] = await Promise.all([
            userPromise,
            aiPromise
          ]);

          // console.log('resUser', resUser.data.data.id, 'resAI', resAI);

          await createConversationSocket({
            aiMessageId: resUser.data.data.id,
            userMessageId: resAI.data.data.id
          });
        } catch (error) {
          console.error('Al menos una de las promesas falló:', error);
        }

        const newMessageId = uuidv4();

        const newMessage = {
          content: message.content,
          model: 'gpt-3.5-turbo',
          id: newMessageId,
          role: message.role
        };
        console.log('objeto del mensage', newMessage);

        setMessages((prevMessages) => {
          const updatedMessages = prevMessages.map((msg) => {
            if (msg.role === 'assistant' && msg.id === message.id) {
              return { ...msg, id: newMessageId };
            }
            return msg;
          });
          return updatedMessages;
        });

        // setResponseModelMap((prevMap) => ({
        //   ...prevMap,
        //   [newMessage.id]: selectedModel
        // }));
        // console.log('set response model map:', setResponseModelMap)

        // setResponse(newMessage.content + input);
        // console.log("response + input", setResponse);

        // mutate();
        mutateSocket();
      } catch (error) {
        // Handle error here
        console.error('Error:', error);
        setMessages((prevMessages) => [
          ...prevMessages,

          { role: 'assistant', content: '¡Se ha producido un error!' }
        ]);
      } finally {
        // setOpenHelpers(false);
      }
    },
    body: {
      model: "gpt-3.5-turbo"
    }
  });

 

  function handleSendMessage(e) {
    e.preventDefault();
    proceedMessage();
    // setContent('');
  }

  function handleChange(e) {
    setContent(e.target.value);
    setMessageSent(false);
  }

  return (
    <form onSubmit={(e)=> handleSendMessage(e) } className="relative w-full h-20 ">
      <input
        className="mx-auto flex justify-center items-center rounded-xl w-5/6 dark:text-black  border-gray-200 border-none outline-none focus:border-none focus:outline-none focus:ring-0 hover:shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] transition-all duration-300 ease-in-out"
        placeholder="Envia un mensaje..."
        onChange={handleInputChange}
        value={input}
        name='input'
        id='input'
        type="text"
      />
      <button
        type="submit"
        className="absolute right-24 top-2 cursor-pointer hover:opacity-60"
        // onClick={handleSendMessage}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-send text-black"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M10 14l11 -11" />
          <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
        </svg>
      </button>
    </form>
  );
};

export default NewMessageInput;

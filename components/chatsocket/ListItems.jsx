import { useContext } from "react"
import { StoreContext } from '../../context/store/StoreContext';
import { useChatSocket } from '../../hooks/useChatSocket';
import { TrashIconBlack, MessageIcon } from '../icons/icons';
import { toast } from 'react-hot-toast';

export const ListItems = ({ title, handleSetSelectedChat, conversationId }) => {
  // console.log('inside list items', conversationId);
  const { deleteConversation } = useChatSocket();
  const {setSelectedConversarionId } = useContext(StoreContext); 

  // max length of 20 characters for the title
  let maxTitle = title?.length > 20 ? title.slice(0, 20) + '...' : title;


  const handleDeleteConversation = async () => {
    try {
      await deleteConversation({conveId:conversationId});
      setSelectedConversarionId("new");
      toast.success('Conversación eliminada con éxito!')
    } catch (error) {
      console.error('Error deleting conversation:', error);
      toast.error('No se pudo eliminar la conversación. Intente de nuevo.');
      // Handle error if needed
    }
  };

  return (
    <div className="pl-1 flex items-center justify-between gap-2">
      <div
        className="flex items-center gap-2 text-white dark:text-black m-1 w-60 h-11  rounded-lg transition hover:opacity-70"
        onClick={() => handleSetSelectedChat(conversationId)}
      >
        <MessageIcon className="icon icon-tabler icons-tabler-outline icon-tabler-message dark:text-black" />
        <p>{maxTitle}</p>
      </div>
      <button onClick={handleDeleteConversation}>
        <TrashIconBlack className="ml-auto mr-2 w-5 h-5 hover:cursor-pointer hover:scale-105 text-red-600 hover:text-red-800" />
      </button>
    </div>
  );
};

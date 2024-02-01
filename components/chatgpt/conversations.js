import { useRef, useState, useEffect, useContext } from "react";
import Image from "next/image";
import { marked } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";

import { UserContext } from "../../context/user/UserContext";
import { EmptyAvatar } from "../icons/icons";
import { useChat } from "../../hooks/useChat";
import { strapiUrl } from "../../constants/constans";
import { ClipboardIcon } from "../icons/icons";
import ModalDelete from "./ModalDelete";
import { LoadingChatgpt } from "./LoadingChatgpt";
import { DataMattChat } from "../../data/mattchat";
// import { handleCopyCode } from "./copyCode";

export const Conversations = ({ messages }) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const { user } = useContext(UserContext);
  const [copied, setCopied] = useState([]);

  const [latestReqId, setLatestReqId] = useState(0);

  const { data, isLoading, deleteChat } = useChat(user?.id);

  const lastMessageRef = useRef(null);

  const codeRefs = useRef({});

  const renderMarkdown = (markdown) => {
    const rawMarkup = marked(markdown);
    return { __html: rawMarkup };
  };

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [data]);

  const handleCopy = (resp, index) => {
    navigator.clipboard
      .writeText(resp)
      .then(() => {
        setCopied((prevCopied) => {
          const newCopied = [...prevCopied];
          newCopied[index] = true;
          return newCopied;
        });
        setTimeout(() => {
          setCopied((prevCopied) => {
            const newCopied = [...prevCopied];
            newCopied[index] = false;
            return newCopied;
          });
        }, 2000);
      })
      .catch((error) => {
        console.error("Error al copiar al portapapeles:", error);
      });
  };



  const onHandleModalDelete = (id) => {
    setDeleteModalOpen((prev) => !prev);
    setDeleteId(id);
  };
  if (isLoading) {
    return <LoadingChatgpt />;
  }
  useEffect(() => {
    if (messages) {
      document.querySelectorAll("pre code").forEach((block) => {
        hljs.highlightElement(block);
      });

      const reqId = messages.find((item) => item.reqId !== undefined)?.reqId;
      setLatestReqId(reqId);
    }
  }, [messages]);

  return (
    <div className="h-full bg-gray-100">
      <section className="flex flex-col text-sm h-[80vh] lg:h-[75vh] overflow-y-scroll overflow-x-hidden">
        {messages?.map((item, index) => {
          const isCodeBlock = item.content.includes("```");

          return (
            <div key={item.id}>
              {item.role === "user" ? (
                <div
                  className={`group w-full text-gray-800 bg-gray-100 relative`}
                >
                  <div className="flex p-4 gap-4 text-base md:gap-6 md:max-w-4xl lg:max-w-5xl md:py-6 lg:px-0 m-auto">
                    <div className="flex-shrink-0 ml-2 flex flex-col relative items-end w-[30px]">
                      {user?.avatar ? (
                        <img
                          className="w-7 h-7 rounded-full object-cover"
                          src={strapiUrl + user.avatar.url}
                          alt="user_avatar"
                        />
                      ) : (
                        <EmptyAvatar />
                      )}
                    </div>
                    <div className="relative flex flex-col text-left w-[calc(100%-50px)] gap-1 md:gap-3 lg:w-[calc(100%-115px)]">
                      {item.content}
                    </div>
                  </div>
                  {/* {latestReqId && (
                    <button
                      onClick={() => onHandleModalDelete(latestReqId)}
                      className="absolute right-0 top-0 cursor-pointer "
                    >
                      <DeleteIcon />
                    </button>
                  )} */}
                </div>
              ) : null}
              {item.role === "assistant" ? (
                <div
                  className={`relative group w-full text-gray-100 border-b border-black/10 bg-gray-800 `}
                >
                  <div className="flex p-4 gap-4 text-base md:gap-6 md:max-w-4xl lg:max-w-5xl  md:py-6 lg:px-0 m-auto">
                    <div className="flex-shrink-0 ml-2 flex flex-col relative items-end w-[30px]">
                      <Image
                        src="/Mlogo.ico"
                        alt="MatTech logo"
                        width={30}
                        height={30}
                      />
                    </div>
                    <div className="flex flex-col text-justify w-[calc(100%-50px)] gap-1 md:gap-3 lg:w-[calc(100%-115px)]">
                      <div className="flex flex-col text-justify w-full">
                        {/* Renderizamos el contenido como Markdown si es un bloque de código */}
                        <div className="relative">
                          {isCodeBlock ? (
                            <>
                              <div className="relative markdown-container">
                                <div
                                  className="markdown-content"
                                  dangerouslySetInnerHTML={renderMarkdown(
                                    item.content
                                  )}
                                />
                              {/* {isCodeBlock && (
                                <button
                                  className="absolute top-2 right-2 text-xs text-gray-300 bg-gray-600 hover:bg-gray-500 rounded px-2 py-1"
                                >
                                  Copiar
                                </button>
                              )} */}
                              </div>
                            </>
                          ) : (
                            <div>{item.content}</div>
                          )}
                        </div>
                      </div>
                      {/* </div> */}
                      <div className="absolute right-0 top-0 flex flex-col items-end ">
                        <button
                          className="p-1"
                          onClick={() => handleCopy(item.content, index)}
                        >
                          <div className="w-6 h-6 text-gray-100 bg-gray-100 transition duration-200 m-1 group-hover:bg-cyan-700 group-hover:text-black rounded-full ">
                            <ClipboardIcon />
                          </div>
                        </button>
                        {copied[index] && (
                          <div className=" bg-blue-900 text-white rounded">
                            {DataMattChat.CopiedSuccess}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}
        <div ref={lastMessageRef}></div>
      </section>
      {deleteModalOpen && (
        <ModalDelete
          onClose={onHandleModalDelete}
          onHandleDelete={() => deleteChat(deleteId)}
        />
      )}
    </div>
  );
};

// return (
//   <div className="h-full bg-gray-100">
//     <section className="flex flex-col text-sm h-[80vh] lg:h-[75vh] overflow-y-scroll overflow-x-hidden">
//       {messages?.map((item, index) => {
//         // Revisamos si el contenido tiene bloques de código Markdown
//         const isCodeBlock = item.content.includes("```");
//         return (
//           <div key={item.id}>
//             {/* ... tu código ... */}
//             {item.role === "user" ? (
//               <div
//                 className={`group w-full text-gray-800 bg-gray-100 relative`}
//               >
//                 <div className="flex p-4 gap-4 text-base md:gap-6 md:max-w-4xl lg:max-w-5xl md:py-6 lg:px-0 m-auto">
//                   <div className="flex-shrink-0 ml-2 flex flex-col relative items-end w-[30px]">
//                     {user?.avatar ? (
//                       <img
//                         className="w-7 h-7 rounded-full object-cover"
//                         src={strapiUrl + user.avatar.url}
//                         alt="user_avatar"
//                       />
//                     ) : (
//                       <EmptyAvatar />
//                     )}
//                   </div>
//                   <div className="relative flex flex-col text-left w-[calc(100%-50px)] gap-1 md:gap-3 lg:w-[calc(100%-115px)]">
//                     {item.content}
//                   </div>
//                 </div>
//                 {/* {latestReqId && (
//                     <button
//                       onClick={() => onHandleModalDelete(latestReqId)}
//                       className="absolute right-0 top-0 cursor-pointer "
//                     >
//                       <DeleteIcon />
//                     </button>
//                   )} */}
//               </div>
//             ) : null}
//             {item.role === "assistant" ? (
//               <div
//                 className={`relative group w-full text-gray-100 bg-gray-800`}
//               >
//                 {/* ... tu código ... */}
//                 <div className="flex-shrink-0 ml-2 flex flex-col relative items-end w-[30px]">
//                       <Image
//                         src="/Mlogo.ico"
//                         alt="MatTech logo"
//                         width={30}
//                         height={30}
//                       />
//                     </div>

//                 <div className="flex flex-col text-justify w-full">
//                   {/* Renderizamos el contenido como Markdown si es un bloque de código */}
//                   {isCodeBlock ? (
//                     <div
//                       dangerouslySetInnerHTML={renderMarkdown(item.content)}
//                     />
//                   ) : (
//                     <div>{item.content}</div>
//                   )}
//                   {/* ... tu código ... */}
//                 </div>
//               </div>
//             ) : null}
//             {/* ... tu código ... */}
//           </div>
//         );
//       })}
//       {/* ... tu código ... */}
//     </section>
//     {/* ... tu código ... */}
//   </div>
// );

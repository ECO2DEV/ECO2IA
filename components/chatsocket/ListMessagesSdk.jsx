import { useState, useContext } from "react";
import Image from "next/image";
import { useSession } from 'next-auth/react';
import { UserContext } from "../../context/user/UserContext";

import { DataEco2Chat } from "../../data/eco2chat";
import { ClipboardIcon } from '../icons/icons';

import ReactMarkdown from 'react-markdown';

const ListMessagesSdk = ({
  item,
  handleCopy,
  handleCopyCode,
  responseModelMap,
  getModelIcon,
  index,
}) => {

  const isCodeBlock =
    item.content.includes('```') ||
    item.content.includes('**') ||
    item.content.includes('`') ||
    item.content.includes('*');
  
  const modelForThisMessage = responseModelMap[item.id];
  const messageIcon = getModelIcon(modelForThisMessage);
  console.log("item image modal", item)

  const { data: session } = useSession();
  const { user } = useContext(UserContext);
  const [copied, setCopied] = useState([]);
  const [copiedCode, setCopiedCode] = useState([]);

  return (
    <div>
      {item.role === 'user' ? (
        <article
          className={`group sm:pl-10 text-gray-800 dark:text-lightColor relative`}
        >
          <div className="flex p-4 gap-4 text-base md:gap-6 md:max-w-4xl lg:max-w-5xl md:py-6 lg:px-0 m-auto">
            <div className="flex-shrink-0 flex flex-col relative items-end">
              <Image
                width={200}
                height={200}
                src={
                  user?.avatar
                    ? user?.avatar?.url
                    : session?.picture
                    ? session?.picture
                    : '/empty_avatar.webp'
                }
                alt="Avatar preview"
                className={`w-8 h-8 m-auto object-cover rounded-full border-none shadow-lg `}
              />
            </div>
            <div className="relative flex w-full min-w-0 flex-col">
              {item.content}
            </div>
          </div>
        </article>
      ) : null}
      {item.role === 'assistant' ? (
        <article
          className={`relative sm:pl-10 text-gray-800 dark:text-lightColor`}
        >
          <div className="flex p-4 gap-4 text-base md:gap-6 md:max-w-4xl lg:max-w-5xl  md:py-6 lg:px-0 m-auto">
            <div className="flex-shrink-0 ml-2 flex flex-col relative items-end w-[30px]">
              <div className="relative p-1 rounded-full hs-9 w-9 flex items-center justify-center">
                {messageIcon && (
                  <Image
                    src={messageIcon}
                    alt="AI model icon"
                    width={50}
                    height={50}
                  />
                )}
              </div>
            </div>
            <div className="flex flex-col text-justify w-[calc(100%-50px)] gap-1 md:gap-3 lg:w-[calc(100%-115px)]">
              <div className="flex flex-col text-justify w-full">
                <div className="relative">
                  {isCodeBlock ? (
                    <div className="relative markdown-container">
                      <div className="markdown-content">
                        <ReactMarkdown>{item.content}</ReactMarkdown>
                      </div>
                      <button
                        onClick={() =>
                          handleCopyCode(
                            isCodeBlock
                              ? item.content
                              : '',
                            index,
                            setCopiedCode
                          )
                        }
                        className="absolute top-2 right-2 text-xs text-gray-300 bg-gray-600 hover:bg-gray-500 rounded px-2 py-1"
                      >
                        Copiar Código
                      </button>
                    </div>
                  ) : (
                    <div>{item.content}</div>
                  )}
                </div>
              </div>
              <div className="absolute right-0 top-0 flex flex-col items-end ">
                <button
                  className="p-1"
                  onClick={() => handleCopy(item.content, index, setCopied)}
                >
                  <div className="w-6 h-6 text-gray-100 bg-gray-100 transition duration-200 m-1 group-hover:bg-cyan-700 group-hover:text-black rounded-full ">
                    <ClipboardIcon />
                  </div>
                </button>
                {(copied[index] && (
                  <div className=" bg-blue-900 text-white rounded">
                    {DataEco2Chat.CopiedSuccess}
                  </div>
                )) ||
                  (copiedCode[index] && (
                    <div className=" bg-blue-900 text-white rounded">
                      {DataEco2Chat.CopiedCodeSuccess}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </article>
      ) : null}
    </div>
  );
};

export default ListMessagesSdk;

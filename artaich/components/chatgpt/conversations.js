import { useRef, useEffect } from 'react';
import { ChatGPTLogo } from '../icons/icons';
import { useChat } from '../../hooks/useChat';

export const Conversations = () => {
  const { data, isLoading } = useChat();
  console.log('Request of chatGpt user, bot', data);
  const reversedData = data?.data?.slice().reverse();

  const lastMessageRef = useRef(null);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [data]);

  return (
    <div className=" bg-gray-100">
      <section className="flex flex-col items-center text-sm h-[80vh] lg:h-[85vh] overflow-y-scroll overflow-x-hidden">
        {
          // create a skeleton loading effect
          isLoading && <div className="animate-pulse">Loading...</div>
        }
        {reversedData?.map((item) => (
          <div key={item.id}>
            <div className="group w-full text-gray-800 bg-gray-100">
              <div className="flex p-4 gap-4 text-base md:gap-6 md:max-w-4xl lg:max-w-5xl md:py-6 lg:px-0 m-auto">
                <div className="flex-shrink-0 flex flex-col relative items-end w-[30px]">
                  <ChatGPTLogo />
                </div>
                <div className="relative flex flex-col w-[calc(100%-50px)] gap-1 md:gap-3 lg:w-[calc(100%-115px)]">
                  {item?.attributes?.payload_in?.prompt}
                </div>
              </div>
            </div>
            <div className="group w-full text-gray-100 border-b border-black/10 bg-gray-800">
              <div className="flex p-4 gap-4 text-base md:gap-6 md:max-w-3xl lg:max-w-4xl md:py-6 lg:px-0 m-auto">
                <div className="flex-shrink-0 flex flex-col relative items-end w-[30px]">
                  <ChatGPTLogo />
                </div>
                <div className="relative flex flex-col w-[calc(100%-50px)] gap-1 md:gap-3 lg:w-[calc(100%-115px)]">
                  {item?.attributes?.payload_out?.resp}
                </div>
              </div>
            </div>
          </div>
        ))}
        <div ref={lastMessageRef}></div>
      </section>
    </div>
  );
};

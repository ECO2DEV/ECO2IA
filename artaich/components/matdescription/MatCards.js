import { useContext, useEffect } from 'react';
import { PromptContext } from '../../context/prompts/PromptContext';
import {
  ClipboardIcon,
  InstagramIconSVG,
  FacebookIconSVG,
  TwitterIconSVG,
  TelegramIconSVG,
  WhatsAppIconSVG,
  GlobalShareIcon
} from '../icons/icons';
import {
  FacebookShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  TwitterShareButton
} from 'next-share';
import { toast } from 'react-hot-toast';
import { EnterCard } from './EnterCard';
import { DataMattDescription } from '../../data/mattdescription';

const socialMediaIdentifiers = [
  { keyword: 'FB', icon: <FacebookIconSVG /> },
  { keyword: 'TW', icon: <TwitterIconSVG /> },
  { keyword: 'TE', icon: <TelegramIconSVG /> },
  { keyword: 'TL', icon: <TelegramIconSVG /> },
  { keyword: 'TG', icon: <TelegramIconSVG /> },
  { keyword: 'WA', icon: <WhatsAppIconSVG /> },
  { keyword: 'IG', icon: <InstagramIconSVG /> },
  { keyword: 'INSTA', icon: <InstagramIconSVG /> }
];
export const MatCards = () => {
  const { response, setResponse, activeAI, setActiveAI } =
    useContext(PromptContext);

  useEffect(() => {
    if (activeAI !== 'MatDescriptionAI') {
      setResponse(null);
    }
    setActiveAI('MatDescriptionAI');
  }, []);
  const copywritings =
    typeof response === 'string' ? response.split('\n') : null;

  const handleCopy = (index) => {
    if (copywritings) {
      navigator.clipboard
        .writeText(copywritings[index])
        .then(() => {
          toast.success(DataMattDescription.CopiedSuccess);
        })
        .catch(() => {
          toast.error(DataMattDescription.CopiedFailed);
        });
    } else {
      toast.error(DataMattDescription.NoText);
    }
  };

  if (!response || !copywritings || copywritings.length === 0) {
    return <EnterCard response={response} handleCopy={handleCopy} />;
  }

  return (
    <section className="flex flex-col gap-2 sm:absolute sm:top-[4.7rem] right-0 pb-11">
      {copywritings?.map((copy, index) =>
        copy === '' || copy.trim().length < 10 ? null : (
          <div className="flex space-x-2 h-full" key={index}>
            {/* {console.log('copy', 'something' + copy.trim())} */}
            <div className="flex shrink-0">
              {socialMediaIdentifiers.some(({ keyword }) =>
                copy.includes(keyword)
              ) ? (
                socialMediaIdentifiers.find(({ keyword }) =>
                  copy.includes(keyword)
                )?.icon
              ) : (
                <GlobalShareIcon />
              )}
            </div>
            <div className="w-[20rem] md:w-[25rem] xl:w-[35rem] flex-1 ">
              <form className="relative">
                <div className="rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 ">
                  <textarea
                    disabled
                    rows={6}
                    value={copy || ''}
                    name="response"
                    id="response"
                    className="overflow-y-hidden block w-full resize-none border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 text-[0.750rem] leading-2 md:text-[0.750rem] lg:leading-6 "
                    placeholder={DataMattDescription.ResponseExample}
                  />

                  {/* Spacer element to match the height of the toolbar */}
                  <div className="py-2" aria-hidden="true">
                    {/* Matches height of button in toolbar (1px border + 36px content height) */}
                    <div className="py-px">
                      <div className="h-9" />
                    </div>
                  </div>
                </div>

                <div className="absolute inset-x-0 bottom-0 flex justify-end py-2 pl-3 pr-2">
                  <div className="flex justify-center items-center space-x-5">
                    <div className="flex items-center">
                      <button
                        type="button"
                        onClick={() => handleCopy(index)}
                        className="-m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500"
                      >
                        <ClipboardIcon />
                        <span className="sr-only">
                          {' '}
                          {DataMattDescription.AttachFile}{' '}
                        </span>
                      </button>
                    </div>
                    <div className="flex items-center relative group">
                      {copy.includes('FB') ? (
                        <FacebookShareButton
                          url={'https://next-mattech.vercel.app'}
                          title={copywritings[index]}
                          quote={copywritings[index]}
                          hashtag={'#MatDescription'}
                        >
                          <GlobalShareIcon />
                        </FacebookShareButton>
                      ) : copy.includes('TW') ? (
                        <TwitterShareButton
                          url={'https://next-mattech.vercel.app'}
                          title={copywritings[index]}
                        >
                          <GlobalShareIcon />
                        </TwitterShareButton>
                      ) : copy.includes('TE') ||
                        copy.includes('TL') ||
                        copy.includes('TG') ? (
                        <TelegramShareButton
                          url={'https://next-mattech.vercel.app'}
                          title={copywritings[index]}
                        >
                          <GlobalShareIcon />
                        </TelegramShareButton>
                      ) : copy.includes('WA') ? (
                        <WhatsappShareButton
                          url={'https://next-mattech.vercel.app'}
                          title={copywritings[index]}
                          separator=":: "
                        >
                          <GlobalShareIcon />
                        </WhatsappShareButton>
                      ) : (
                        (copy.includes('IG') || copy.includes('INSTA')) && (
                          <GlobalShareIcon />
                        )
                      )}
                      <div className="opacity-0 group-hover:opacity-100 absolute left-0 bottom-10 right-0 z-10 flex justify-center items-end text-xl text-black font-semibold rounded-full">
                        Share
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )
      )}
    </section>
  );
};

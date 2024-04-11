import { toast } from 'react-hot-toast';
import { DefaultSocialIcon, ClipboardIcon } from '../icons/icons';
import { DataEco2Description } from '../../data/eco2description';

export const EnterCard = ({ response, handleCopy }) => {
  return (
    <section className=" flex flex-col gap-2 right-0 pb-11">
      <div className="flex items-start space-x-4">
        <div className="flex shrink-0">
          <DefaultSocialIcon />
        </div>
        <div className="w-[20rem] md:w-[25rem] xl:w-[35rem] flex-1">
          <form className="relative">
            <div className="overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300">
              <textarea
                disabled
                rows={5}
                value={response || ''}
                name="response"
                id="response"
                className="block w-full resize-none border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder={DataEco2Description.ResponseExample}
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
              <div className="flex items-center space-x-5">
                <div className="flex items-center">
                  <button
                    disabled={!response}
                    type="button"
                    onClick={handleCopy}
                    className="-m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500"
                  >
                    <ClipboardIcon />
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
